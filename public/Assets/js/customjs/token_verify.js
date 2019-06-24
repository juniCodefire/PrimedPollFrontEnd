$(document).ready( function() {
    const parsedUrl = new URL(window.location.href);
    const success = parsedUrl.searchParams.get("success");

    if (success == "new_member") {
        $("#juni_info").html("Thank you for creating an account with us, an email has been sent to you with verification code to comfirm.");
    }else if (success == "polled_member") {
        $("#juni_info").html("Welcome back! please enter the verifcation code sent to your mail to confirm account.");
    }

	$("#token_verify").on('submit', function(e) {
		e.preventDefault();
        $(".juni_spin").show();
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

            $(".juni_spin").hide();

              if (response.verified == "true"){
                localStorage.setItem('token', response.token);
                location.replace("../Users/complete-registration.html");

            }else if(response.verified == "done"){
                $("#juni_err_verifytoken").html("Account verified already, try logging in.");
                $("#juni_err_verifytoken").css('color', 'red');

                setInterval(() => {
                    location.replace("../Users/signin.html");
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
                        $(".juni_spin").hide();
        			}

        		}
        	}

        });
	});
});
