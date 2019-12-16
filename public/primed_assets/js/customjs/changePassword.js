//Adding the user bio $(document).on('click', '#addPassword', function (e)
{
    e.preventDefault();

    let oldPassword = $("#oldPassword").val();
    let password = $("#newPassword").val();
    let password_confirmation = $("#confirmPassword").val();
    $("#oldPass_err").hide();
    $("#newPass_err").hide();
    // const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;

    if (oldPassword == "")
    {
        $("#oldPass_err").show();
        $("#oldPass_err").html('Please type in your old password to continue!');
        return false;
    } else if (password !== password_confirmation)
    {
        $("#newPass_err").show();
        $("#newPass_err").html('Password do not match!');
        return false;
    } else if (!re.test(password))
    {
        $("#newPass_err").show();
        $("#newPass_err").html(`Passwords must contain at least six characters, 
        including uppercase, lowercase letters and numbers!`);
        return false;
    } else
    {
        $(".update_password_spin").show();
        $("#addPassword").hide();
        var settings = {
            "url": `${ baseUrl }api/password`,
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": {
                "old_password": oldPassword,
                "password": password,
                "password_confirmation": password_confirmation
            }
        };
        $.ajax(settings).done(function (response)
        {
            console.log(response);
            if (response)
            {
                $(".update_password_spin").hide();
                $("#addPassword").show();

                //Clear the Input Field
                emptyField();

                $('.alert_default').show();
                $('.alert_default').html(`Done (Added, new password created!)`);
                $("#changePassword").modal("toggle");

            }
        }).fail(function (err)
        {
            console.log(err);
            if (err)
            {
                $(".update_password_spin").hide();
                $("#addPassword").show();
                emptyField();
            }

        });
    }
});
const emptyField = () =>
{
    //Clear the Input Field
    $("#oldPassword").val('');
    $("#newPassword").val('');
    $("#confirmPassword").val('');
}