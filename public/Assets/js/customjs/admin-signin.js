const signInForm = document.querySelector("#signInForm");
const formWarning = document.querySelectorAll('.form-warning');
let status;
signInFunc = (event) => {
    event.preventDefault();
    formWarning[0].innerHTML = '';
    formWarning[1].innerHTML = '';

    // error handler
    const errorHandler = (response) => {
        status = response.status;
        return response.json()
    }
    console.log(event)
    const formData = new FormData(signInForm)
    // Validation
    console.log(formData.get('email'))
    if (formData.get('email') == "") {
        formWarning[0].innerHTML = "Email field is required";
    } else if (formData.get('password') == "") {
        formWarning[1].innerHTML = "Password field is required";
    } else {
        // const data = {
        //     email: formData.get('email'),
        //     password: formData.get('password')
        // }
        const data = new URLSearchParams(formData)
        console.log(data);
        const url = `${baseUrl}api/admin/login`
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: data
            // headers: {
            //     "Content-Type": "application/json"
            // },
            // body: JSON.stringify(data)
        })
            .then(response => errorHandler(response))

            .then(data => {
                console.log(data)
                if (status == 404) {
                    Swal.fire({
                        title: '<h4>Sign In Error</h4>',
                        html : `<p>${data.message}</p>`,
                        animation: true,
                        customClass: {
                            popup: 'animated fadeIn'
                        }
                    })
                } else if (status == 422){
                    
                    Swal.fire({
                        title: '<h4>Sign In Error</h4>',
                        html : `<p class="red-text" id="error422"></p>`,
                        animation: true,
                        customClass: {
                            popup: 'animated fadeIn'
                        }
                    })
                    const error422 = document.querySelector('#error422')
                    if (data.email){
                        error422.innerHTML += `${data.email[0]}<br>`
                    }
                    if (data.password){
                        error422.innerHTML += `${data.password[0]}<br>`
                    }

                }
                const swalBtns = Array.from(document.querySelectorAll('.swal2-styled'));
                swalBtns.map(swapBtn => swapBtn.classList.add('error-alert-btn'))
                localStorage.setItem("adminInfo", JSON.stringify(data))
                location.replace("index.html")
                
            })
            .catch(error => console.error(error))
    }

};

signInForm.addEventListener('submit', (event) => signInFunc(event))
