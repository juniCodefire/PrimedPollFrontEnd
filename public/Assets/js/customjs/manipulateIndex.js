const usernameURL = location.hash;
const preloader = document.querySelector('.back_bar-1');
const seprecon = document.querySelector('.se-pre-con');
const username = usernameURL.substr(1);
const permission = 0;
const onSession = null;



if (usernameURL !== "")
{
    root.innerHTML = publicProfile;
    //Get the required variaables


    //Call the Api That Check The Username and also emit reletive info
    const api = `${ baseHome }api/profile/${ username }/${ permission }/${ onSession }`;

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
                $(".back_bar-1").fadeOut("slow");
                console.log(error.status)
            }

        });


}
