

let feeds = [];
let offset = 20;
let key = "open";
let steps = 4;
let poll_id;

const parsedUrl = new URL(window.location.href);
const getSearchParam = parsedUrl.searchParams;
let interest_id = getSearchParam.get("interest_id");

const triggerStaticFeeds = (loader) => {
    if (loader == true) {
        $("#feed_loader").show();
    }
    var url_link = `${baseUrl}api/feeds`;
    if (interest_id) {
        url_link = `${baseUrl}api/single/feeds/${interest_id}`;
    }
    console.log(url_link);
    var settings = {
        "url": `${url_link}`,
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        if (response) {
            $("#feed_loader").hide();
            var feedsData = response.data.feeds;

            feeds.push(...feedsData);
            loadFeeds();
        }
    }).fail(function (err) {
        console.log(err);
    });

}
const triggerDynamicFeeds = () => {
    key = "close";
    var url_link = `${baseUrl}api/feeds/${offset}`;
    if (interest_id) {
        url_link = `${baseUrl}api/single/feeds/${interest_id}/${offset}`;
    }

    settings = {
        "url": `${url_link}`,
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        if (response) {
            key = "open";
            steps = 4;
            console.log(response);
            $(".dynamic_feed_loader").hide();
            let feedsData = response.data.scrolled_feeds;

            if (feedsData.length == 0) {
                $(".dynamic_feed_loader").hide();
                return $(".dynamic_spin_text").html("No more feeds to load...");
            }
            feeds.push(...feedsData);
            loadFeeds();
            offset = response.data.new_offset;
        }
    }).fail(function (err) {
        console.log(err);
        if (err) {
            $(".dynamic_feed_loader").hide();
            key = "open";
        }

    });

}

