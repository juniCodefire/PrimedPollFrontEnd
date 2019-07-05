//Adding the user bio
$(document).on('click', '#addUsername', function (e)
{
    e.preventDefault();
    console.log('really')

    $(".update_username_spin").show();
    $("#addUsername").hide();
    let username = $("#newuserName").val();
    $("#oldPass_err").hide();
    $("#newPass_err").hide();

    re = /(?=.*\d)(?=.*[a-z]){6,}/;
    if (!re.test(username))
    {
        $("#username_err").show();
        $("#username_err").html(`Username must contain at least six characters, 
        including lowercase letters and numbers!`);
        return false;
    } else
    {
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
                $(".update_username_spin").hide();
                $("#addUsername").show();

                $("#username").html(`${ user_name } <i class="edit-bio-icon fas fa-pencil-alt"></i>`);
                //Insert Into the Usernmae Input
                $("#newuserName").val(user_name);

                localStorage.setItem('username', username)

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
            }

        });
    }
});