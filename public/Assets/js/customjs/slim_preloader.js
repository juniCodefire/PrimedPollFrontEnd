const slim_preloader = (stop = false) => {
  let threshold = 0;
  let timeLapse = 500;
  let drawback = 2;
  const preloader = document.querySelector('#slim_preloader');
  
  const i = setInterval(() => {
    threshold++;
    if(threshold > 0  && threshold > drawback){
      drawback = Math.floor(Math.random() * 10);
      threshold = drawback + threshold;
    }
    if(drawback % 5) {
      preloader.style.width = `${threshold}%`;
    }
    if(threshold > 100) {
      clearInterval(i)
    }
  }, timeLapse)
}
slim_preloader();