//Api To Send Recovery Code to Email Aftre Email Check
//Api To Reset The password Code
//Get The token form the url 
const resetpassForm = document.querySelector("#resetPass-form");
const se_pre = document.querySelector(".se-pre");

let statusCode;
const parsedUrl = new URL(window.location.href);
const getSearchParam = parsedUrl.searchParams;
//Get Permission 
const customAlert = (value) => {
    return swal(value);
}
let verifycode = getSearchParam.get("verifycode");
if (verifycode == '' || verifycode.length < 5) {
    customAlert(`Verify code is empty! or have an invalid character length`);
    setTimeout(() => {
        location.href = `${ window.location.origin }/user/signin.html`;
    }, 5000);
}
//Handle all fetch Api Error Here
const status = (response) => {
    statusCode = response.status;
    return response.json();
}
const processApiResponse = (data, errorText = "") => {
    se_pre.style.display = "none";
    if (!data.ok) {
        let text;
        switch (JSON.stringify(statusCode)) {
            case "422":
                text = `Password filed cannot be empty!`;
                break;
            case "401":
                customAlert(`Error reseting password, please follow the link from your email to get valid verification code!`);
                break;
            case "500":
                customAlert(`Error changing password, please refresh and try aagain!`);
                break;
            default:
                customAlert(`New password created successfully!`);
                setTimeout(() => {
                    location.href = `${ window.location.origin }/user/signin.html`;
                }, 5000);
                return
        }
        errorText.innerHTML = text;
    }
}
const sendRecoverCode = (event) => {
    event.preventDefault();
    se_pre.style.display = "block";
    //Send to the email check and Send Code Api
    const url = `${baseUrl}api/password/change`;
    const password = event.target[0].value;
    const password_confirmation = event.target[1].value;
    const errorText = event.target.children[1].children[1].children[1];

    errorText.innerHTML = "";
    if (password == "") {
        return errorText.innerHTML = `Password filed cannot be empty!`;
    }

    const data = {
        password,
        password_confirmation,
        verifycode
    };
    fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => status(response))
        .then(data => processApiResponse(data, errorText))
        .catch(error => {
            customAlert(`An error occured, this may be from an insufficient network coverage, please refresh and try again!`);
        });

}

resetpassForm.addEventListener('submit', (event) => sendRecoverCode(event))