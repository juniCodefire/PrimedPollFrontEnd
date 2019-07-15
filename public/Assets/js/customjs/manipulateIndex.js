const usernameURL = location.hash;
const preloader = document.querySelector('.back_bar-1');
const seprecon = document.querySelector('.se-pre-con');
const username = usernameURL.substr(1);


if (usernameURL !== "")
{
    root.innerHTML = publicProfile;
    //Get the required variaables 
    const profileImage = document.querySelector('#profileImage');
    const profileUsername = document.querySelector('#profileUsername');
    const profileBio = document.querySelector('#profileBio');
    const profileInterest = document.querySelector('#user_interest_box');
    const profilePolls = document.querySelector('#profilePolls');
    const profileSideBar = document.querySelector('#profileSideBar');
    const profileNavLeft = document.querySelector('#profileNavLeft');
    const profileTotalPolls = document.querySelector('#profileTotalPolls');

    //Call the Api That Check The Username and also emit reletive info
    var settings = {
        "url": `${ baseHome }api/profile/${ username }`,
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response)
    {
        const user = response.data.user;
        const interests = response.data.interest;
        const polls = response.data.polls;
        const pollsCount = response.data.pollCount;
        const notLogin = response.data.notLogin;
        const imageLink = response.data.imageLink;
        const imageProp = response.data.imageProp;

        if (response)
        {

            //Insert The user Data Into the Profile Page
            //Insert the Image
            const image = `${ imageLink }${ imageProp.widthThumb },${ imageProp.imageStyle },${ imageProp.aspectRatio },${ imageProp.cropType2 }/${ user.image }`;
            profileImage.innerHTML = `
                    <img data-toggle="modal" data-target="#imageModal" class="rounded-circle user_photo"
                    src=${ image }
                    alt="User Avatar" width = "110" >   
                    `;
            //Insert the username
            profileUsername.innerHTML = user.username;
            //Insert the bio
            profileBio.innerHTML = user.bio.charAt(0).toUpperCase() + user.bio.slice(1);
            //Insert the User interest
            profileInterest.innerHTML = ``;

            interests.forEach(interest =>
            {
                let interest_title = interest.title.charAt(0).toUpperCase() + interest.title.slice(1);
                let interest_hanger = `
                                    <p class="interest_input" id="interest_title" style='font-size:10px;'>
                                        ${interest_title }
                                    </p>`;
                profileInterest.innerHTML += `
                    <div data-target="#publicInterestsModal" data-toggle="modal" class="col-sm-5 col-lg-3 col-md-5 mx-3 my-1 text-center interest_holder"
                        id="interest_holder${interest.id }" style="padding: 0; margin-top:4px;"
                        data-interestid = "${interest.id }"
                        data-interesttitle = "${interest_title }">
                        ${interest_hanger }
                        <p class="interest_input" id="interest_manage">
                        View feeds <i class="fas fa-ring fa-spin check_interest"></i>
                        </p>
                    </div>
                    `;
                if (interest_title > 12)
                {
                    $(`#interest_holder${ interest.id }`).removeClass('col-lg-3');
                    $(`#interest_holder${ interest.id }`).addClass('col-lg-4');
                }
            });
            //Insert The user Recent Polls
            profilePolls.innerHTML = ``;
            polls.forEach(poll =>
            {
                const question = poll.question.charAt(0).toUpperCase() + poll.question.slice(1);
                const first_name = user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1);
                const last_name = user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1);
                const interest_type = poll.interest.title.charAt(0).toUpperCase() + poll.interest.title.slice(1);

                profilePolls.innerHTML += `
<<<<<<< HEAD
                    <div class="col-lg-11 col-sm-11 mt-1 mx-auto">
=======
                    <div class="col-12 col-lg-11 mt-3 mx-auto px-0">
>>>>>>> 3619c788011928ec354763c4b33d84cd886fb0af
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

            //Insert Total Count Of User Polls
            profileTotalPolls.innerHTML = pollsCount;

            //Change the side menu 
            if (notLogin)
            {
                profileNavLeft.style.display = 'none';

                profileSideBar.innerHTML = `
                 <li class="nav-item" style="cursor:pointer;">
                    <a class="nav-link " onclick="location.href='${ window.location.origin }/Users/signup.html'">
                        <i class="material-icons">vertical_split</i>
                        <span>Sign Up</span>
                    </a>
                 </li>
                <li class="nav-item" style="cursor:pointer;">
                    <a class="nav-link " onclick="location.href='${ window.location.origin }/Users/signin.html'">
                        <i class="material-icons">vertical_split</i>
                        <span>Sign In</span>
                    </a>
                 </li>
                `;
            }

            $(".back_bar-1").fadeOut("slow");
        }
    }).fail(function (err)
    {
        console.log(err);
        if (err)
        {
            root.innerHTML = error404;
            $(".back_bar-1").fadeOut("slow");
        }

    });

}






