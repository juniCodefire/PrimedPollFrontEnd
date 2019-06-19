$(document).ready(function () {

  $(".get_reqeust_spin").show();

  var settings = {
    "url": "https://polledapp.herokuapp.com/api/interest",
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
    if (response) {
      console.log(response);
      $(".get_reqeust_spin").hide();
      let interest = response;

      for (var i = 0; i < interest.length; i++) {
        let interest_title = interest[i].title.charAt(0).toUpperCase() + interest[i].title.slice(1);
        $("#interest_box").append(`<div id="interest${interest[i].id}"
          data-getinterestid="${interest[i].id}" class='cat_data interest interest_sty text-center col-4 col-sm-3 col-md-4 col-lg-3 mx-3 my-2 '><span class='interest-words' id='cat_data'><i id="check${interest[i].id}"
          class='fa fa-check check_interest' aria-hidden='true'></i>${interest_title}</span></div>`);

        $(".juni_interest_info").show();
       

      }
    }
  });

});

