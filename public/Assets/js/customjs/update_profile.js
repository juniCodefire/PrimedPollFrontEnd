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
       "url": `${baseUrl}api/edit`,
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
           "url": `${baseUrl}api/bio`,
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
				$(".alert_note").html(`Click "Change" to choose another image.`);
				$(".alert_note").css('color', 'lightgrey');
				$("#img_text").html('Upload an image (jpeg, jpg, png format only)');

        if (uploadKey == 0) {
           $("#uploadImageModal").modal("toggle");
        }

         let image = $('#uploadImage')[0].files[0];
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

    });

    $(document).on('click', '.saveImage', function(e) {
      e.preventDefault();
			let data = document.querySelector("#uploadImage");
      let image = data.files[0];
			$(".se-pre").show();

				checkFormat(image.type);
			  let totalSizeMB = image.size / Math.pow(1024,2);
				if (totalSizeMB > 2) {
					$(".se-pre").hide();
					$(".alert_note").html("(Image too large!, Please choose image size below 2MB.)");
					$(".alert_note").css('color', 'tomato');
					return false;
				}
			  var form = new FormData();
				form.append("image", image);
				console.log(token)

				var settings = {
				  "url": `${baseUrl}api/upload`,
				  "method": "POST",
				  "timeout": 0,
						"headers": {
							"Authorization": "Bearer " + token
						},
				  "processData": false,
				  "mimeType": "multipart/form-data",
				  "contentType": false,
				  "data": form
				};

				$.ajax(settings).done(function (response) {
					$(".se-pre").hide();
				  let data = JSON.parse(response);
					let prop = data.image_prop;
					let wrapImage = `${data.image_link}${prop.widthThumb},${prop.imageStyle},${prop.aspectRatio},${prop.cropType2}/${data.image}`;


					$(".user_photo").attr('src', wrapImage);
					$(".navImg").attr('src', wrapImage);
					localStorage.setItem('user_image', wrapImage);
					$("#uploadImageModal").modal("toggle");
					uploadKey = 0;
				}).fail( function(err) {
           console.log(err);
            if (err) {
             $(".se-pre").hide();
          }
        });
    });

		function checkFormat($formatType) {
			 let formats = ['image/jpeg', 'image/png', 'image/jpg'];
			 if(!formats.includes($formatType)) {
				 $(".se-pre").hide();
				 $("#img_text").css('visibility', 'visible');
				 $("#img_text").css('color', 'tomato');
				 $("#img_text").html("(Please use only valid format [jpeg, png, jpg].)");
				 $(".alert_note").html("(Image format type not allowed!, Please use only[image/jpeg, image/png, image/jpg].)");
				 $(".alert_note").css('color', 'tomato');
				 return false;
			 }
		}
