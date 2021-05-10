const createCarouselFromUrls = (carouselId, media) => {

  let carouselHTML = "";
  let carouselIndicators = "";
  let carouselItems = "";

  if(media.length > 1){
    carouselIndicators = `<ol data-target='#${carouselId}' class='carousel-indicators'>`;
    media.forEach((medium, index) =>{

      carouselIndicators += `<li data-slide-to="${index}" class="${index == 0 ? 'active' : ''}"></li>`;

      if(medium.type == "video"){
        carouselItems += `
        <div class="carousel-item ${index == 0 ? 'active' : ''}">
          <video
          width="100%"
          height="90%"
          controls="controls"
          poster="${medium.thumbnail}">
          <source src="${medium.url}.mp4" type="video/mp4">
          </video>
        </div>
        `;

        // Si je force le mp4 est- ce que ca va bugger?
        // <source src="${medium.url}.webm" type="video/webm">
        // <source src="${medium.url}.ogv" type="video/ogg">
      }else{
        carouselItems += `
        <div class="carousel-item ${index == 0 ? 'active' : ''}" style="background-image: url('${medium.url}')">
        </div>
        `;
      }

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

  }else{

    if(media[0].type == "video"){
      carouselItems += `
      <div class="carousel-item active">
        <video
        width="100%"
        height="90%"
        controls="controls"
        poster="${media[0].thumbnail}">
        <source src="${media[0].url}.mp4" type="video/mp4">
        </video>
      </div>
      `;
      // Si je force le mp4 est- ce que ca va bugger?
      // <source src="${media[0].url}.webm" type="video/webm">
      // <source src="${media[0].url}.ogv" type="video/ogg">
    }else{
      carouselItems += `
      <div class="carousel-item active" style="background-image: url('${media[0].url}')">
      </div>
      `;
    }

  }

  carouselHTML = carouselIndicators + "<div class='carousel-inner'>" + carouselItems + "</div>";

  return carouselHTML;
}

export{createCarouselFromUrls};


