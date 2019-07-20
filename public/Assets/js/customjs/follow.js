
  const toFollows = [];
  const to_follow_box = document.querySelector('[data-follow-member]');
  //spread and push to an array
  //map the array to a div
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
    showToFollowMember(data.image_link);
  })
  .catch(error => {
    console.log(error);
  });

console.log(toFollows);
//Map the to follow member to the DOM
const showToFollowMember = (image_link) => {
  toFollows.map(toFollow => {
     //Destrusturing the object
     const {id, username, first_name, last_name, image } = toFollow;

     const usernameLink = username.substr(1, username.length-1);
     to_follow_box.innerHTML += `
           <div class="follow-box row border-bottom col-12 mt-3 ml-1 py-2">
             <div class="col-3 px-0">
               <div class="follow-user-image col-9 mx-auto px-0">
                  <a href="${window.location.origin}#${usernameLink}"><img src="${image_link}${image}" alt="${first_name} ${last_name}"></a>
               </div>
             </div>
             <div class="col-5 pr-0">
               <a href="${window.location.origin}#${usernameLink}">
                 <div style="line-height: 15px" class="mt-2">
                   <span class="follow-user-name">${first_name} ${last_name}Austen</span>
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
}
