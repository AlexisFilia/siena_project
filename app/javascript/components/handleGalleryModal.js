import { fetchWithToken } from "../utils/fetchWithToken";

const handleGalleryModal = () => {

  const galleryModal = document.querySelector('#gallery-modal');
  if(!galleryModal) return;

  const galleryItems = document.querySelectorAll('.gallery-item');

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
          console.log(data);// handle JSON response from server);
        });
  }


  const displayGalleryModal = (id) =>{
    // console.log(id);
    fetch_gallery_modal_content(id);
  }


  galleryItems.forEach(item => {item.addEventListener('click', (e) => displayGalleryModal(item.dataset.id))});

}

export{handleGalleryModal};
