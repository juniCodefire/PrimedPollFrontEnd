function formDataToObject(formData) {
    return new Object(Array.from(formData.entries()).reduce((old, pair) => ({
        ...old, [pair[0]]: pair[1]
    }), {}))
}
const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
const interestsList = document.querySelector('#interestsList')
const token = adminInfo.data.token;
fetch(`${baseUrl}api/admin/show/all/interest`, {
    method : 'GET',
    mode : 'cors',
    headers : {
        'authorization' : `bearer${token}`
    }
})
.then(response => response.json())
.then (data => {
    const interestObject = data.data.interest;
    interestObject.map(interest => {
        let interestID = interest.id;
        console.log(interestID)
        interestsList.innerHTML += `<tr >
            <td>${interest.id}</td>
            <td>${interest.title}</td>
            <td>--</td>
            
            <td><button class="view-user-btn">View</button></td>
            <td><button id="deleteInterestBtn${interestID}" class="delete-user-btn" onclick="deleteInterestFunc(${interestID})">Delete</button></td>
        </tr>`
    })
})
.catch (error => console.error(error))


// Add Interests

const addInterestForm = document.querySelector("#addInterestForm")
const url = `${baseUrl}api/admin/create/interest`
addInterestFunc = (event) =>{
    event.preventDefault();
    // console.log(event)
    let formData = new FormData(addInterestForm);
    formdata = formDataToObject(formData);
    // const data = new URLSearchParams(formData)
    fetch(url, {
        method : 'POST',
        mode : 'cors',
        body : JSON.stringify(formdata),
        headers : {
            Authorization : `Bearer${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        location.reload()
    })
    .catch (error => console.log(error.response))
}
addInterestForm.addEventListener('submit', (event) => addInterestFunc(event))

// Delete Interest
// const deleteInterestBtn = document.querySelector(`deleteInterestBtn${interestID}`);
// console.log(deleteInterestBtn)
deleteInterestFunc = (interestID) => {
    
    fetch(`${baseUrl}api/admin/delete/interest/${interestID}`, {
        method : 'DELETE',
        mode : 'cors',
        headers : {
            Authorization : `Bearer${token}`
        }
    })
    .then (response => response.json())
    .then(data => {
        console.log(data)
        location.reload()
    })
    .catch (error => console.error(error))
    
}
// deleteInterestBtn.addEventListener('click', (event) => deleteInterestFunc (event))