$(document).ready( function() {

	$("#signup-form").on('submit', function(e) {
		e.preventDefault();

		$(".juni_spin").show();

		var email            = $("#ec_email").val();
		var password         = $("#ec_password").val();
		var confirm_password = $("#ec_confirm_password").val();

    if (email == "") {
      $("#juni_err_email").html('email is required');
      $("#ec_email").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else if(password == "") {
      $("#juni_err_password").html('password cannot be empty');
      $("#ec_password").addClass('err_signup_input');
      $(".juni_spin").hide();
      return false;
    }else {
      $("#ec_email").removeClass('err_signup_input');
    $("#ec_password").removeClass('err_signup_input');
    $("#juni_err_email").html('');
    $("#juni_err_password").html('');

     var settings = {
          "url": "https://polledapp.herokuapp.com/api/register",
          "method": "POST",
          "timeout": 0,
          "data": {
            "email": email,
            "password": password,
            "password_confirmation": confirm_password,
          }
        };
        $.ajax(settings).done(function (response) {
          if (response) {
              $(".juni_spin").hide();
              $("#reg_success").html(response.success);
              $('#signup-form')[0].reset();
              location.replace("../Users/confirmation.html?success=new_member"); 
          }         
        }).fail( function(err) {
          
          if (err) {
            $(".juni_spin").hide();
            if (err.status === 422) {
              if (err.responseJSON.email) {
                $("#juni_err_email").html(err.responseJSON.email[0]);
                $("#ec_email").addClass('err_signup_input');
              }
              if(err.responseJSON.password) {
                $("#juni_err_password").html(err.responseJSON.password[0]);
                $("#ec_password").addClass('err_signup_input');
              }
              
            }
          }
          
        });
    }

		
	});
});



