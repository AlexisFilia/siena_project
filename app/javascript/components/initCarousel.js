const initCarousel = () => {
  const carousel = document.querySelector('.carousel');
  if(!carousel) return;

  const carouselControls = carousel.querySelectorAll('.carousel-control');
  const carouselIndicators = carousel.querySelectorAll('.carousel-indicators li');
  let carouselId;
  if(carouselIndicators[0]){
    carouselId = carousel.querySelector('.carousel-indicators').dataset.target;
  }

  carouselControls.forEach((cControl) => {
    cControl.addEventListener('click', (event) => {
      $(carouselId).carousel(cControl.dataset.slide);
    })

  })

  carouselIndicators.forEach((cIndicator) => {

    cIndicator.addEventListener('click', (event) => {
      $(carouselId).carousel(parseInt(cIndicator.dataset.slideTo));
    })
  })


}

export{initCarousel};
