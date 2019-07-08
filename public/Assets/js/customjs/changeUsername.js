//Adding the user bio
$(document).on('click', '#addUsername', function (e)
{
    e.preventDefault();

    let username = $("#newuserName").val();
    $("#oldPass_err").hide();
    $("#newPass_err").hide();
    $("#username_err").removeClass('err_signup_input');

    re = /(?=.*[a-z]){6,}/;
    if (!re.test(username))
    {
        $("#username_err").show();
        $("#username_err").addClass('err_signup_input');
        $("#username_err").html(`Username must contain at least six characters, 
        including lowercase letters and numbers!`);
        return false;
    } else
    {
        $(".update_username_spin").show();
        $("#addUsername").hide();
        var settings = {
            "url": `${ baseUrl }api/username`,
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "username": username
            }
        };
        $.ajax(settings).done(function (response)
        {
            console.log(response);
            if (response)
            {
                const data = response.user;
                $(".update_username_spin").hide();
                $("#addUsername").show();

                $("#username").html(`${ data.username } <i class="edit-bio-icon fas fa-pencil-alt"></i>`);
                //Insert Into the Usernmae Input
                $("#newuserName").val(data.username);

                localStorage.setItem('username', data.username)

                $('.alert_default').show();
                $('.alert_default').html(`Done (Username Changed Successfully!)`);
                $("#changeUsername").modal("toggle");

            }
        }).fail(function (err)
        {
            console.log(err);
            if (err)
            {
                $(".update_username_spin").hide();
                $("#addUsername").show();
                if (err.status === 422)
                {
                    if (err.responseJSON.username)
                    {
                        $("#username_err").show();
                        $("#username_err").html.html(err.responseJSON.username[0]);
                        $("#username_err").addClass('err_signup_input');
                    }
                }
            }

        });
    }
});