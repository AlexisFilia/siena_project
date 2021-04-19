const initCarousel = () => {
  const carousel = document.querySelector('#tql-carousel');
  if(!carousel) return;
  console.log("yo");
  const carouselControls = carousel.querySelectorAll('.carousel-control');
  const carouselIndicators = carousel.querySelectorAll('.carousel-indicators li')

  carouselControls.forEach((cControl) => {
    cControl.addEventListener('click', (event) => {
      // console.log(cControl.dataset.slide);
      $('#tql-carousel').carousel(cControl.dataset.slide);
    })

  })

  carouselIndicators.forEach((cIndicator) => {
    cIndicator.addEventListener('click', (event) => {
      // console.log(cIndicator.dataset.slideTo);
      $('#tql-carousel').carousel(parseInt(cIndicator.dataset.slideTo));
    })
  })


}

export{initCarousel};
