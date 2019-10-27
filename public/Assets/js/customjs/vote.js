//This is the api point that handles voting of polls

const voteTrigger = (option_id,  poll_id,  poll_owner_id) => {
  //Passing the data from the function in to the fetch api
  const reSetAttr = document.getElementById(`voteBtn${poll_id}`);
  const postData = (url = "", data = {}) => {
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
        if (data.check === 1) {
          $(`#voteBtn${ data.vote.poll_id }`).html('Unvote');
          $(`#voteBtn${ data.vote.poll_id }`).show();
          $(`#voteBtn${ data.vote.poll_id }`).css('background', 'lightgreen');
          $(`.poll1option${ data.vote.poll_id }`).attr('disabled', 'disabled');
          $(`#answer${ option_id }`).css('color', '#f58731');
          $(`#preload_vote${ data.vote.poll_id }`).hide();
          reSetAttr.dataset.voteStatus = data.vote.option_id;
        }else {
          $(`#voteBtn${ data.unvote.poll_id }`).html('Vote');
          $(`#voteBtn${ data.unvote.poll_id }`).show();
          $(`#voteBtn${ data.unvote.poll_id }`).css('background', '#f58731');
          $(`.poll1option${ data.unvote.poll_id }`).removeAttr('disabled');
          $(`#answer${ option_id }`).css('color', '#868e96');
          $(`#preload_vote${ data.unvote.poll_id }`).hide();
          reSetAttr.dataset.voteStatus = false;
        }
        feeds = [];
        // triggerStaticFeeds(loader=false);
      })
      .catch(error => {
        if (error) {
          $(`#preload_vote${ poll_id }`).hide();
          $(`#voteBtn${ poll_id }`).show();
        }
      });
}
