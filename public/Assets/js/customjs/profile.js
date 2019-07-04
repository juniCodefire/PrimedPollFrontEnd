
//Show case Name]
var pre_user_firstname = user_firstname.charAt(0).toUpperCase() + user_firstname.slice(1);
var pre_user_lastname = user_lastname.charAt(0).toUpperCase() + user_lastname.slice(1)
$("#member_name").html(pre_user_firstname + " " + pre_user_lastname);
$("#feEmail").html(user_email);

//Show case the user Image
var member_image = `

              <label id="image_power" for="uploadImage" style="font-size:10px; width:100%;">
              <span id="img_text">Upload an image (jpeg, jpg, png format only)</span>
               <div class="image_click_box" id="image_click_box" style="max-width:110px; border-radius:50%; margin:auto;" >
                  <div>
                     <i class="fa fa-camera image_click" aria-hidden="true"></i>
                      <form id="data" enctype="multipart/form-data">
                        <input style="display:none;" type="file" id="uploadImage"  accept="image/png, image/jpeg, Image/jpg" value="noImage.png" />
                      </form>
                  </div>
                  <img class="rounded-circle user_photo" src="${user_image }" alt="User Avatar" width="110">
               </div
               </label>
                `;
$("#member_image").html(member_image);

$("#feFirstName").val(user_firstname);
$("#feLastName").val(user_lastname);
$("#feEmail").val(user_email);
$("#fePhone").val(user_phone);
$("#fedob").val(user_dob);

if (!user_bio == "")
{
    $("#bioText").val(user_bio);
    $("#member_bio").html(user_bio);
}


setInterval(function ()
{
    $('.alert_default').hide();
}, 10000);

let del_control_key = "open";

const loadProfile = () =>
{

    var settings = {
        "url": `${ baseUrl }api/user/interest`,
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "timeout": 0,
    };
    $.ajax(settings).done(function (response)
    {
        if (response)
        {
            console.log(response);
            $(".preload_interest").hide();

            $("#user_interest_box").html(``);
            $("#user_interest_box").append(`
                <div id="add_interest" class="col-sm-5 col-lg-3 col-md-5 mx-3 my-1 text-center edit-interests-div">
                    <p class="interest_input" id="interest_title" style='font-size:10px;'>
                       Add New <i class='fa fa-plus check_interest'></i>
                    </p>
                </div>`);
            for (var i = 0; i < response.length; i++)
            {
                let interest_title = response[i].title.charAt(0).toUpperCase() + response[i].title.slice(1);
                let interest_hanger = `
                          <p class="interest_input" id="interest_title" style='font-size:10px;'>
                             ${interest_title }
                          </p>`;

                $("#user_interest_box").append(`
                        <div class="col-sm-5 col-lg-3 col-md-5 mx-3 my-1 text-center interest_holder"
                            id="interest_holder${response[i].id }" style="padding: 0; margin-top:4px;"
                            data-interestid = "${response[i].id }"
                            data-interesttitle = "${interest_title }">

                            ${interest_hanger }

                            <p class="interest_input" id="interest_manage">
                               Manage Interest <i class='fa fa-gear fa-spin check_interest'></i>
                            </p>
                        </div>
                        `);
                if (interest_title > 12)
                {
                    $(`#interest_holder${ response[i].id }`).removeClass('col-lg-3');
                    $(`#interest_holder${ response[i].id }`).addClass('col-lg-4');
                }
            }
        }
    });

}

//This pops up the modal that add new interest
$(document).on('click', '#add_interest', function ()
{
    $("#newInterestModal").modal("toggle");
});

$(document).on('click', '#manage_interest_add', function ()
{
    $("#manageInterestModal").modal("toggle");
    $("#newInterestModal").modal("toggle");
});

$(document).on('click', '.interest_holder', function ()
{
    if (del_control_key == close)
    {
        return $("#alert_wait").html("Please wait a recent action is taking place!");
    }
    let interest_title = $(this).data(`interesttitle`);
    let interest_id = $(this).data(`interestid`);

    $("#input_interest_name").html(interest_title);
    $("#id_holder").val(interest_id);

    $("#manageInterestModal").modal("toggle");
});
//This redirwct the user to his specific interest fields

$(document).on('click', '#manage_see_feeds', function ()
{
    let interest_id = $(`#id_holder`).val();
    window.open(`user-feed.html?interest_id=${ interest_id }`, '_self');
    // location.replace();

});


loadProfile();
