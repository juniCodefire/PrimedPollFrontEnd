
let feedsInfos = [];

const displayFeeds = (results, preloaderFeeds, feedsBlock) =>
{
  //Thing to emmit out comments count, votes count, username
  preloaderFeeds.style.display = "none";

    results.map((result, i) => {
      feedsBlock.innerHTML += `<div class="col-12 col-sm-11 mx-auto mb-1 px-0">
                  <div class="card col-12 card-post card-post--aside card-post--1 px-0 mb-1 container-fluid"
                      id="poll-card">
                      <div class="row recent-polls-card row px-0 col-12 m-auto">
                          <div class="col-12 col-md-2" data-img-feed>
                              <a href="${window.location.origin}"><img src="${result.image_link}${result.image}"
                                  style="width:40px;" class="my-2" id="user-image"></a>
                          </div>
                          <div class="col-12 col-md-10 ec_poll-question row px-0">
                              <div class="col-12 row">
                                  <p class="card-name col-12 mt-2 heavy mb-0">
                                      ${result.firstname} ${result.lastname}
                                  </p>
                                  <div class="col-12 col-md-9">
                                      <div style="min-height: 5vh" class="recent-polls-question">
                                          <p class="normal-weight col-12 mb-0"> ${result.poll}?</p>
                                      </div>
                                      <div class="col-12 row">
                                          <span class="col-6">Comments: 218</span>
                                          <span class="col-6">Votes: 1665</span>
                                      </div>
                                  </div>
                                  <div class="col-12 col-md-3 mx-auto recent-polls-button">
                                      <button class="btn btn-brand" data-feed-show-id="${result.poll_id}">View</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
    })

}
const pickFeeds = (id) => {
    const feedsFilter = feedsInfos.filter(feedsInfo => id == feedsInfo.interest_id);
    if (!feedsFilter.length == 0) {
      return feedsFilter;
    }
}
//Api to get the feeds for interest
const showFeeds = (id, preloaderFeeds, feedsBlock, refresh) =>
{     //This function pick the feeds to show
      feedsBlock.innerHTML = '';
      if (pickFeeds(id)) {
         displayFeeds(pickFeeds(id), preloaderFeeds, feedsBlock);
         return;
      }
    preloaderFeeds.style.display = "block";

    //Get the required variables

    const api = `${ baseHome }api/public/feeds/${ id }/${ username }`;

    fetch(api)
        .then(response => response.json())
        .then(response => {
          console.log(response)
          feedsInfos.push(...response.data.userfeeds);
          displayFeeds(response.data.userfeeds, preloaderFeeds, feedsBlock);
        })
        .catch(error =>
        {
            if (error)
            {
                preloaderFeeds.style.display = "none";
                // refresh.style.display = 'block';
                console.error(error);
            }
        })
}
