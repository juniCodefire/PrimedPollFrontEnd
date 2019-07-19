//This is the api point that handles voting of polls

const voteTrigger = (option_id,  poll_id,  poll_owner_id) => {

  //Passing the data from the function in to the fetch api
  const postData = (url = "", data = {}) => {
    console.log(data)
    console.log(url);
    //Using the fetch Api to send data
      return fetch (url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          "Authorization": "Bearer" + token,
          "Content-Type": "application/json"
        },
        redirect: 'follow',
        referrer: 'no- referrer',
        body: JSON.stringify(data)

      })
      .then(response => response.json());
    }

    //call the APi function
    postData(`${ baseUrl }api/${ poll_id }/vote`, {option_id, poll_owner_id})
      .then(data => {
        console.log(data)
        $(`#preload_vote${ data.vote.poll_id }`).hide();
        $(`#voteBtn${ data.vote.poll_id }`).show();
        $(`#voteBtn${ data.vote.poll_id }`).html('Unvote');
        $(`#voteBtn${ data.vote.poll_id }`).css('background', 'lightgreen');
      })
      .catch(error => console.error(error));
}
