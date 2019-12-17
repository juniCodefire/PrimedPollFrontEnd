// const baseUrl = `http://localhost:2400/`;
const baseUrl = `https://polledapp.herokuapp.com/`;

// const baseUrl = `https://api.primedpoll.com/`; //api url
const domain = 'https://primedpoll.com/' //home pages
const subDomain = 'https://app.primedpoll.com/';
const siteTitle = `PrimedPoll`;
const siteLogo_1 = `<img onclick="location.href='${ window.location.origin }'" class="mt-2" src="../primed_assets/images/01.png" alt="">`;
const siteLogo_2 = `<img onclick="location.href='${ window.location.origin }'" class="mt-2" src="../primed_assets/images/03.png" alt="">`;

// // document.querySelector('.site_title').innerHTML += `${ siteTitle }`;
const siteNames_1 = Array.from(document.querySelectorAll('.site_name'));
siteNames_1.map(siteName_1 => siteName_1.innerHTML = `${ siteLogo_1 }`);


const siteNames_2 = Array.from(document.querySelectorAll('.site_name_2'));
siteNames_2.map(siteName_2 => siteName_2.innerHTML = `${ siteLogo_2 }`);