const token = localStorage.getItem('token');

let user_firstname = localStorage.getItem('user_firstname');
let user_lastname = localStorage.getItem('user_lastname');
let user_email = localStorage.getItem('user_email');
let user_image = localStorage.getItem('user_image');
let user_phone = localStorage.getItem('user_phone');
let user_dob = localStorage.getItem('user_dob');
let get_user_bio = localStorage.getItem('bio');
let user_name = localStorage.getItem('username');

let nav_user_firstname = user_firstname.charAt(0).toUpperCase();
let nav_user_lastname = user_lastname.charAt(0).toUpperCase();

let user_bio = get_user_bio.charAt(0).toUpperCase() + get_user_bio.slice(1);

$("#nav_name").html(`${ nav_user_firstname } ${ nav_user_lastname }`);
//Insert Into the username Block
$("#username").html(`${ user_name } <i class="edit-bio-icon fas fa-pencil-alt"></i>`);
//Insert Into the Usernmae Input
$("#newuserName").val(user_name);

let nav_image = `<img class="user-avatar rounded-circle mr-2 navImg" src="${ user_image }" alt="User Avatar">`;
$("#nav_image").html(nav_image);

$(document).on('click', '.logout', function ()
{
  localStorage.removeItem('token');
  localStorage.removeItem('user_firstname');
  localStorage.removeItem('user_lastname');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_image');
  localStorage.removeItem('user_dob');
  localStorage.removeItem('user_phone');
  localStorage.removeItem('bio');
  localStorage.removeItem('username');

  location.replace("../Users/signin.html");
});
