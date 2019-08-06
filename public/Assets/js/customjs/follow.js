
  const toFollows = [];
  const to_follow_box = document.querySelector('[data-follow-member]');
  //Declare a steps variable to jump the to_follow member
  let steps = 4;


//////////////////////////////////////////Follow Api Start Here \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const api = `${baseUrl}api/follow`;
  //function that return the fetch and response.json()
  fetch(api, {
        headers: {
          "Authorization": "Bearer" + token,
          "Content-Type": "application/json"
        }
      })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    toFollows.push(...data.to_follow);
    shuffleToFollowArray(toFollows);
    showToFollowMember(data.image_link);
  })
  .catch(error => {
    console.log(error);
  });

//Map the to follow member to the DOM
const showToFollowMember = (image_link) => {
  if (toFollows.length > 0) {
    toFollows.map(toFollow => {
         //Destrusturing the object
         const {id, username, first_name, last_name, image } = toFollow;
         //follow-user-image col-9 mx-auto px-0
         const usernameLink = username.substr(1, username.length-1);
       to_follow_box.innerHTML += `
             <div class="follow-box row border-bottom col-12 mt-3 ml-1 py-2">
               <div class="col-3 px-0">
                 <div class="follow-user-image col-9">
                    <a href="${window.location.origin}#${usernameLink}"><img style="width:50px; font-weigh:bold;" id="user-image" src="${image_link}${image}" alt="${first_name} ${last_name}"></a>
                 </div>
               </div>
               <div class="col-5 pr-0">
                 <a href="${window.location.origin}#${usernameLink}" class="open_member_link">
                   <div style="line-height: 15px" class="mt-2">
                     <span class="follow-user-name">${first_name} ${last_name}</span>
                     <small>${username}</small>
                   </div>
                 </a>
               </div>
               <div class="col-4 px-0">
                 <button class="btn btn-outline-brand col-12 mt-2" data-follow-id="${id}">Follow</button>
               </div>
             </div>
          `;

    });
  } else {
    to_follow_box.innerHTML = `
          <div class="follow-box row border-bottom col-12 mt-3 ml-1 py-2">
            <div class="col-5 pr-0">
                <div style="line-height: 15px" class="mt-2">
                  <span class="follow-user-name">No Suggestion at the moment!</span>
                </div>
            </div>
          </div>`;

  }
}
const showToFollowMemberBtwFeeds = (image_link, steps = 5) => {
  shuffleToFollowArray(toFollows);
  if (toFollows.length > 0) {
    const feedsBox = document.querySelector('#feeds_box');
    feedsBox.innerHTML += `
      <div id="follow-scroll" class="col-12 follow-scroll">
        <div class="follow-con-2 col-12 border row mx-0 px-0 scroller_x" id="toFollowFeed${steps}"></div>
      </div>
    `;
    const to_follow_block = document.querySelector(`#toFollowFeed${steps}`);
    toFollows.map(toFollow => {
      //Destrusturing the object
      const {id, username, first_name, last_name, image } = toFollow;
      //follow-user-image col-9 mx-auto px-0
      const usernameLink = username.substr(1, username.length-1);

      to_follow_block.innerHTML += `
        <div class="follow-box-2 wow fadeInRight col-4 border-right">
          <div class="col-12 px-0 follow-user-image-2 text-center mt-3">
            <a href="${window.location.origin}#${usernameLink}">
            <img class="" src="${image_link}${image}" alt="${first_name} ${last_name}" style="">\
            </a>
          </div>
          <div class="col-12" style="">
           <a href="${window.location.origin}#${usernameLink}" class="open_member_link">
              <div style="" class="text-center fun-box">
                <span class="follow-user-name">${first_name} ${last_name}</span>
              </div>
              <div class="text-center fuid-box">
                <small>${username}</small>
              </div>
            </a>
            <div class="text-center mt-2">
              <button class="btn btn-brand" data-follow-id="${id}">Follow</button>
            </div>
          </div>
        </div>
      `;
    })
  }
}
//This is use to shuffle the to follow array
const shuffleToFollowArray = (arr) => {
  for(let i = arr.length-1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
