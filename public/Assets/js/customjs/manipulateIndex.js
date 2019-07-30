const usernameURL = location.hash;
const preloader = document.querySelector('.back_bar-1');
const seprecon = document.querySelector('.se-pre-con');
const username = usernameURL.substr(1);
let permission = 0;
let onSession = 'primedpolloff';

// const permission =
//
// const token = location.getItem('token');
// const permission = location.getItem('permission');
// console.log(token);
// if (token != "" && permission) {
//   let permission = 1;
//   let onSession = ;
// }

if (usernameURL !== "")
{
    root.innerHTML = publicProfile;
    //Get the required variaables


    //Call the Api That Check The Username and also emit reletive info
    const api = `${ baseHome }api/profile/${ permission }/${ onSession }/${ username }`;

    fetch(api)
        .then(response => response.json())
        .then(response =>
        {

            displayData(response.data)

        }).catch(error =>
        {
            console.log(error);
            if (error)
            {
                root.innerHTML = error404;
                $(".publicPreloader").fadeOut("slow");
                console.log(error.status)
            }

        });


}
