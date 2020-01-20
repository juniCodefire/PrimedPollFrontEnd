//Start by getting the search input 
const poll_querys = Array.from(document.querySelectorAll('.search-poll-query'));
const search_preloaders = Array.from(document.querySelectorAll('.search_preloader'));
const search_interest_preloader = document.querySelector('[data-search_interest_preloader]');

const searchPollManipulate = (event) => {
    query = event.target.value;

    search_preloaders.map(search_preloader => {
        search_preloader.style.visibility = 'visible';
    })
  
    setTimeout(() => {
        offset = 10;
        triggerStaticFeeds(query);
    }, 500)
   
}

poll_querys.map(poll_query => {
    poll_query.addEventListener('keyup', (event) => searchPollManipulate(event));
});


//Search Interest Manipulation

const interest_query = document.querySelector('[data-search-interest-query]');

const searchInterestManipulate = (event) => {
    const query_data = event.target.value;
    search_interest_preloader.style.visibility = 'visible';
    setTimeout(() => {
        fetchUserInterest(query_data)
    }, 500)
}

interest_query.addEventListener('keyup', (event) => searchInterestManipulate(event))