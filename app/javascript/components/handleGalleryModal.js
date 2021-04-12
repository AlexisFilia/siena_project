import { fetchWithToken } from "../utils/fetchWithToken";

const handleGalleryModal = () => {

  const galleryModal = document.querySelector('#gallery-modal');
  if(!galleryModal) return;

  const galleryModalClose = galleryModal.querySelector('#gallery-modal-close');
  const galleryItems = document.querySelectorAll('.gallery-item');


  const displayGalleryModal = (data) =>{
    // console.log(id);
    const modalDescription = galleryModal.querySelector('#gallery-modal-description');
    const description = `${data.team} : ${data.quest}`;
    modalDescription.innerHTML = description;
    // modalDescription.insertAdjacentHTML('beforeend', )
    galleryModal.classList.toggle('active');
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


  galleryModalClose.addEventListener('click', (e) => {galleryModal.classList.toggle('active');});
  galleryItems.forEach(item => {item.addEventListener('click', (e) => fetch_gallery_modal_content(item.dataset.id))});

}

export{handleGalleryModal};
