const preloader = document.querySelector('#slim_preloader');
let slim_loader;

const slim_preloader = (stop = false) => {
  let threshold = 0;
  let timeLapse = 500;
  let drawback = 2;
  console.log(preloader)

  console.log(stop)
 if(stop == true) {
     clearInterval(slim_loader)
     preloader.style.width = '0%';
     preloader.style.display = 'none';
     return;
  }
  preloader.style.display = 'block';
  slim_loader = setInterval(() => {
    threshold++;
    if(threshold > 0  && threshold > drawback){
      drawback = Math.floor(Math.random() * 10);
      threshold = drawback + threshold;
    }
    if(drawback % 5) {
      preloader.style.width = `${threshold}%`;
    }
    if(threshold > 100) {
      clearInterval(slim_loader)
    }
  }, timeLapse)
}
slim_preloader();