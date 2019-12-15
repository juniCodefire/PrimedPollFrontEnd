$(document).ready( function() {
    const parsedUrl = new URL(window.location.href);
    const success = parsedUrl.searchParams.get("success");

    if (success == "new_member") {
        $("#juni_info").html("Thank you for creating an account with us, a confirmation code has been sent to your email.");
    }else if (success == "polled_member") {
        $("#juni_info").html("Welcome back we miss you, your account needs confirmation please check email to confirm account.");
    }

	$("#token_verify").on('submit', function(e) {
		e.preventDefault();
        $(".se-pre").show();
        $("#juni_info").hide();
		var verifycode    = $("#verifycode").val();

		 var settings = {
          "url": `${baseUrl}api/register/verify`,
          "method": "POST",
          "timeout": 0,
          "data": {
            "verifycode": verifycode
          }
        };
        $.ajax(settings).done(function (response) {
          if (response) {

          $(".se-pre").hide();

              if (response.verified == "true"){
                localStorage.setItem('token', response.token);
                location.replace("../user/complete-registration.html");

            }else if(response.verified == "done"){
                $("#juni_err_verifytoken").html("Account verified already, try logging in.");
                $("#juni_err_verifytoken").css('color', 'red');

                setInterval(() => {
                    location.replace("../user/signin.html");
                }, 2000);
            }else{
                $("#juni_err_verifytoken").html("Verificaion Code does not match.");
                $("#juni_err_verifytoken").css('color', 'red');
                $("#verifycode").css('border', '1px solid red');
            }
          }
        }).fail( function(err) {
        	if (err) {
        		if (err.status === 422) {
        			if (err.responseJSON.verifycode) {
        				$("#juni_err_verifytoken").html(err.responseJSON.verifycode[0]);
        				$("#verifycode").addClass('err_signup_input');
                      $(".se-pre").hide();
        			}

        		}
        	}

        });
	});
});
