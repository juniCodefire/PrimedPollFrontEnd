

$.ajaxSetup({
      statusCode: {
          401: function(){
              // Redirec the to the login page.
              localStorage.removeItem('token');
              localStorage.removeItem('user_firstname');
              localStorage.removeItem('user_lastname');
              localStorage.removeItem('user_email');
              localStorage.removeItem('user_image');
              localStorage.removeItem('user_dob');
              localStorage.removeItem('user_phone');
              localStorage.removeItem('bio');

              location.href = "../Users/signin.html";
          }
      }
  });
  window.addEventListener('load', function() {
    // var status = document.getElementById("status");
    // var log = document.getElementById("log");

    function updateOnlineStatus(event) {
      console.log(event.type);
      var condition = navigator.onLine ? "online" : "offline";

      // status.className = condition;
      // status.innerHTML = condition.toUpperCase();
      //
      // log.insertAdjacentHTML("beforeend", "Event: " + event.type + "; Status: " + condition);
      if(condition == "online"){
          swal({
              title: "You are online!",
              icon: "info",
              button: "Refresh!",
            })
          .then((value) => {
            window.location.reload(true);
          });
      }else{
         swal({
            title: "Oops, You are offline!",
            icon: "error",
            button: "Close!",
          });
      }
    }

    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  });
  var mailme = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_firstname');
    localStorage.removeItem('user_lastname');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_image');
    localStorage.removeItem('user_dob');
    localStorage.removeItem('user_phone');
    localStorage.removeItem('bio');
    location.replace("../Users/signin.html");
   }

window.addEventListener('error', function(e) {
    var ie = window.event || {};
    var errMsg = e.message || ie.errorMessage || "404 error on " + window.location;
    var errSrc = (e.filename || ie.errorUrl) + ': ' + (e.lineno || ie.errorLine);
    mailme([errMsg, errSrc]);
}, true);
