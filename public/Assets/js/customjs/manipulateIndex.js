const usernameURL = location.hash;
const preloader = document.querySelector('.back_bar-1');
const seprecon = document.querySelector('.se-pre-con');
const username = usernameURL.substr(1);
const storeUser = localStorage.getItem('username');
if (`@${username}` === storeUser) {
   window.location.replace(`${window.location.origin}/user/user-profile-lite.html`);
}

let permission = 0;
let onSession = 0;
const parsedUrl = new URL(window.location.href);
const getSearchParam = parsedUrl.searchParams;

//Get Permission 
let paramPermit = getSearchParam.get("permission");
let paramOnSession = getSearchParam.get("on_session");
console.log(paramOnSession, paramPermit)

if (usernameURL !== "") {
    if (paramPermit || paramOnSession) {
        if (paramPermit == 1) {
            permission = paramPermit;
            onSession = paramOnSession;
        } else {
            location.replace(`${ window.origin }/user/signin.html`);
        }
    }

    root.innerHTML = publicProfile;
    //Get the required variaables


    //Call the Api That Check The Username and also emit reletive info
    const api = `${ baseHome }api/profile/${ permission }/${ onSession }/${ username }`;
    console.log(api)

    fetch(api)
        .then(response => response.json())
        .then(response => {

            displayData(response.data)

        }).catch(error => {
            console.log(error);
            if (error) {
                root.innerHTML = error404;
                $(".publicPreloader").fadeOut("slow");
                console.log(error.status)
            }

        });


}