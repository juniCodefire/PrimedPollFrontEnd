const displayData = ({ user, interest, polls, pollCount, onSession, imageLink, imageProp, following }) =>
{
all_follower(pass="?follow=true&offline=", user.id, user.username)
    localStorage.setItem("stuff", [user.id, user.username]);         
    const profileImage = document.querySelector('#profileImage');
    const profileUsername = document.querySelector('#profileUsername');
    const profileBio = document.querySelector('#profileBio');
    const profileInterest = document.querySelector('#user_interest_box');
    const profilePolls = document.querySelector('#profilePolls');
    const profileSideBar = document.querySelector('#profileSideBar');
    const profileNavLeft = document.querySelector('#profileNavLeft');
    const profileTotalPolls = document.querySelector('#profileTotalPolls');
    const preloaderFeeds = document.querySelector('.preload_feeds');
    const feedsBlock = document.querySelector('[data-feeds-block]');
    const largeImage = document.querySelector('.modal-image-box');
    let followButton = document.querySelector('[data-btn-follow');

    //Insert The user Data Into the Profile Page
    //Insert the Image
    console.log(imageProp.widthThumb);
    const image = `${ imageLink }${ imageProp.widthThumb },${ imageProp.imageStyle },${ imageProp.aspectRatio },${ imageProp.cropType2 }/${ user.image }`;
    
    profileImage.innerHTML = `
                    <img data-toggle="modal" data-target="#imageModal" class="rounded-circle user_photo"
                    src=${ image }
                    alt="User Avatar" width = "110" >
                    `;
    const largeImageView = `${ imageLink }${ user.image }`;

    largeImage.innerHTML = `
                    <img class="user_photo large-image" src=${ largeImageView } alt="User Avatar">
                    `;
    //Insert the username
    profileUsername.innerHTML = user.username;
    //Insert the bio
    console.log(user);
    console.log(user.bio);
    profileBio.innerHTML = user.bio.charAt(0).toUpperCase() + user.bio.slice(1);
    //Insert the User interest
    profileInterest.innerHTML = ``;

    interest.forEach(intr =>
    {
        let intr_title = intr.title.charAt(0).toUpperCase() + intr.title.slice(1);
        let intr_hanger = `
                          <p class="interest_input" id="interest_title" style='font-size:10px;'>
                              ${intr_title }
                          </p>`;
        profileInterest.innerHTML += `
                    <div data-target="#publicInterestsModal" data-toggle="modal" class="col-sm-5 col-lg-3 col-md-5 mx-3 my-1 text-center interest_holder"
                        id="interest_holder${ intr.id }" style="padding: 0; margin-top:4px;"
                        data-interest-id = "${intr.id }"
                        data-interest-title = "${intr_title }">
                        ${intr_hanger }
                        <p class="interest_input" id="interest_manage">
                        View feeds <i class="fas fa-ring fa-spin check_interest"></i>
                        </p>
                    </div>
                    `;
        if (intr_title > 12)
        {
            $(`#interest_holder${ intr.id }`).removeClass('col-lg-3');
            $(`#interest_holder${ intr.id }`).addClass('col-lg-4');
        }
    });
    //Insert The user Recent Polls
    profilePolls.innerHTML = ``;
    if (polls == "")
    {
        profilePolls.innerHTML += `
                <div class="col-12 col-lg-11 mt-3 mx-auto px-0">
                    <div class="card col-12 card-post card-post--aside card-post--1 container-fluid"
                        id="poll-card">
                        <div class="recent-polls-card mb-3">
                             <h5 style="text-align:center;color: #f55330; padding:100px;"> No Owned poll yet?</h5>
                        </div>
                    </div>
                </div>
                `;
    } else
    {
        polls.forEach(poll =>
        {
            const question = poll.question.charAt(0).toUpperCase() + poll.question.slice(1);
            const first_name = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
            const last_name = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1);
            const interest_type = poll.interest.title.charAt(0).toUpperCase() + poll.interest.title.slice(1);

            profilePolls.innerHTML += `
                <div class="col-12 col-lg-11 mt-3 mx-auto px-0">
                    <div class="card col-12 card-post card-post--aside card-post--1 container-fluid"
                        id="poll-card">
                        <div class="row recent-polls-card mb-3">
                            <div class="col-12 col-md-1">
                                <img src="${ image }" style="width:40px;"
                                    class="my-2" id="user-image">
                            </div>
                            <div class="col-12 col-md-11 ml-2 mt-2 ec_poll-question row">
                                <div class="col-12 row">
                                    <p class="card-name col-9 col-md-10 heavy mb-0">
                                        ${first_name }
                                        ${last_name }
                                        </p>
                                    <div class="col-3 col-md-2 mx-auto">
                                        <a href="#" class="card-post__category badge  badge-info ec_poll-interest">${interest_type }</a>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <p class="normal-weight mb-0"> ${question }?</p>
                                    </div>
                                    <div class="col-12 col-md-3 mb-2 mx-auto recent-polls-button">
                                        <button class="btn btn-brand ml-auto">View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        });

    }

    //Insert Total Count Of User Polls
    profileTotalPolls.innerHTML = pollCount;

    //Change the side menu
    if (onSession === 0)
    {
        profileNavLeft.style.display = 'none';
        profileSideBar.innerHTML = `
            <li class="nav-item" style="cursor:pointer;">
            <a class="nav-link " onclick="location.href='${ window.location.origin }/user/signup.html'">
                <i class="material-icons">vertical_split</i>
                <span>Sign Up</span>
            </a>
            </li>
            <li class="nav-item" style="cursor:pointer;">
                <a class="nav-link " onclick="location.href='${ window.location.origin }/user/signin.html'">
                    <i class="material-icons">vertical_split</i>
                    <span>Sign In</span>
                </a>
            </li>
            `;
        if (following === true)
        {
            followButton.innerHTML = `
          <button type="button" class="btn btn-sm btn-pill btn-outline-brand mr-2">
               <i class="material-icons mr-1">person_add</i>Unfollow
          </button>`;
        } else
        {
            followButton.innerHTML = `
          <button type="button" class="btn btn-sm btn-pill btn-outline-brand mr-2">
               <i class="material-icons mr-1">person_add</i>Follow
          </button>`;
        }
    }
    followButton.innerHTML = `<button onclick="location.href='${ window.location.origin }/user/signup.html?follow=${ user.username }'" type="button" class="btn btn-sm btn-pill btn-outline-brand mr-2">
                        <i class="material-icons mr-1">person_add</i>Follow
                    </button>`;

    $(".publicPreloader").fadeOut("slow");
    //Trigger and event to show a particular interest feeds
    const interestBoxs = document.querySelectorAll(".interest_holder");
    const refresh = document.querySelector("[data-feeds-refresh]");

    Array.from(interestBoxs).map(interestBox =>
    {
        const displayFeeds = () =>
        {
            const id = interestBox.dataset.interestId;
            const title = interestBox.dataset.interestTitle;
            //Insert the title into the modal
            document.querySelector('[data-feed-id]').textContent = id;
            document.querySelector('#interestTitle').textContent = title;
            // document.querySelector('.subscribers').textContent = subscribers;
            // Display the feed for that interest(Call Another API)
            //Trigger this function to get the intrest feeds
            showFeeds(id, preloaderFeeds, feedsBlock, refreshFeeds);
        }
        interestBox.addEventListener('click', displayFeeds);
    });

    const refreshFeeds = () =>
    {
        refresh.style.display = 'none';
        const id = document.querySelector('[data-feed-id]').textContent;
        showFeeds(id, preloaderFeeds, feedsBlock, refresh);
    }
    refresh.addEventListener('click', refreshFeeds);

}
