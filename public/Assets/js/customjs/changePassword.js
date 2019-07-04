//Adding the user bio
$(document).on('click', '#addBio', function (e)
{
    e.preventDefault();

    $("#update_password_spin").show();
    $("#addPassword").hide();
    let oldPassword = $("#oldPassword").val();
    let newPassword = $("#newPassword").val();
    let confirmPassword = $("#confirmPassword").val();

    $("#bioText").removeClass('err_signup_input');
    $("#bio_err").html('');

    if (bioText == "")
    {

    } else
    {

        var settings = {
            "url": `${ baseUrl }api/bio`,
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
        $.ajax(settings).done(function (response)
        {
            console.log(response);
            if (response)
            {
                $(".update_bio_spin").hide();
                $("#addBio").show();
                message = response.message;
                bio = response.bio;

                $("#member_bio").html(bio);
                $(".alert_default").html(message);
                $("#editBioModal").modal("toggle");
                localStorage.setItem('bio', bio);

            }
        }).fail(function (err)
        {
            console.log(err);
            if (err)
            {
                $(".update_bio_spin").hide();
                $("#addBio").show();

            }

        });
    }
});