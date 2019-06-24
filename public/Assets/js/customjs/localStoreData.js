var token = localStorage.getItem('token');

var user_firstname = localStorage.getItem('user_firstname');
var user_lastname = localStorage.getItem('user_lastname');
var user_email = localStorage.getItem('user_email');
var user_image = localStorage.getItem('user_image');
var user_phone = localStorage.getItem('user_phone');
var user_dob = localStorage.getItem('user_dob');
var user_bio = localStorage.getItem('bio');
console.log(user_image);

var nav_user_firstname = user_firstname.charAt(0).toUpperCase();
var nav_user_lastname = user_lastname.charAt(0).toUpperCase();

var user_bio = user_bio.charAt(0).toUpperCase() + user_bio.slice(1);

$("#nav_name").html(nav_user_firstname + "" + nav_user_lastname);

var nav_image = `<img class="user-avatar rounded-circle mr-2 navImg" src="${user_image}" alt="User Avatar">`;
$("#nav_image").html(nav_image);

$(document).on('click', '.logout', function() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_firstname');
  localStorage.removeItem('user_lastname');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_image');
  localStorage.removeItem('user_dob');
  localStorage.removeItem('user_phone');
  localStorage.removeItem('bio');

  location.replace("../Users/signin.html");
});
