const createCarouselFromUrls = (carouselId, media) => {

  let carouselHTML = "";
  let carouselIndicators = "";
  let carouselItems = "";

  if(media.length > 1){
    carouselIndicators = `<ol data-target='#${carouselId}' class='carousel-indicators'>`;
    media.forEach((medium, index) =>{

      carouselIndicators += `<li data-slide-to="${index}" class="${index == 0 ? 'active' : ''}"></li>`;
      carouselItems += `
      <div class="carousel-item ${index == 0 ? 'active' : ''}" style="background-image: url('${medium}')">
      </div>
      `;
    });

    carouselIndicators += `
    </ol>
    <a class="carousel-control-prev carousel-control" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next carousel-control" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    `;

  }
  carouselHTML = carouselIndicators + "<div class='carousel-inner'>" + carouselItems + "</div>";

  return carouselHTML;
}

export{createCarouselFromUrls};
