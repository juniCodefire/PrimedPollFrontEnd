const adminInfo = JSON.parse(localStorage.getItem('adminInfo'))
const userList = document.querySelector('#userList')
const token = adminInfo.data.token;
fetch(`${baseUrl}api/admin/user`, {
    method : 'GET',
    mode : 'cors',
    headers : {
        'authorization' : `bearer${token}`
    }
})
.then(response => response.json())
.then (data => {
    const userObject = data.data;
    console.log(userObject)
    userObject.map(user => {
        userList.innerHTML += `<tr >
            <td>${user.id}</td>
            <td>${user.last_name}</td>
            <td>${user.first_name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td><button class="view-user-btn">View</button></td>
        </tr>`
    })
})
.catch (error => console.error(error))