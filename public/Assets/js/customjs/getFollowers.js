//Get Request to fetch the  followers for this user 
//Get triger from the profil.js or the displayData.js
const all_follower = (pass, id01, username01) => {

const getFollowersBox = document.querySelector('[data-get-followers]');
const getFollowingBox = document.querySelector('[data-get-following]');

const countFollowersBox = document.querySelector('[data-count-followers]');
const countFollowingBox = document.querySelector('[data-count-following]');

const preloaderFollow = document.querySelectorAll('.preload_follow');

const followers = fetch(`${ baseUrl }api/followers/${id01}/${username01.substring(1, username01.length)}`);
const following = fetch(`${ baseUrl }api/following/${id01}/${username01.substring(1, username01.length)}`);

console.log(`${ baseUrl }api/following/${id01}/${username01.substring(1, username01.length)}`)

const handleError = (res) => {
    switch(res.status) {
        case 401:
        swal('Error: Unauthorize');
        break;
        case 422:
        swal('Error: Something is missing');
        break;
        default:
       return res.json();
    }
  }
 // const usernameLink = `?permission=1&on_session=${user_id}#${username.substr(1, username.length - 1)}`;
//http://127.0.0.1:51096/?permission=1&on_session=8#jai
const getFollowers = (pass, {followers, image_link}) => {
    preloaderFollow[0].style.display = "none";
    if(followers != "") {
        followers.map((follower, i) => {
              let usernameLink = `${pass}${follower.id}#${follower.username.substring(1, follower.username.length)}`;
              getFollowersBox.innerHTML += `
                <div class="follow-stat-box col-3 mt-2">
                  <div class="col-12 border text-center">
                    <a class="site_formt_color" href="${window.location.origin}${usernameLink}">
                        <img src="${ image_link }${ follower.image }" alt="${ follower.first_name } ${ follower.last_name } class="mt-2 border">
                    <p class="mb-0"><b>${follower.first_name} ${follower.last_name}</b></p>
                    <span class="pb-2"><small>${follower.username}</small></span>
                    </a>
                  </div>
                </div>`;   
   
        })
    }else {
       getFollowersBox.innerHTML = `<h5 class="site_formt_color" style="text-align:center;">You have no followers at this time...</h5>`;
    }

}
const getFollowing = (pass, {following, image_link}) => {
    preloaderFollow[1].style.display = "none";
    if (following != "") {
        following.map((followin, i) => {
              let usernameLink = `${pass}${followin.id}#${followin.username.substring(1, followin.username.length)}`;
            getFollowingBox.innerHTML += `
              <div class="follow-stat-box col-3 mt-2">
                <div class="col-12 border text-center">
                  <a class="site_formt_color" href="${window.location.origin}${usernameLink}">
                      <img src="${ image_link }${ followin.image }" alt="${ followin.first_name } ${ followin.last_name } class="mt-2 border">
                  <p class="mb-0"><b>${followin.first_name} ${followin.last_name}</b></p>
                  <span class="pb-2"><small>${followin.username}</small></span>
                  </a>
                </div>
              </div>`;
      })
    }else {
       getFollowingBox.innerHTML = `<h5 class="site_formt_color" style="text-align:center;">You are not following anyone yet...</h5>`;
    }
}

Promise
  .all([followers, following])
  .then(responses => {
    //Convert To json
    return Promise
              .all(responses.map(res => handleError(res)));
  })
  .then(responses => {
    getFollowers(pass, responses[0]);
    getFollowing(pass, responses[1]);
  })
  .catch(error => {
    console.log(error);
  })
} 

