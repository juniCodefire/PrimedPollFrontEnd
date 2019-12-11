// const baseUrl = `http://localhost:2400/`;
const baseUrl = `https://polledapp.herokuapp.com/`;
const siteTitle = `PrimedPoll`;
const siteLogo = `<img onclick="location.href='${ window.location.origin }'" class="mt-2" src="../Assets/images/01.png" alt="">`;

document.querySelector('.site_title').innerHTML += `${ siteTitle }`;
const siteNames = Array.from(document.querySelectorAll('.site_name'));

siteNames.map(siteName => siteName.innerHTML = `${ siteLogo }`);
