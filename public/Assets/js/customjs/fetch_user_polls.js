$(document).ready(function () {

    const feeds = [];
    let offset = 5;
    let key = "open";

const triggerStaticFeeds = () => {
       $("#feed_loader").show();
       var settings = {
        "url": `${baseUrl}api/feeds`,
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        if (response) {
            console.log(response);
            $("#feed_loader").hide();
            var feedsData = response.data.feeds;

            feeds.push(feedsData);
            loadFeeds();
        }
    });

}
const triggerDynamicFeeds = () => {
    key = "close";
   var settings = {
    "url": `${baseUrl}api/feeds/${offset}`,
    "method": "GET",
    "headers": {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "timeout": 0,
    };
    console.log(settings);
        $.ajax(settings).done(function (response) {
            if (response) {
                console.log(response);
                $(".dynamic_feed_loader").hide();
                let feedsData = response.data.scrolled_feeds;

                if (feedsData.length == 0) {
                    key = "open";
                    return console.log("No more feeds to load...");
                }
                feeds.push(feedsData);
                console.log(feeds);
                loadFeeds();
                offset = response.data.new_offset;
                key = "open";
            }
        }).fail( function(err) {
          console.log(err);
          if (err) {
            $(".dynamic_feed_loader").hide();
            key = "open";
          }

        });

}

const loadFeeds = () => {
    if (feeds != []) {
        $(`#feeds_box`).html(`<div class="col-lg-12 col-sm-12 mt-2 mb-10 addFastPoll" style="margin-top:30px;">
            <div class="card card-post card-post--aside card-post--1 poll_box" id="poll-card">
                 <br>
                 <h4 style="font-weight:bold; font-size:20px; cursor:pointer; margin-left:20px; margin-top:10px;">
                 What do you want ask... ?
                 <span style="float: right; color:#f58731; margin-right:20px;"><i class="fas fa-poll" style="font-size: 20px;"></i> New Poll</span>
                 </h4>
                 <br>
            </div>
          </div>`);

    for (var v = 0; v < feeds.length; v++) {
        for (var i = 0; i < feeds[v].length; i++) {
              let wrapImage = `${feeds[v][i].image_link}${feeds[v][i].image}`;
              $(`#feeds_box`).append(`
                <div class="col-lg-12 col-sm-12 mt-2 mb-2">
                    <div class="card card-post card-post--aside card-post--1" id="poll-card">
                        <div class="col-11 ml-1">
                            <img src="${wrapImage}" style="width:40px; font-weigh:bold;" class="mt-3" id="user-image">
                            <span class="mt-5 ml-2 card-name" style="font-weight:bold; font-size:20px;">${feeds[v][i].firstname + " " + feeds[v][i].lastname}</span>
                            <a href="#" class="card-post_category badge badge-pill badge-info mt-3 ec_poll-interest" >${feeds[v][i].interest}</a>
                        </div>
                        <div class="col-10 ec_poll-question mt-2">
                            <span class="ec_med-text" style="font-weight:bold;">${feeds[v][i].poll + " ?"}</span>
                        </div>
                        <div id="options_box${feeds[v][i].poll_id}">
                        </div>
                        <div class="col-11 ec_poll-misc mt-3">
                            <span class="text-muted col-12">29 February 2019</span>
                            <button type="submit" class="btn brand-bg text-white float-right mr-4" style="margin-bottom:10px;">Vote!</button>
                        </div>
                    </div>
                </div>
            `);

            for (let j = 0; j < feeds[v][i].option.length; j++) {
                $(`#options_box${feeds[v][i].poll_id}`).append(`
                  <div class="ec_poll-answers mt-2 col-11">
                    <div class="ec_poll-answers mt-2 col-11">
                      <div class="custom-control custom-radio">
                        <input type="radio" id="poll1option${feeds[v][i].option[j].option_id}" name="polloption" class="custom-control-input">
                        <label class="custom-control-label poll1option" for="poll1option${feeds[v][i].option[j].option_id}"  data-selectedoption="${feeds[v][i].option[j].option_id}">${feeds[v][i].option[j].option}</label>
                      </div>
                    </div>
                    </div>`);

                $(document).on('click', '.poll1option', function () {
                    var option_data = $(this).data("selectedoption");
                });

            }
        }
    }
     $(`#feeds_box`).append(`
         <div class="d-flex justify-content-center feed_loader_2" style="height: 3vh;">
           <div class="spinner-grow juni_spin dynamic_feed_loader" role="status"></div>
           <span class="dynamic_spin_text dynamic_feed_loader">Loading more feeds please wait...</span>
         </div>
     `)
    }else{
        $("#feeds_box").html(`
              <div class="d-flex justify-content-center feed_loader" style="height: 3vh;">
                 <p> You have no feed at this time, you can start by creating a poll
                  <span  class="addFastPoll">Create Poll</span><p>
              </div>
        `);
    }
}
     //Onscroll Event to load more feeds
    $('#feeds_box').on('scroll', function() {
       // console.log($(this).scrollTop());
       // console.log($('#feeds_box').position().top);
       // var formatter = $("#feeds_box")[0].scrollHeight - $(this).scrollTop();
      if ($("#feeds_box")[0].scrollHeight - $("#feeds_box")[0].scrollTop === $("#feeds_box")[0].clientHeight){
            $(".dynamic_feed_loader").show();
            if (key == "open") {
               triggerDynamicFeeds();
           }else{
                $(".dynamic_spin_text").css('margin-left', '-100px');
                $(".dynamic_spin_text").html("Loading please wait");
           }

       }else{
           $(".dynamic_spin_text").html("Loading more feeds please wait...");
       }
    });
    triggerStaticFeeds();
});
