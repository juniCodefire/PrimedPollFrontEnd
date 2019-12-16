$(document).ready(function () {

    $("#user_interest_loader").show();
    var settings = {
        "url": `${baseUrl}api/user/interest`,
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        if (response) {
            $("#user_interest_loader").hide();
            $(".selectInterest").html(``);
            $(".selectInterest").removeAttr(`disabled`);
            $("#add_interest_btn").removeAttr(`disabled`);
            $(".choose_interest_spin").hide();
            $(".selectInterest").append(`
                <option value="" selected>
                    Select an interest
                </option>
            `);

            for (var i = 0; i < response.length; i++) {
                $("#choosed_interest").append(`
                    <li class="nav-item">
                        <a class="nav-link" href="feeds.html?interest_id=${response[i].id}">
                        <span>${response[i].title.charAt(0).toUpperCase() + response[i].title.slice(1)}</span>
                        </a>
                    </li>
                    `);
                $(".selectInterest").append(`
                    <option value="${response[i].id}">
                        ${response[i].title.charAt(0).toUpperCase() + response[i].title.slice(1)}
                    </option>
                `);
            }
        }
    });

});
