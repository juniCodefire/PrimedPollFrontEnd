// voter_view
let voted_user = [];
const votedUser = (poll_id) => {
         voted_user = [];

        document.getElementById('voter_view').innerHTML = `
         <div data-user-voted-preloader class="preload_feeds preload_follow" role="status"></div>
        `
        $dataWhenEmpty = document.querySelector('[data-when-empty]');
        $dataWhenEmpty ? $dataWhenEmpty.classList.remove('empty-div'): null;
        console.log(poll_id)
        fetch(`${baseUrl}api/poll/voters/${poll_id}`,{
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              "Authorization": "Bearer" + token,
              "Content-Type": "application/json"
            },
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            voted_user.push(...data.user);
            console.log(voted_user);
            show_votedUser(data)
        })
        .catch(err => console.log(err))
}
const show_votedUser = (data) => {
    console.log(data);
    if (voted_user != '') {
            document.getElementById('voter_view').innerHTML = "";
            const {image_link} = data;
            //w_200,c_thumb,ar_4:4,g_face/
            voted_user.map(user => {
            let {image, last_name, first_name, username, id} = user[0][0];
            console.log(image, last_name, first_name, username, id, user[1][0])
            
            //Public profile of user 
            if(localStorage.getItem('username') == username) {
                usernameLink = `/user/profile.html`;
            }else {
                usernameLink = `?permission=1&on_session=${id}# `;
            }

            user[1][0] ? follow_status = 'Unfollow': follow_status = 'Follow';

            document.getElementById('voter_view').innerHTML += `
            <div class="row col-12 border mb-2 pb-1" id="${id}">
                <div class="col-2 px-0">
                <a href="${window.location.origin }${ usernameLink }"><img class="mt-2" src="${image_link}${image}" ></a>
                </div>
                <div class="col-6 voter-data px-0">
                    <a href="${window.location.origin }${ usernameLink }">
                        <div class="col-12 voter-name">
                            <p class="mb-0 mt-3" style="color:#000;">${last_name} ${first_name}</p>
                        </div>
                        <div class="col-12 voter-username">
                        <p class="mt-1" style="color:#f58731;">${username}</p>
                        </div>
                    </a>
                </div>
                <div class="col-4 voter-follow">
                    <button class="btn btn-outline-brand col-12 mt-3">
                    ${follow_status}
                    </button>
                </div>
            </div>
            `
            // console.log(data, i)
        })
    }else {

        document.getElementById('voter_view').innerHTML = `
        <div data-when-empty class="row col-12 mb-2 pb-1">
            <span style="position:absolute; bottom:0; margin-left:30%;">No member voted yet</span>
        </div>
        ` 
        $dataWhenEmpty = document.querySelector('[data-when-empty]');
        $dataWhenEmpty.classList.add('empty-div');
    }
}