$(document).ready( function() {
 var token = localStorage.getItem('token');
  var interests = [];
    $(document).on('click', '.cat_data', function () {
        var cat_id = $(this).data('getinterestid');
          var check_exist = jQuery.inArray(cat_id, interests);
            if (check_exist != -1) {
              interests.splice(check_exist, 1);
               $("#interest"+ cat_id).css('background', '#f58731');
               $("#interest"+ cat_id).css('border-top', '1px solid #f58731');
               $("#check"+ cat_id).hide();
            }else{
              interests.push(cat_id);
               $("#interest"+ cat_id).css('background', 'grey');
               $("#interest"+ cat_id).css('border-top', '1px solid #f58731');
               $("#check"+ cat_id).show();
            }

        console.log(interests);
        if (interests.length == 0) {
          $("#show_total_interest").hide();
        }else{
          $("#show_total_interest").show();
          $("#show_total_interest").html(interests.length);
        }
        if (interests.length >= 5) {
          $(".juni_interest_info").hide();
          $(".juni_interest_submit").show();
        }else{
          $(".juni_interest_info").show();
          $(".juni_interest_submit").hide();
        }
    });

	$("#proceed").on('click', function(e) {
		e.preventDefault();
		$(".juni_spin").show();

		var firstName        = $("#firstName").val();
		var lastName         = $("#lastName").val();
		var phoneNumber      = $("#phoneNumber").val();
    var dob              = $("#dob").val();
    $(".err_signup").css('color', 'white');
    if (firstName == "") {
      $("#juni_err_firstName").html('fisrtname cannot be empty');
      $("#firstName").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else if(lastName == "") {
      $("#juni_err_lastName").html('lastname cannot be empty');
      $("#lastname").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else if(phoneNumber == "") {
      $("#juni_err_phoneNumber").html('phoneNumber cannot be empty');
      $("#phoneNumber").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else if(dob == "") {
      $("#juni_err_dob").html('date of birth is required');
      $("#dob").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else {

    $(".err_signup").html('');
    $(".complete_inputs").removeClass('err_signup_input');

    interests = interests.map(function (x) {
                    return {
                      "interest_id": x
                    }
                  });
    console.log(interests);
     var settings = {
          "url": "https://polledapp.herokuapp.com/api/complete/registration",
          "method": "PUT",
          "timeout": 0,
          "headers": {
            "Authorization": "Bearer "+token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "first_name": firstName,
            "last_name": lastName,
            "phone": phoneNumber,
            "dob": dob,
            "interests": interests
          },
        };
        $.ajax(settings).done(function (response) {
          if (response) {
              $(".juni_spin").hide();
              const user  = response.user;
              let wrapImage = response.image_link + user.image;

              localStorage.setItem('user_firstname', user.first_name);
              localStorage.setItem('user_lastname', user.last_name);
              localStorage.setItem('user_email', user.email);
              localStorage.setItem('user_image', wrapImage);
              localStorage.setItem('user_dob', user.dob);
              localStorage.setItem('user_phone', user.phone);

              location.replace("../Users/user-profile-lite.html");
          }
        }).fail( function(err) {
          if (err) {
            $(".juni_spin").hide();
            if (err.status === 422) {
              $(".err_signup").css('color', 'white');
              if (err.responseJSON.first_name) {
                $("#juni_err_firstName").html(err.responseJSON.first_name[0]);
                $("#firstName").addClass('err_signup_input');
              }
              if(err.responseJSON.last_name) {
                $("#juni_err_lastName").html(err.responseJSON.last_name[0]);
                $("#lastName").addClass('err_signup_input');
              }
              if (err.responseJSON.phone) {
                $("#juni_err_phoneNumber").html(err.responseJSON.phone[0]);
                $("#phoneNumber").addClass('err_signup_input');
              }
              if(err.responseJSON.dob) {
                $("#juni_err_dob").html(err.responseJSON.dob[0]);
                $("#dob").addClass('err_signup_input');
              }

            }
          }

        });
    }
	});
});
