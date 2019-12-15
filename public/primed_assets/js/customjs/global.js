
const reboot = () => {
    if(location.origin === 'https://app.primedpoll.com') {
        location.replace(`https://primedpoll.com/user/signin.html`);
    }else {
         location.replace(`../user/signin.html`);
    }
}


$.ajaxSetup({
    statusCode: {
        401: function () {
            // Redirec the to the login page.
            localStorage.removeItem('user_id');
            localStorage.removeItem('token');
            localStorage.removeItem('user_firstname');
            localStorage.removeItem('user_lastname');
            localStorage.removeItem('user_email');
            localStorage.removeItem('user_image');
            localStorage.removeItem('user_dob');
            localStorage.removeItem('user_phone');
            localStorage.removeItem('bio');
            localStorage.removeItem('username');

            // reboot();
           
        }
    }
});
window.addEventListener('load', function () {
    // var status = document.getElementById("status");
    // var log = document.getElementById("log");

    function updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";

        // status.className = condition;
        // status.innerHTML = condition.toUpperCase();
        //
        // log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
        if (condition == "online") {
            swal({
                    title: "You are online!",
                    icon: "info",
                    button: "Refresh!",
                })
                .then((value) => {
                    window.location.reload(true);
                });
        } else {
            swal({
                title: "Oops, You are offline!",
                icon: "error",
                button: "Close!",
            });
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});
var mailme = function () {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user_firstname');
    localStorage.removeItem('user_lastname');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_image');
    localStorage.removeItem('user_dob');
    localStorage.removeItem('user_phone');
    localStorage.removeItem('bio');
    localStorage.removeItem('username');
    
    // reboot();
}

window.addEventListener('error', function (e) {
    var ie = window.event || {};
    var errMsg = e.message || ie.errorMessage || "404 error on " + window.location;
    var errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
    // mailme([errMsg, errSrc]);
}, true);

//make url consitent
if(location.origin === 'https://primedpoll.com' || location.origin === 'https://www.primedpoll.com') {
  location.replace(`https://app.primedpoll.com${location.pathname}`);
}