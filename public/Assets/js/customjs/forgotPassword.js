//Api To Send Recovery Code to Email Aftre Email Check
//Api To Reset The password Code

const forgotpassForm = document.querySelector("#forgotPass-form");
const se_pre = document.querySelector(".se-pre");
let statusCode;
const customAlert = (value) => {
    return swal(value);
}
//Handle all fetch Api Error Here
const status = (response) => {
    console.log(response.status);
    statusCode = response.status;
    return response.json();
}
const processApiResponse = (data, email = "", errorText = "") => {
    se_pre.style.display = "none";
    if (!data.ok) {
        let text;
        switch (JSON.stringify(statusCode)) {
            case "422":
                text = `Email filed cannot be empty!`;
                break;
            case "404":
                text = `Email not found in our database, please do check the mail and try again!`;
                break;
            case "500":
                text = `Email not sent, please try again!`;
                break;
            default:
               customAlert(`An email has been sent to ${email}, follow link to reset password!`);
               return true;
        }
        errorText.innerHTML = text;
        console.log(data);
    }
    console.log(data);
    console.log(JSON.stringify(statusCode))
}
const sendRecoverCode = (event) => {
    event.preventDefault();
    se_pre.style.display = "block";
    //Send to the email check and Send Code Api
    const url = `${baseUrl}api/password/reset`;
    console.log(event.target[0])
    const email = event.target[0].value;
    const errorText = event.target.children[1].children[1].children[1];
    errorText.innerHTML = "";

    console.log(errorText);
    // email == ""? retrun 
    console.log(email);
    const data = {
        email
    };
    fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => status(response))
        .then(data => processApiResponse(data, email, errorText))
        .catch(error => {
            console.log(error)
        });

}

forgotpassForm.addEventListener('submit', (event) => sendRecoverCode(event))