

const triggerShowSinglePoll = (spanElem, pollModal) => {


    //get the data attribute for the view btn
    const optionType = spanElem.dataset.optionType;
    const ownerFirstname = spanElem.dataset.ownerFirstname;
    const ownerLastname = spanElem.dataset.ownerLastname;
    const ownerUsername = spanElem.dataset.ownerUsername;
    const ownerImage = spanElem.dataset.ownerImage;
    const question = spanElem.dataset.question;
    const options = JSON.parse(spanElem.dataset.options);
    const voteCount = spanElem.dataset.voteCount;
    const voteCountMale = spanElem.dataset.voteCountMale;
    const voteCountFemale = spanElem.dataset.voteCountFemale;
    const ownerFollowersCount = spanElem.dataset.ownerFollowersCount;
    const ownerFollowingCount = spanElem.dataset.ownerFollowingCount;
    const ownerCreatedPollCount = spanElem.dataset.ownerCreatedPollCount;
    const ownerVotedPollCount = spanElem.dataset.ownerVotedPollCount;
    const ownerCommentCount = spanElem.dataset.commentCount;

    //Insert the option into the element
    options.map(option => {
        const { } = option;
        let optionviewer;
        if (optionType == 'text') {
            document.querySelector('[data-poll-option-image-modal]').style.display = 'none';
            document.querySelector('[data-poll-option-text-modal]').style.display = 'block';

            document.querySelector('[data-poll-option-text-modal]').innerHTML = `
                
                        <div class="option-stats col-12 mt-4 row mx-0">
                            <h6 class="col-12 option-name mb-1">Russia</h6>
                            <div class="progress col-10 px-0 mt-1" style="height: 10px">
                            <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25"
                                aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <span class="col-2">25%</span>
                        </div>
           `;
        } else {
            document.querySelector('[data-poll-option-text-modal]').style.display = 'none';
            document.querySelector('[data-poll-option-image-modal]').style.display = 'block';


            document.querySelector('[data-poll-option-image-modal]').innerHTML = `
    
                <div class="image-option px-0 col-6 col-md">
                    <div class="image-option-stats row mx-0 my-5">
                        <img src="../primed_assets/img/girl-red.jpg" alt="">
                        <div class="progress col-9 px-0 mt-1" style="height: 10px">
                        <div class="progress-bar" role="progressbar" style="width: 10%;" aria-valuenow="10"
                            aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span class="text-center col-2 px-1">10%</span>
                    </div>
                </div>
            
            `;
        }
        
    });


    document.querySelector('[data-poll-question-modal]').innerHTML = `${question}`;   //insert the question

    document.querySelector('[data-owner-name-modal]').innerHTML = `${ownerFirstname} ${ownerLastname}`; //insert the username

    document.querySelector('[data-owner-image-modal]').src = `${ownerImage}`; //insert the owner image 

    document.querySelector('[data-owner-username-modal]').innerHTML = `${ownerUsername}`; //insert the username

    document.querySelector("[data-owner-follower-modal]").innerHTML = `${ownerFollowersCount}`; //insert owner followers
    
    document.querySelector('[data-owner-following-modal]').innerHTML = `${ownerFollowingCount}`; //insert owner following members

    document.querySelector('[data-asked-poll]').innerHTML = `${ownerCreatedPollCount}`;  //insert asked poll

    // document.querySelector('[data-owner-comment-count]').innerHTML =  ownerCommentCount;

    console.log(ownerVotedPollCount, ownerCommentCount)
    console.log(Number(ownerVotedPollCount) + Number(ownerCommentCount))
    document.querySelector('[data-answered-poll]').innerHTML = `${Number(ownerVotedPollCount) + Number(ownerCommentCount)}`; //insert answered poll

    document.querySelector('[data-poll-total-vote-modal]').innerHTML = `${voteCount}`;

    document.querySelector('[data-poll-total-male-vote-modal]').innerHTML = `${voteCountMale}`;

    document.querySelector('[data-poll-total-female-vote-modal]').innerHTML = `${voteCountFemale}`;

    document.querySelector('[data-poll-comment-count-modal]').innerHTML = 0;

    $('#viewPollModal').modal("toggle");
}

//Target The view button for current feeds from fetch_user_polls.js
$(document).on('click', '#poll_view', function (e) {
    const spanElem = e.currentTarget;
    triggerShowSinglePoll(spanElem);
});



