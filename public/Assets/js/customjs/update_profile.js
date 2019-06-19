let uploadKey = 0;

$("#update_profile").on('submit', function(e) {
		e.preventDefault();

		$(".update_profile_spin").show();

		var first_name     = $("#feFirstName").val();
		var last_name      = $("#feLastName").val();
    var dob            = $("#fedob").val();
    var phone          = $("#fePhone").val();

      $("#feFirstName").removeClass('err_signup_input');
      $("#feLastName").removeClass('err_signup_input');
      $("#fedob").removeClass('err_signup_input');
      $("#fePhone").removeClass('err_signup_input');

      $("#first_name_err").html('');
      $("last_name_err").html('');
      $("#dob_err").html('');
      $("#phn_num_err").html('');

    if (first_name == "") {
      $("#first_name_err").html('firstname is required!');
      $("#feFirstName").addClass('err_signup_input');
      $(".update_profile_spin").hide();
      return false;
    }else if(last_name == "") {
      $("#last_name_err").html('lastname is required!');
      $("#feLastName").addClass('err_signup_input');
      $(".update_profile_spin").hide();
      return false;
    }else if(dob == "") {
      $("#dob_err").html('Date of birth is required!');
      $("#fedob").addClass('err_signup_input');
      $(".update_profile_spin").hide();
      return false;
    }else if(phone == "") {
      $("#phn_num_err").html('phone number is required!');
      $("#fePhone").addClass('err_signup_input');
      $(".update_profile_spin").hide();
      return false;
    }else{

     var settings = {
       "url": "https://polledapp.herokuapp.com/api/edit",
          "method": "PUT",
          "timeout": 0,
          "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "dob": dob
          }
        };
        $.ajax(settings).done(function (response) {
          console.log(response);
          if (response) {
              let user = response.user;
              $(".update_profile_spin").hide();
              localStorage.setItem('user_firstname', user.first_name);
              localStorage.setItem('user_lastname', user.last_name);
              localStorage.setItem('user_dob', user.dob);
              localStorage.setItem('user_phone', user.phone);


              var pre_user_firstname = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
              var pre_user_lastname  = user.last_name.charAt(0).toUpperCase()+ user.last_name.slice(1)
              $("#member_name").html(pre_user_firstname + " " + pre_user_lastname);

              var nav_user_firstname = user.first_name.charAt(0).toUpperCase();
              var nav_user_lastname  = user.last_name.charAt(0).toUpperCase();
              $("#nav_name").html(nav_user_firstname + "" + nav_user_lastname);
          }
        }).fail( function(err) {
           console.log(err);
          if (err) {
            $(".update_profile_spin").hide();

          }

        });
    }
	});

//Adding the user bio
    $(document).on('click', '#addBio', function(e) {
        e.preventDefault();

      $(".update_bio_spin").show();
      $("#BioHelp").show();
      let bioText = $("#bioText").val();

      $("#bioText").removeClass('err_signup_input');
      $("#bio_err").html('');

      if (bioText == "") {
          $("#bio_err").html('Bio field is required!');
          $("#bioText").addClass('err_signup_input');
          $("#BioHelp").hide();
          $(".update_bio_spin").hide();
          return false;
        }else if(bioText.length < 5){
          $("#bio_err").html('Bio should be above 5 characters!');
          $("#bioText").addClass('err_signup_input');
          $("#BioHelp").hide();
          $(".update_bio_spin").hide();
          return false;
        }else if(bioText.length > 200){
          $("#bio_err").html('Bio should be below 200 characters!');
          $("#bioText").addClass('err_signup_input');
            $("#BioHelp").hide();
          $(".update_bio_spin").hide();
          return false;
        }else{

         var settings = {
           "url": "https://polledapp.herokuapp.com/api/bio",
              "method": "PUT",
              "timeout": 0,
              "headers": {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
              },
              "data": {
                "bio": bioText
              }
            };
            $.ajax(settings).done(function (response) {
              console.log(response);
              if (response) {
                  $(".update_bio_spin").hide();
                  message = response.message;
                  bio = response.bio;

                  $("#member_bio").html(bio);
                  $(".alert_default").html(message);
                  $("#editBioModal").modal("toggle");
                  localStorage.setItem('bio', bio);

              }
            }).fail( function(err) {
               console.log(err);
              if (err) {
                $(".update_bio_spin").hide();

              }

            });
        }
    });
    //Update User Photo
    $(document).on('change', '#uploadImage', function(e) {
        e.preventDefault();

        // $("#img_text").css('visibility', 'visible');
        // $("#img_text").html('')
        if (uploadKey == 0) {
           $("#uploadImageModal").modal("toggle");
        }

        let image = $('#uploadImage')[0].files[0];
        let fd = new FormData();
         if (image) {
            var reader = new FileReader();
            console.log(reader);

            reader.onload = function (e) {
                $("#ImagePreview")
                    .html(`
                      <img class="user_photo img_preview" src="${e.target.result}" alt="Image Preview" width="100">`);
             uploadKey = 1;

            };

            reader.readAsDataURL(image);
        }

        let totalSizeMB = image.size / Math.pow(1024,2);

        fd.append('image', image);
        console.log(image);
        console.log(fd);

        console.log("pass");
    });

    $(document).on('click', '.saveImage', function(e) {
      e.preventDefault();
      let image = $('#uploadImage')[0].files[0];

      let fd = new FormData();
       fd.append('image', image);
       console.log(image);
       console.log(fd);

      var settings = {
           "url": "https://polledapp.herokuapp.com/api/upload",
              "method": "PUT",
              "timeout": 0,
              "headers": {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
              },
              "data": fd
            };
            $.ajax(settings).done(function (response) {
              console.log(response);
              if (response) {
                $(".upload_spin").hide();
                uploadKey = 0;

              }
            }).fail( function(err) {
               console.log(err);
              if (err) {
                $(".upload_spin").hide();

              }

            });
    });

//     var formData = new FormData();
// formData.append('file', $('#file')[0].files[0]);

// $.ajax({
//        url : 'upload.php',
//        type : 'POST',
//        data : formData,
//        processData: false,  // tell jQuery not to process the data
//        contentType: false,  // tell jQuery not to set contentType
//        success : function(data) {
//            console.log(data);
//            alert(data);
//        }
// });
