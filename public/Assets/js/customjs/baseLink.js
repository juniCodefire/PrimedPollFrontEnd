const baseUrl = `https://polledapp.herokuapp.com/`;
const siteTitle = `Primed Poll`;
const siteLogo = `<img onclick="location.href='${ window.location.origin }'" class="mt-2" src="../Assets/images/01.png" alt="">`;

document.querySelector('.site_title').innerHTML += `${ siteTitle }`;
document.querySelector('.site_name').innerHTML = `${ siteLogo }`;



