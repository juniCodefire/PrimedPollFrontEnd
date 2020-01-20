

let feeds = [];
let offset = 10;
let key = "open";
let steps = 4;
let poll_id;
let interest_id = null;
let query = null;

//Load More default Limit tracker
let load_more = 2000;

const parsedUrl = new URL(window.location.href);
const getSearchParam = parsedUrl.searchParams;
interest_id = getSearchParam.get("interest_id");

const triggerStaticFeeds = (query = null) => {
    if(query == ''){
        query = null;
    }
    loadFeeds();
    var url_link = `${baseUrl}api/feeds`;
    if (interest_id) {
        url_link = `${baseUrl}api/single/feeds/${interest_id}`;
    }
    if (query && interest_id == null) {
        url_link = `${baseUrl}api/feeds?search_poll=${query}`;
    }
    if (query && interest_id != null) {
        url_link = `${baseUrl}api/single/feeds/${interest_id}?search_poll=${query}`;
    }
    console.log(query, url_link)

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
          
            slim_preloader(stop = true);
            search_preloaders.map(search_preloader => {
                search_preloader.style.visibility = 'hidden';
            })

            // $("#feed_loader").hide();
            var feedsData = response.data.feeds;

            //Store in localStorage for offline fisrt
            feeds = [];
            localStorage.removeItem('stored_broswer_polls');
            localStorage.setItem('stored_broswer_polls', JSON.stringify(feedsData));
            loadFeeds(query);
        }
    }).fail(function (err) {
        console.log(err)
        search_preloaders.map(search_preloader => {
            search_preloader.style.visibility = 'hidden';
        })
    });

}
const triggerDynamicFeeds = () => {
    slim_preloader();
    if(query == ''){
        query = null;
    }      
    $("[data-load-more-feeds]").css('display', 'none');
    var url_link = `${baseUrl}api/feeds/${offset}`;
    if (interest_id) {
        url_link = `${baseUrl}api/single/feeds/${interest_id}/${offset}`;
    }
    if (query && interest_id == null) {
        url_link = `${baseUrl}api/feeds/${offset}?search_poll=${query}`;
    }
    if (query && interest_id != null) {
        url_link = `${baseUrl}api/single/feeds/${interest_id}/${offset}?search_poll=${query}`;
    }
    console.log(query, url_link)
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
            console.log(response)
            key = "open";
            steps = 4;
            $(".dynamic_feed_loader").hide();
            slim_preloader(stop = true);

            let feedsData = response.data.scrolled_feeds;
            if (feedsData.length == 0) {

                $(".alert_default").show();
                setTimeout(() => {
                    $(".alert_default").hide();
                }, 3000)
            } else {
                //Store in localStorage for offline first
                localStorage.removeItem('stored_broswer_polls');
                offset = response.data.new_offset;
                feeds.push(...feedsData);
                localStorage.setItem('stored_broswer_polls', JSON.stringify(feeds));
                feeds = [];
                loadFeeds(query);
            }
        }
    }).fail(function (err) {
        if (err) {
            slim_preloader(stop = true);
            $(".dynamic_feed_loader").hide();
            key = "open";
        }

    });

}

