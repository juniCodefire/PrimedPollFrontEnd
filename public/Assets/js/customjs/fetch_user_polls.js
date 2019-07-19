

    const feeds = [];
    let offset = 5;
    let key = "open";

    const triggerStaticFeeds = () =>
    {
        $("#feed_loader").show();
        var settings = {
            "url": `${ baseUrl }api/feeds`,
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
                $("#feed_loader").hide();
                var feedsData = response.data.feeds;

                feeds.push(...feedsData);
                loadFeeds();
            }
        });

    }
    const triggerDynamicFeeds = () =>
    {
        key = "close";
        var settings = {
            "url": `${ baseUrl }api/feeds/${ offset }`,
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
                key = "open";
                $(".dynamic_feed_loader").hide();
                let feedsData = response.data.scrolled_feeds;

                if (feedsData.length == 0)
                {
                    return $(".dynamic_spin_text").html("No more feeds to load...");
                }
                feeds.push(...feedsData);
                loadFeeds();
                offset = response.data.new_offset;
            }
        }).fail(function (err)
        {
            console.log(err);
            if (err)
            {
                $(".dynamic_feed_loader").hide();
                key = "open";
            }

        });

    }

    const loadFeeds = () =>
    {
      let option_id = null;
      let poll_owner_id = null;
      let poll_id = null;

      console.log(feeds)
        if (feeds != [])
        {
          console.log(feeds);
            $(`#feeds_box`).html(`<div class="col-lg-12 col-sm-12 mt-2 mb-10 addFastPoll" style="margin-top:30px;">
            <div class="card card-post card-post--aside card-post--1 poll_box" id="poll-card">
                 <br>
                 <h4 style="font-weight:bold; cursor:pointer; margin-left:20px; margin-top:10px; font-size:15px;">
                 What do you want ask... ?
                 <span style="float: right; color:#f58731; margin-right:20px;"><i class="fas fa-poll" style="font-size:15px;"></i> New Poll</span>
                 </h4>
                 <br>
            </div>
          </div>`);

          //map all Feeds from the feeds array
        feeds.map(feed => {
          //Destrusturing feeds
          const {image_link, image, firstname, lastname, interest, poll, poll_id, poll_owner_id, option} = feed;
          let wrapImage = `${ image_link}${ image }`;

              $(`#feeds_box`).append(`
                    <div class="col-lg-12 col-sm-12 mt-2 mb-2">
                        <div class="card card-post card-post--aside card-post--1 px-0 mx-0" id="poll-card">
                            <div class="col-12 ml-1">
                                <img src="${ wrapImage }" style="width:40px; font-weigh:bold;" class="mt-3" id="user-image">
                                <span class="mt-5 ml-2 card-name" style="font-weight:bold; font-size:15px;">${firstname + " " + lastname }</span>
                                <a href="#" class="card-post_category badge badge-info mt-3 mr-1 ec_poll-interest" >${ interest }</a>
                            </div>
                            <div class="col-10 ec_poll-questiocol-10 ec_poll-question mt-2">
                                <span class="ec_med-text" style="font-weight:bold;">${ poll + " ?" }</span>
                            </div>
                            <div id="options_box${ poll_id }">
                            </div>
                            <div class="col-12 ec_poll-misc mt-3">
                                <span class="text-muted col-12">29 February 2019</span>
                                <div class="preload_vote float-right" id="preload_vote${ poll_id }" role="status">
                                </div>
                                <button type="submit" class="btn brand-bg text-white float-right voteBtn" id="voteBtn${ poll_id }"
                                data-selected-vote="${ poll_id }" style="margin-bottom:10px;">Vote!</button>
                            </div>
                        </div>
                    </div>
             `)

             //Here we map the options for the polls
             option.map(opt => {

               const {option_id, option} = opt;
               $(`#options_box${ poll_id }`).append(`
                       <div class="ec_poll-answers mt-2 col-11">
                         <div class="ec_poll-answers mt-2 col-11">
                           <div class="custom-control custom-radio">
                             <input type="radio" id="poll1option${ option_id }" name="polloption" class="custom-control-input">
                             <label class="custom-control-label poll1option" for="poll1option${option_id }"
                             data-selected-option-id="${ option_id }" data-selected-poll-creator="${ poll_owner_id}"
                             data-selected-poll-id="${ poll_id}">
                             ${ option }
                             </label>
                           </div>
                         </div>
                         </div>`
                      );
              })

        });
        //Here we append the loader for the new feeds
       $(`#feeds_box`).append(`
            <div class="justify-content-center feed_loader_2 dynamic_feed_loader">
              <div class="preload_more_feeds dynamic_feed_loader" role="status">
              </div>
              <div class="dynamic_spin_text">
              Loading more feeds please wait...
              </div>
            </div>
        `)
        $(document).on('click', '.poll1option', function ()
        {
          option_id      = $(this).data("selected-option-id");
          poll_owner_id  = $(this).data("selected-poll-creator");
          poll_id        = $(this).data("selected-poll-id");
        });

        $(document).on('click', '.voteBtn', function () {
          const check_poll_id = $(this).data("selected-vote");

          if (check_poll_id == poll_id) {

            $(`#voteBtn${check_poll_id}`).hide();
            $(`#preload_vote${ check_poll_id }`).show();
            voteTrigger(option_id,  poll_id, poll_owner_id);

          }else {
            console.log('You need to select an option first to vote!');
          }
        });

        } else
        {
            $("#feeds_box").html(`
              <div class="d-flex justify-content-center feed_loader" style="height: 3vh;">
                 <p> You have no feed at this time, you can start by creating a poll
                  <span  class="addFastPoll">Create Poll</span><p>
              </div>
        `);
        }
    }
    //Onscroll Event to load more feeds
    $('#feeds_box').on('scroll', function ()
    {
        // console.log($(this).scrollTop());
        // console.log($('#feeds_box').position().top);
        // var formatter = $("#feeds_box")[0].scrollHeight - $(this).scrollTop();
        if ($("#feeds_box")[0].scrollHeight - $("#feeds_box")[0].scrollTop === $("#feeds_box")[0].clientHeight)
        {
            $(".dynamic_feed_loader").show();
            if (key == "open")
            {
                triggerDynamicFeeds();
            } else
            {
                $(".dynamic_spin_text").html("Loading please wait");
            }

        } else
        {
            $(".dynamic_spin_text").html("Loading more feeds please wait...");
        }
    });
    triggerStaticFeeds();
