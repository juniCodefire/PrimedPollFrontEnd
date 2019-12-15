
$(document).ready(function () {
  $("#signin-form").on('submit', function (e) {
    e.preventDefault();

    $(".se-pre").show();

    var email = $("#ec_email").val();
    var password = $("#ec_password").val();


    if (email == "") {
      $("#juni_err_email").html('email is required');
      $("#ec_email").addClass('err_signup_input');
      $(".se-pre").hide();
      return false;
    } else if (password == "") {
      $("#juni_err_password").html('password cannot be empty');
      $("#ec_password").addClass('err_signup_input');
      $(".se-pre").hide();
      return false;
    } else {
      $("#ec_email").removeClass('err_signup_input');
      $("#ec_password").removeClass('err_signup_input');
      $("#juni_err_email").html('');
      $("#juni_err_password").html('');

      var settings = {
        "url": `${ baseUrl }api/login`,
        "method": "POST",
        "timeout": 0,
        "data": {
          "email": email,
          "password": password,
        }
      };

      $.ajax(settings).done(function (response) {
        if (response.data.success) {

          $("#reg_success").html(response.success);

          const token = response.data.token;
          const user = response.data.user;

          //Creating the image link
          let wrapImage = response.data.image_link + user.image;

          localStorage.setItem('token', token);

          localStorage.setItem('user_id', user.id);
          localStorage.setItem('user_firstname', user.first_name);
          localStorage.setItem('user_lastname', user.last_name);
          localStorage.setItem('user_lastname', user.last_name);
          localStorage.setItem('user_email', user.email);
          localStorage.setItem('user_image', wrapImage);
          localStorage.setItem('user_dob', user.dob);
          localStorage.setItem('user_phone', user.phone);
          localStorage.setItem('bio', user.bio);
          localStorage.setItem('username', user.username);

          console.log(window)
          //If server use the app sub domain 
          location.replace("../user/feeds.html");
        }
      }).fail(function (err) {
        if (err) {
          $(".se-pre").hide();
          if (err.status === 422) {
            if (err.responseJSON.email) {
              $("#juni_err_email").html(err.responseJSON.email[0]);
              $("#ec_email").addClass('err_signup_input');
            }
            if (err.responseJSON.password) {
              $("#juni_err_password").html(err.responseJSON.password[0]);
              $("#ec_password").addClass('err_signup_input');
            }
            if (err.responseJSON.message) {
              $("#juni_err_email").html(err.responseJSON.message);
              $("#ec_email").addClass('err_signup_input');
            }
          }

          if (err.status === 401) {

            if (err.responseJSON.data.user_status == 0) {
              location.replace("../user/confirmation.html?success=polled_member");
            }
          }
          if (err.status === 404) {
            $("#juni_err_email").html("Ops! This credential is invalid or does not exist");
            $("#ec_email").addClass('err_signup_input');
          }
        }

      });
    }


  });
});



































































 // const iframeGenerate = () => {
 //        const ifrm = document.createElement("iframe");
 //        ifrm.setAttribute("src", "http://127.0.0.1:54578/user/feeds.html");
 //        ifrm.style.width = "640px";
 //        ifrm.style.height = "480px";
 //        ifrm.style.display = "none";
 //        document.body.appendChild(ifrm);
 //        return ifrm;

 //    }

// const crossDomainTransfer = (data) => {
// var domain = 'http://127.0.0.1:54578';
// var myPopup = window.open(domain + '/user/feeds.html',"_self");

// //periodical message sender
// setInterval(function(){
//   var message = 'Hello!  The time is: ' + (new Date().getTime());
//   console.log('blog.local:  sending message:  ' + message);
//   myPopup.postMessage(message,domain); //send the message and target URI
// },6000);

// }