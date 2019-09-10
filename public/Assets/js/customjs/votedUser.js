// voter_view
const voted_users = [];
votedUser = (poll_id) => {
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
            voted_users.push(...data.users);
            show_votedUser(voted_users)
        })
        .catch(err => console.log(err))
}
const show_votedUser = voted_users => {
    let show = voted_users;
    show.map(user => {
        let {image, last_name, first_name, username, id} = user;
        console.log(image, last_name, first_name, username, id)
        document.getElementById('voter_view').innerHTML += `
        <div class="row col-12 border mb-2 pb-1" id="${id}">
            <div class="col-2 px-0">
                <img class="mt-2" src="${image}" >
            </div>
            <div class="col-6 voter-data px-0">
                <div class="col-12 voter-name">
                <p class="mb-0 mt-3">${last_name} ${first_name}</p>
                </div>
                <div class="col-12 voter-username">
                <span${username}</span>
                </div>
            </div>
            <div class="col-4 voter-follow">
                <button class="btn btn-outline-brand col-12 mt-3">
                Follow
                </button>
            </div>
        </div>
        `
        // console.log(data, i)
    })
}