const loadFeeds = () => {
    let option_id = null;
    let poll_owner_id = null;
    let poll_id = null;
    console.log(poll_id);
    console.log(feeds)
    if (feeds != []) {
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
        feeds.map((feed, i) => {
            //Destrusturing feeds
            const { image_link, image, firstname, lastname, interest, poll, poll_id, poll_owner_id, option, poll_date, option_type, vote_status, votes_count } = feed;
            let wrapImage = `${image_link}${image}`;
            console.log(poll_date);
            if (option_type == 'text') {
                $(`#feeds_box`).append(`
                    <div class="col-lg-12 col-sm-12 mt-2 mb-2">
                        <div class="card card-post card-post--aside card-post--1 px-0 mx-0" id="poll-card">
                            <div class="preload_vote float-right" id="preload_vote${ poll_id}" role="status">
                            </div>
                            <div class="col-12 ml-1">
                                <img src="${ wrapImage}" style="width:40px; font-weigh:bold;" class="mt-3" id="user-image">
                                <span class="mt-5 ml-2 card-name" style="font-weight:bold; font-size:15px;">${firstname + " " + lastname}</span>
                                <a href="#" class="card-post_category badge badge-info mt-3 mr-1 ec_poll-interest" >${ interest}</a>
                            </div>
                            <div class="col-10 ec_poll-questiocol-10 ec_poll-question mt-2">
                                <span class="ec_med-text" style="font-weight:bold;">${ poll + " ?"}</span>
                            </div>
                            <div id="options_box${ poll_id}">
                            </div>
                            <div class="col-12 ec_poll-misc mt-3">
                                <span class="text-muted col-6">${poll_date}</span>
                                <span class="text-muted col-6"><i style="font-size:16px;" class="fa fa-thumbs-up" aria-hidden="true"></i>: ${votes_count}</span>
                                <span id="poll_users" class="text-muted col-6" data-poll-passed-id="${poll_id}">
                                    <i style="font-size:16px;" class="fa fa-users" aria-hidden="true"></i>
                                </span>
                                <button type="submit" class="btn brand-bg text-white float-right voteBtn" id="voteBtn${poll_id}"
                                data-selected-vote="${ poll_id}" data-vote-status="${vote_status}" data-poll-owner="${poll_owner_id}"
                                style="margin-bottom:10px; cursor:pointer;" data-toggle="popover" title="Not allowed!" data-content="Please select an option to vote">Vote!
                                </button>
                            </div>
                        </div>
                    </div>
                `)
            } else if (option_type == 'image') {
                $(`#feeds_box`).append(`
                    <div class="col-lg-12 col-sm-12 mt-2 mb-2">
                        <div class="card card-post card-post--aside card-post--1 px-0 mx-0" id="poll-card">
                        <div class="preload_vote float-right" id="preload_vote${ poll_id}" role="status">
                        </div>
                            <div class="col-12 ml-1">
                                <img src="${ wrapImage}" style="width:40px; font-weigh:bold;" class="mt-3" id="user-image">
                                <span class="mt-5 ml-2 card-name" style="font-weight:bold; font-size:15px;">${firstname + " " + lastname}</span>
                                <a href="#" class="card-post_category badge badge-info mt-3 mr-1 ec_poll-interest" >${ interest}</a>
                            </div>
                            <div class="col-10 ec_poll-questiocol-10 ec_poll-question mt-2">
                                <span class="ec_med-text" style="font-weight:bold;">${ poll + " ?"}</span>
                            </div>
                            <div class="col-10 mx-auto poll-images-box row mx-0 px-0 mt-2" id="options_box${ poll_id}">

                            </div>
                            <div class="col-12 ec_poll-misc mt-3">
                                <span class="text-muted col-6">${poll_date}</span>
                                <span class="text-muted col-6"><i style="font-size:16px;" class="fa fa-thumbs-up"
                                    aria-hidden="true"></i>: ${votes_count}</span>
                                <span id="poll_users" class="text-muted col-6" data-poll-passed-id="${poll_id}">
                                <i style="font-size:16px;" class="fa fa-users" aria-hidden="true"></i>
                                </span>
                                <button type="submit" class="btn brand-bg text-white float-right voteBtn" id="voteBtn${poll_id}"
                                data-selected-vote="${ poll_id}" data-vote-status="${vote_status}"
                                data-poll-owner="${ poll_owner_id}" style="margin-bottom:10px; cursor:pointer;"
                                data-toggle="popover" title="Not allowed!" data-content="Please select an option to vote">Vote!
                                </button>
                        </div>
                    </div>
                    </div>
                `)
            }

            if (vote_status) {
                $(`#voteBtn${poll_id}`).html('Unvote');
                $(`#voteBtn${poll_id}`).css('background', 'lightgreen');
            }
            //Here we map the options for the polls
            $(`#options_box${poll_id}`).html(``);
            option.map(opt => {
                const { option_id, option } = opt;
                if (option_type == 'text') {
                    $(`#options_box${poll_id}`).append(`
                    <div class="ec_poll-answers mt-2 col-11">
                        <div class="ec_poll-answers mt-2 col-11">
                        <div class="custom-control custom-radio">
                            <input type="radio" id="poll1option${ option_id}" name="polloption" class="custom-control-input poll1option poll1option${poll_id}"
                            data-selected-option-id="${ option_id}" data-selected-poll-creator="${poll_owner_id}"
                            data-selected-poll-id="${ poll_id}" >
                            <label class="custom-control-label" for="poll1option${option_id}" id="answer${option_id}">
                            ${ option}
                            </label>
                        </div>
                        </div>
                        </div>`
                    );
                } else if (option_type == 'image') {
                  console.log(option_id)
                    $(`#options_box${poll_id}`).append(`
                        <div class="poll1Imageoption col-6 col-md-3 mt-2 px-0">
                            <div class="poll-image px-1">
                                <img class="imageOption" src="${image_link}${ option}"
                                data-selected-option-image-id="${option_id}" data-selected-poll-image-creator="${poll_owner_id}"
                                data-selected-poll-image-id="${poll_id}"
                                 alt="load error">
                            </div>
                        </div>
                    `
                    );
                }
                if (vote_status) {
                    $(`.poll1option${poll_id}`).attr('disabled', 'disabled');
                    if (vote_status === option_id) {
                        $(`#poll1option${option_id}`).attr('checked', 'true');
                        $(`#answer${option_id}`).css('color', '#f58731');
                    }
                }
            })
            //Show the who to follow after every 5 iteration
            if (i === steps) {
                showToFollowMemberBtwFeeds(image_link, steps);
                steps = steps + 4;
            }
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

        $(document).on('click', '#poll_users', function (e) {
            //display a modal for show all users who voted
            $('#votedPollMemeberModal').modal("toggle");
            const spanElem = e.currentTarget;
            const poll_id = Number(spanElem.dataset.pollPassedId);
            //show the users who voted
            votedUser(poll_id);
        });
        $(document).on('click', '.poll1option', function (e) {
            const optBtn = e.srcElement || e.target;
            console.log(optBtn)
            option_id = Number(optBtn.dataset.selectedOptionId);
            poll_owner_id = Number(optBtn.dataset.selectedPollCreator);
            poll_id =  Number(optBtn.dataset.selectedPollId);
                console.log(option_id, poll_owner_id, poll_id )
        });

        $(document).on('click', '.poll1Imageoption', function (e) {
            const optBtn = e.srcElement || e.target;
            Array.from(document.querySelectorAll('.imageOption')).map(x => x.style.border = '0px');
            option_id = Number(optBtn.dataset.selectedOptionImageId);
            poll_owner_id = Number(optBtn.dataset.selectedPollImageCreator);
            poll_id =  Number(optBtn.dataset.selectedPollImageId);
            optBtn.style.border = '3px solid #f58731';
            console.log(option_id, poll_owner_id, poll_id )
        });

        $(document).on('click', '.voteBtn', function (e) {
            const targetBtn = e.srcElement || e.target;
            console.log(targetBtn);
            const check_poll_id = targetBtn.dataset.selectedVote;
            const vote_status = targetBtn.dataset.voteStatus;
            const owner_poll = targetBtn.dataset.pollOwner;

            console.log(check_poll_id, vote_status, owner_poll)
            if (!isNaN(vote_status)) {
                option_id = vote_status;
                poll_owner_id = owner_poll;
            }

            if (check_poll_id == poll_id || !isNaN(vote_status)) {

                $(`#voteBtn${check_poll_id}`).hide();
                $(`#preload_vote${check_poll_id}`).show();
                poll_id = null;
                const reSetAttr = document.getElementById(`voteBtn${check_poll_id}`);

                voteTrigger(option_id, check_poll_id, poll_owner_id);
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'center',
                    showConfirmButton: false,
                    timer: 3000
                })

                Toast.fire({
                    type: 'error',
                    background: 'darkgray',
                    title: '<span style="color:white;">You need to select an option first to vote!</span>'
                })
                console.log('You need to select an option first to vote!');
            }
        });
    } else {
        $("#feeds_box").html(`
              <div class="d-flex justify-content-center feed_loader" style="height: 3vh;">
                 <p> You have no feed at this time, you can start by creating a poll
                  <span  class="addFastPoll">Create Poll</span><p>
              </div>
        `);
    }
}
//Onscroll Event to load more feeds
$('#feeds_box').on('scroll', function () {
    // console.log($(this).scrollTop());
    // console.log($('#feeds_box').position().top);
    // var formatter = $("#feeds_box")[0].scrollHeight - $(this).scrollTop();
    if ($("#feeds_box")[0].scrollHeight - $("#feeds_box")[0].scrollTop === $("#feeds_box")[0].clientHeight) {
        console.log($("#feeds_box")[0].clientHeight);
        $(".dynamic_feed_loader").show();
        if (key == "open") {
            triggerDynamicFeeds();
        } else {
            $(".dynamic_spin_text").html("Loading please wait");
        }

    } else {
        $(".dynamic_spin_text").html("Loading more feeds please wait...");
    }
});
triggerStaticFeeds(loader = true);
