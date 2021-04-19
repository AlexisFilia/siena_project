import { fetchWithToken } from "../utils/fetchWithToken";
import { createCarouselFromUrls } from '../components/createCarouselFromUrls';


const handleGalleryModal = () => {

  const galleryModal = document.querySelector('#gallery-modal');
  if(!galleryModal) return;

  const galleryModalBackground = document.querySelector('#gallery-modal-background');
  const galleryModalClose = galleryModal.querySelector('#gallery-modal-close');
  const galleryModalCarousel = galleryModal.querySelector('#gallery-modal-carousel');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const toggleModal = () => {
    galleryModalBackground.classList.toggle('active');
    galleryModal.classList.toggle('active');
  }

  const populateModalCarousel = (data) => {






  }


  const displayGalleryModal = (data) =>{
    // console.log(id);
    console.log(data);
    const modalDescription = galleryModal.querySelector('#gallery-modal-description');
    const description = `${data.team} : ${data.quest}`;
    modalDescription.innerHTML = description;
    // modalDescription.insertAdjacentHTML('beforeend', )

    const media = data.media;
    galleryModalCarousel.innerHTML = createCarouselFromUrls("#gallery-modal-carousel", media);

    toggleModal();
  }


  const fetch_gallery_modal_content = (id) =>{
    fetchWithToken("/fetch_gallery_modal_content", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ id: id})
      })
        .then(response => response.json())
        .then((data) => {
          displayGalleryModal(data);
        });
  }


  galleryModalClose.addEventListener('click', (e) => toggleModal(e));
  galleryModalBackground.addEventListener('click', (e) => toggleModal(e));
  galleryItems.forEach(item => {item.addEventListener('click', (e) => fetch_gallery_modal_content(item.dataset.id))});

}

export{handleGalleryModal};


