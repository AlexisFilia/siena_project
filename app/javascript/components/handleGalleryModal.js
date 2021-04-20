import { fetchWithToken } from "../utils/fetchWithToken";
import { createCarouselFromUrls } from '../components/createCarouselFromUrls';
import { initCarousel } from '../components/initCarousel';

const handleGalleryModal = () => {

  const galleryModal = document.getElementById('gallery-modal');
  if(!galleryModal) return;

  const galleryModalBackground = document.getElementById('gallery-modal-background');
  // const galleryModalClose = galleryModalBackground.getElementById('gallery-modal-close');
  const galleryModalCarousel = galleryModal.getElementById('gallery-modal-carousel');
  const galleryItems = document.querySelectorAll('.gallery-item');

  const toggleModal = () => {
    galleryModalBackground.classList.toggle('active');
    galleryModal.classList.toggle('active');
  }


  const displayGalleryModal = (data) =>{
    // console.log(id);
    console.log(data);
    const modalDescription = galleryModal.getElementById('gallery-modal-description');
    const description = `${data.team} : ${data.quest}`;
    modalDescription.innerHTML = description;
    // modalDescription.insertAdjacentHTML('beforeend', )

    const media = data.media;
    galleryModalCarousel.innerHTML = createCarouselFromUrls("gallery-modal-carousel", media);
    initCarousel();
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


  // galleryModalClose.addEventListener('click', (e) => toggleModal(e));
  galleryModalBackground.addEventListener('click', (e) => toggleModal(e));
  galleryItems.forEach(item => {item.addEventListener('click', (e) => fetch_gallery_modal_content(item.dataset.id))});

}

export{handleGalleryModal};


