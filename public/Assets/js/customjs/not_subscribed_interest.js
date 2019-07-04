
let new_interests = [];

const NotSubscribedInterest = () =>
{
  $(".not_subscribed_spin").show();
  $(".add_New_Interest").hide();

  var settings = {
    "url": `${ baseUrl }api/not/subscribed/interest`,
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
      $(".not_subscribed_spin").hide();
      $(".add_New_Interest").show();
      var interest = response.not_subscribed_interest;
      if (interest.length < 1)
      {
        return $("#not_subscribed_box").html(`No new interest availaible at this time, please do check back!`);
      }
      $("#not_subscribed_box").html(``);
      for (var i = 0; i < interest.length; i++)
      {
        let interest_title = interest[i].title.charAt(0).toUpperCase() + interest[i].title.slice(1);
        $("#not_subscribed_box").append(`
             <div class="col-sm-5 col-lg-4 col-md-5 mx-3 my-1 text-center get_interest_id"
             id="ns_interest${interest[i].id }" data-getinterestid="${ interest[i].id }" style="padding: 0;">
                <p class="interest_input" id="interest_title">
                  ${interest_title }
                </p>
            </div>
            `);
      }
    }
  });
}


$(document).on('click', '.add_interest', function (e)
{
  e.preventDefault();

  $(".not_subscribed_spin").show();
  $("#add_New_Interest").hide();
  $(".add_interest").attr("disabled", true);

  //Append and load the User Interest block preloader
  $("#user_interest_box").append(`<div class="preload_interest" role="status">
                                  </div>`);
  $(".preload_interest").show();
  var settings = {
    "url": `${ baseUrl }api/add/interest`,
    "method": "POST",
    "headers": {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "timeout": 0,
    "data": {
      "interest_ids": new_interests
    },
  };
  $.ajax(settings).done(function (response)
  {
    if (response)
    {
      console.log(response);
      $(".add_interest").attr("disabled", true);
      $(".not_subscribed_spin").hide();
      $("#add_New_Interest").show();
      $("#newInterestModal").modal("toggle");

      $('.alert_default').show();
      $('.alert_default').html(`Done (Added 1 Interest!)`);

      loadProfile();
      NotSubscribedInterest();
    }
  }).fail(function (err)
  {
    $(".not_subscribed_spin").hide();
    $("#add_New_Interest").show();
    console.log(err);
  });
});


//Get the interest data
$(document).on('click', '.get_interest_id', function ()
{
  let ns_interest_id = $(this).data('getinterestid');

  let check_exist = jQuery.inArray(ns_interest_id, new_interests);
  console.log(check_exist);

  if (check_exist != -1)
  {
    new_interests.splice(check_exist, 1);
    $(`#ns_interest${ ns_interest_id }`).css('background', '#ffffff');
    $(`#ns_interest${ ns_interest_id }`).css('color', '#f58731');
    $(`#ns_interest${ ns_interest_id }`).css('border-color', '#f58731');
  } else
  {
    new_interests.push(ns_interest_id);
    $(`#ns_interest${ ns_interest_id }`).css('background', '#f58731');
    $(`#ns_interest${ ns_interest_id }`).css('color', 'white');
    $(`#ns_interest${ ns_interest_id }`).css('border-color', '#e6e6e6');
  }

  if (new_interests.length >= 1)
  {
    $(".add_interest").attr("disabled", false);
  } else
  {
    $(".add_interest").attr("disabled", true);
  }
});

NotSubscribedInterest();
