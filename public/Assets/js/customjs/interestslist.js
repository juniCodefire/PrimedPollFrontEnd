function formDataToObject(formData) {
    return new Object(Array.from(formData.entries()).reduce((old, pair) => ({
        ...old, [pair[0]]: pair[1]
    }), {}))
}
const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
const interestsList = document.querySelector('#interestsList')
const token = adminInfo.data.token;
fetch(`${baseUrl}api/admin/show/all/interest`, {
    method: 'GET',
    mode: 'cors',
    headers: {
        'authorization': `bearer${token}`
    }
})
    .then(response => response.json())
    .then(data => {
        const interestObject = data.data.interest;
        interestObject.map(interest => {
            let interestID = interest.id;
            console.log(interestID)
            interestsList.innerHTML += `<tr >
            <td>${interest.id}</td>
            <td>${interest.title}</td>
            <td>${interest.poll_count}</td>
            
            <td><button data-get-interest-id="${interest.id}" class=" btn btn-primary view-interest-btn" data-toggle="modal" data-target="#viewInterestModal">View</button></td>
            <td><button data-del-id="${interest.id}" id="deleteInterestBtn${interestID}" class="btn btn-danger delete-interest-btn" data-toggle="modal" data-target="#deleteInterestModal">Delete</button></td>
        </tr>`
        })
        const dels = Array.from(document.querySelectorAll('.delete-interest-btn'));
        dels.map((del, i) => {
            del.addEventListener('click', (event) => deleteInterestFunc(event, 0))
        })
        const confirmDel = document.querySelector('[data-confirm-delete]');
        confirmDel.addEventListener('click', (event) => deleteInterestFunc(event, 1))

        const views = Array.from(document.querySelectorAll('.view-interest-btn'));
        views.map((view) => {
            view.addEventListener('click', (event) => viewInterestFunc(event))
        })
    })
    .catch(error => console.error(error))


// Add Interests

const addInterestForm = document.querySelector("#addInterestForm")
const url = `${baseUrl}api/admin/create/interest`
addInterestFunc = (event) => {
    event.preventDefault();
    // console.log(event)
    let formData = new FormData(addInterestForm);
    formdata = formDataToObject(formData);
    // const data = new URLSearchParams(formData)
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(formdata),
        headers: {
            Authorization: `Bearer${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            location.reload()
        })
        .catch(error => console.log(error.response))
}
addInterestForm.addEventListener('submit', (event) => addInterestFunc(event))

// Delete Interest
// const deleteInterestBtn = document.querySelector(`deleteInterestBtn${interestID}`);
// console.log(deleteInterestBtn)

deleteInterestFunc = (event, key) => {
    const delBtn = event.target || event.srcElement;
    const delIdHolder = document.querySelector('[data-del-id-holder]');
    if (key == 0) {
        const interestID = delBtn.dataset.delId;
        delIdHolder.innerHTML = interestID;
        console.log(delIdHolder)
    }
    if (key == 1) {
        const interestID = delIdHolder.innerHTML;
        console.log(interestID)
        fetch(`${baseUrl}api/admin/delete/interest/${interestID}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Authorization: `Bearer${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                location.reload()
            })
            .catch(error => console.error(error))
    }
    console.log(event)

}
// View Interest

const interestPollCon = document.querySelector('#interestPoll')
viewInterestFunc = (event) => {
    event.preventDefault();
    interestPollCon.innerHTML = `
            <div class="d-flex justify-content-center feed_loader_1" style="">
            <div class="double preload_feeds" id="feed_loader" role="status"></div>
          </div>
        `
    console.log(event)
    const viewDom = event.target || event.srcElement;
    const id = viewDom.dataset.getInterestId;
    console.log(id)

    const url = `${baseUrl}api/admin/polls/`
    fetch(`${url}${id}`, {
        method: `GET`,
        mode: 'cors',
        headers: {
            Authorization: `Bearer${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            interestPollCon.innerHTML = ""
            console.log(data)
            const interestPollsObject = data;
            interestPollsObject.map(interestPoll => {
                console.log(interestPoll)
                interestPollCon.innerHTML += `
            <div class="col-12 individual-poll border mt-2 row mx-0 px-0">
            <div class="col-2 poll-image text-center px-0">
            <img class="mt-3 border" src="https://res.cloudinary.com/getfiledata/image/upload/w_200,c_thumb,ar_4:4,g_face/${interestPoll.user.image}" alt="">
          </div>
          <div class="col-10 px-0">
            <div class="col-12 poll-name pt-2">
              <span class="">${interestPoll.user.first_name} ${interestPoll.user.last_name} <a href="">${interestPoll.user.username}</a></span>
            </div>
            <div class="col-12 poll-question pt-2">
              <span class="mt-2">${interestPoll.question}</span>
            </div>
            <div id="pollOptions${interestPoll.id}" class="col-12 poll-options row scroller mx-0">
              
            </div>
            <div class="col-12 poll-votes text-right">
                <span class="mr-3">Votes: <span class="votes-value">${interestPoll.votes_count}</span></span>
            </div>
          </div>
              </div>
            `
                interestPoll.options.map(option => {
                    document.querySelector(`#pollOptions${interestPoll.id}`).innerHTML += `
                    <div class="progress col-12 indiv-option px-0 mb-2">
                <div class="progress-bar text-left px-2" role="progressbar" style="width: 25%;" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100">${option.option}</div>
              </div>
                `
                })
            })
        })
        .catch(error => console.log(error));
}