const loadFeeds = (query) => {
    let option_id = null;
    let poll_owner_id = null;
    let poll_id = null;

    const feedsData = JSON.parse(localStorage.getItem('stored_broswer_polls'));

    if (feedsData != null) {
        feeds.push(...feedsData);
        $(`#feeds_box`).html(`<div class="col-lg-12 col-sm-12 mt-2 mb-10 addFastPoll" style="margin-top:30px;">
            <div class="card card-post card-post--aside card-post--1 poll_box" id="poll-card">
                 <br>
                 <h4 style="font-weight:bold; cursor:pointer; margin-left:20px; margin-top:10px; font-size:15px;">
                 What do you want to ask... ?
                 <span style="float: right; color:#f55330; margin-right:20px;"><i class="fas fa-poll" style="font-size:15px;"></i> New Poll</span>
                 </h4>
                 <br>
            </div>
          </div>`);

        //map all Feeds from the feeds array
        feeds.map((feed, i) => {
            //Destrusturing feeds
            const {
                    poll, image_link, vote_count_male, vote_count_female, owner_followers_count, owner_following_count,
                    owner_created_poll_count, owner_voted_poll_count, owner_comment_count
            } = feed;

           const {
                    id: poll_id, question, option_type, startdate, expirydate, created_at, updated_at,
                    votes_count, users, interest, options, vote_status: vote_status_pack
            } = poll;

           const {
                id: interest_id, title
            } = interest;

           const {
                id:  poll_owner_id, first_name, last_name, username, image,
            } = users;

            //Check if there is a vote status for vote
            let vote_status;
            if(vote_status_pack.length > 0) {
                vote_status = vote_status_pack[0].option_id;
            }else {
                vote_status = null;
            }
    

            let wrapImage = `${image_link}${image}`;
            if (option_type == 'text') {
                $(`#feeds_box`).append(`
                    <div class="col-lg-12 col-sm-12 mt-2 mb-2">
                        <div class="card card-post card-post--aside card-post--1 px-0 mx-0" id="poll-card">
                            <div class="preload_vote float-right" id="preload_vote${ poll_id}" role="status">
                            </div>
                            <div class="col-12 ml-1">
                                <img src="${ wrapImage}" style="width:40px; font-weigh:bold;" class="mt-3" id="user-image">
                                <span class="mt-5 ml-2 card-name" style="font-weight:bold; font-size:15px;">${first_name + " " + last_name} <span style="font-size:10px; color:#f55330; opacity: 0.4;">${username}</span></span>
                                <a href="#" class="card-post_category badge badge-info mt-3 mr-1 ec_poll-interest" >${ title }</a>
                            </div>
                            <div class="col-10 ec_poll-questiocol-10 ec_poll-question mt-2">
                                <span class="ec_med-text" style="font-weight:bold;">${ question} ?</span>
                            </div>
                            <div id="options_box${ poll_id}">
                            </div>
                            <div class="col-12 ec_poll-misc mt-3">
                                <span class="text-muted col-6">${created_at}</span>
                                <span class="text-muted col-6"><i style="font-size:16px;" class="fa fa-thumbs-up" aria-hidden="true"></i> ${votes_count}</span>
                                <span id="poll_user" class="text-muted col-6" data-poll-passed-id="${poll_id}">
                                    <i style="font-size:16px;" class="fa fa-user" aria-hidden="true"></i>
                                </span>
                                <span class="text-muted col-6 poll_view"  id="poll_view" data-poll-view${poll_id}
                                        data-poll-passed-id="${poll_id}"
                                        data-option-type="${option_type}"
                                        data-owner-firstname="${first_name}"
                                        data-owner-lastname="${last_name}"
                                        data-owner-username="${username}"
                                        data-owner-image="${wrapImage}"
                                        data-question="${question} ?"
                                        data-options='${JSON.stringify(options)}'
                                        data-vote-count="${votes_count}"
                                        data-vote-count-male="${vote_count_male}"
                                        data-vote-count-female="${vote_count_female}"
                                        data-owner-followers-count="${owner_followers_count}"
                                        data-owner-following-count="${owner_following_count}"
                                        data-owner-created-poll-count="${owner_created_poll_count}"
                                        data-owner-voted-poll-count="${owner_voted_poll_count}"
                                        data-comment-count="${owner_comment_count}"
                                 >
                               
                                <i style="font-size:16px;" class="fa fa-eye" aria-hidden="true"></i>
                                </span>
                                <button type="submit" class="btn brand-bg text-white float-right voteBtn" id="voteBtn${poll_id}"
                                data-selected-vote="${ poll_id}" data-vote-status="${vote_status}" data-poll-owner="${poll_owner_id}"
                                style="margin-bottom:10px; cursor:pointer;" data-toggle="popover" title="Vote Poll!" data-content="Please select an option to vote">Vote!
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
                                <img src="${ wrapImage}" style="width:40px; font-weight:bold;" class="mt-3" id="user-image">
                                <span class="mt-5 ml-2 card-name" style="font-weight:bold; font-size:15px;">${first_name + " " + last_name} <span style="font-size:10px; color:#f55330;  opacity: 0.4;">${username}</span></span>
                                <a href="#" class="card-post_category badge badge-info mt-3 mr-1 ec_poll-interest" >${ title }</a>
                            </div>
                            <div class="col-10 ec_poll-questiocol-10 ec_poll-question mt-2">
                                <span class="ec_med-text" style="font-weight:bold;">${ question + " ?"}</span>
                            </div>
                            <div class="col-10 mx-auto poll-images-box row mx-0 px-0 mt-2" id="options_box${ poll_id}">

                            </div>
                            <div class="col-12 ec_poll-misc mt-3">
                                <span class="text-muted col-6">${created_at}</span>
                                <span class="text-muted col-6"><i style="font-size:16px;" class="fa fa-thumbs-up"
                                    aria-hidden="true"></i> ${votes_count}</span>
                                <span id="poll_user" class="text-muted col-6" data-poll-passed-id="${poll_id}">
                                <i style="font-size:16px;" class="fa fa-user" aria-hidden="true"></i>
                                </span>

                                <span class="text-muted col-6 poll_view" id="poll_view" data-poll-view${poll_id}
                                      data-poll-passed-id="${poll_id}"
                                      data-option-type="${option_type}"
                                      data-owner-firstname="${first_name}"
                                      data-owner-lastname="${last_name}"
                                      data-owner-username="${username}"
                                      data-owner-image="${wrapImage}"
                                      data-question="${question} ?"
                                      data-options='${JSON.stringify(options)}'
                                      data-vote-count="${votes_count}"
                                      data-vote-count-male="${vote_count_male}"
                                      data-vote-count-female="${vote_count_female}"
                                      data-owner-followers-count="${owner_followers_count}"
                                      data-owner-following-count="${owner_following_count}"
                                      data-owner-created-poll-count="${owner_created_poll_count}"
                                      data-owner-voted-poll-count="${owner_voted_poll_count}"
                                      data-comment-count="${owner_comment_count}"
                                      >
                                <i style="font-size:16px;" class="fa fa-eye" aria-hidden="true"></i>
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

            //Check if the user voted
            if (vote_status) {
                $(`#voteBtn${poll_id}`).html('<i style="font-size:16px;" class="fa fas fa-check" aria-hidden="true"></i>');
                $(`#voteBtn${poll_id}`).css('background', 'lightgreen');
                $(`#voteBtn${poll_id}`).css('border-radius', '50%');
                $(`#voteBtn${poll_id}`).css('padding', '0');
                $(`#voteBtn${poll_id}`).css('width', '5vh');
                $(`#voteBtn${poll_id}`).css('height', '5vh');
                $(`#voteBtn${poll_id}`).attr('disabled');
                $(`#voteBtn${poll_id}`).attr('title', 'Voted');
            } else {
                $(`[data-poll-view${poll_id}]`).css('visibility', 'hidden');
            }
            //Here we map the options for the polls
            $(`#options_box${poll_id}`).html(``);
            options.map(opt => {
                const { id: option_id, option } = opt;
                if (option_type == 'text') {
                    $(`#options_box${poll_id}`).append(`
                    <div class="ec_poll-answers mt-2 col-11">
                        <div class="ec_poll-answers mt-2 col-11">
                        <div class="custom-control custom-radio" data-poll-answered${poll_id}>
                            <input data-vote-status="${vote_status}" type="radio" id="poll1option${option_id}" name="polloption" class="custom-control-input poll1option poll1option${poll_id}"
                            data-selected-option-id="${ option_id}" data-selected-poll-creator="${poll_owner_id}"
                            data-selected-poll-id="${ poll_id}" >
                            <label class="custom-control-label" for="poll1option${option_id}" id="answer${option_id}">
                              ${ option}
                            </label>
                        </div>
                        </div>
                        </div>`
                    );

                    if (vote_status == option_id) {
                        const optBtn = document.querySelector(`#answer${option_id}`);
                        optBtn.style.color = '#f55330';
                    }

                } else if (option_type == 'image') {
                    $(`#options_box${poll_id}`).append(`
                        <div class="poll1Imageoption col-6 col-md-3 mt-2 px-0">
                            <div class="poll-image px-1">
                                <img data-vote-status="${vote_status}" id="optionImage${option_id}" class="imageOption pollImageOption${poll_id}" src="${image_link}${option}"
                                data-selected-option-image-id="${option_id}" data-selected-poll-image-creator="${poll_owner_id}"
                                data-selected-poll-image-id="${poll_id}"
                                 alt="load error">
                            </div>
                        </div>`
                    );
                    if (vote_status) {
                        if (vote_status === option_id) {
                            const optBtn = document.querySelector(`#optionImage${option_id}`);
                            optBtn.style.border = '3px solid #f55330';
                        }
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

        $(document).on('click', '#poll_user', function (e) {
            //display a modal for show all user who voted
            $('#votedPollMemeberModal').modal("toggle");
            const spanElem = e.currentTarget;
            const poll_id = Number(spanElem.dataset.pollPassedId);
            //show the user who voted
            votedUser(poll_id);
        });

      
        
        $(document).on('click', '.poll1option', function (e) {
            const optBtn = e.srcElement || e.target;

            vote_status = optBtn.dataset.voteStatus;
            if (isNaN(vote_status)) {
                option_id = Number(optBtn.dataset.selectedOptionId);
                poll_owner_id = Number(optBtn.dataset.selectedPollCreator);
                poll_id = Number(optBtn.dataset.selectedPollId);
            } else {

            }
        });

        $(document).on('click', '.imageOption', function (e) {
            const optBtn = e.srcElement || e.target;
            vote_status = optBtn.dataset.voteStatus;
            Array.from(document.querySelectorAll('.imageOption')).map(x => {
                const voteStatus = x.dataset.voteStatus;
                if (isNaN(voteStatus)) {
                    x.style.border = '0px';
                }
            });
            if (isNaN(vote_status)) {
              
                option_id = Number(optBtn.dataset.selectedOptionImageId);
                poll_owner_id = Number(optBtn.dataset.selectedPollImageCreator);
                poll_id = Number(optBtn.dataset.selectedPollImageId);
                optBtn.style.border = '3px solid #f55330';
            } else {
                
                const optBtn = document.querySelector(`#optionImage${vote_status}`);
                optBtn.style.border = '3px solid #f55330';
            }
        });


        $(document).on('click', '.voteBtn', function (e) {
            const targetBtn = e.srcElement || e.target;
            const check_poll_id = targetBtn.dataset.selectedVote;
            const vote_status = targetBtn.dataset.voteStatus;
            const owner_poll = targetBtn.dataset.pollOwner;

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
            }
        });
    } else {
        let text;
        query == null ? text = 'You have no feed at this time, you can start by creating a poll...'
            : text = 'No search result was found relating to your poll, please try again...?';

        $("#feeds_box").html(`
                <div class="col-lg-12 col-sm-12 mt-2 mb-10 addFastPoll" style="margin-top:30px;">
                    <div class="card card-post card-post--aside card-post--1 poll_box" id="poll-card">
                        <br>
                        <h4 style="font-weight:bold; cursor:pointer; margin-left:20px; margin-top:10px; font-size:12px;">
                        ${text}
                        <span style="float: right; color:#f55330; margin-right:20px;"><i class="fas fa-poll" style="font-size:15px;"></i> Create Poll</span>
                        </h4>
                        <br>
                    </div>
                </div>
            `)
    }
}
//Onscroll Event to load more feeds
$('#feeds_box').on('scroll', function () {
    // console.log($(this).scrollTop());
    // console.log($('#feeds_box').position().top);
    // var formatter = $("#feeds_box")[0].scrollHeight - $(this).scrollTop();
    //Track when to show the load more btn

    if ($("#feeds_box")[0].scrollTop > load_more) {
      
        $("[data-load-more-feeds]").css('display', 'block');
    }

    if ($("#feeds_box")[0].scrollHeight - $("#feeds_box")[0].scrollTop === $("#feeds_box")[0].clientHeight) {

        const reflex = $("#feeds_box")[0].clientHeight - ($("#feeds_box")[0].clientHeight + 10);
        // $(".dynamic_feed_loader").show();
      
        $("[data-load-more-feeds]").css('display', 'none');
        load_more = load_more + 2000;
        $("#feeds_box")[0].scrollBy(0, reflex);
        if (key == "open") {
            key = "close";
            triggerDynamicFeeds();
        }
    }
});

//Load more feeds with click event
$('[data-load-more-feeds]').on('click', function () {

    load_more = load_more + 2000;
    if (key == "open") {
        key = "close";
        triggerDynamicFeeds();
    }
});
triggerStaticFeeds();
