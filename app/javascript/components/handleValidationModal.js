import { fetchWithToken } from "../utils/fetchWithToken";
import { createCarouselFromUrls } from '../components/createCarouselFromUrls';
import { initCarousel } from '../components/initCarousel';

const handleValidationModal = () => {

  const validationModal = document.querySelector('#validation-modal');
  if(!validationModal) return;

  const validationModalBackground = document.querySelector('#validation-modal-background');
  const validationModalCarousel = validationModal.querySelector('#validation-modal-carousel');
  const validationMedia = document.querySelectorAll('.tql-medium');

  const toggleModal = () => {
    validationModalBackground.classList.toggle('active');
    validationModal.classList.toggle('active');
  }


  const displayValidationModal = (data) =>{
    // console.log(id);
    console.log(data);
    const modalDescription = validationModal.querySelector('#validation-modal-description');
    const description = `${data.team} : ${data.quest}`;
    modalDescription.innerHTML = description;
    // modalDescription.insertAdjacentHTML('beforeend', )

    const media = data.media;
    validationModalCarousel.innerHTML = createCarouselFromUrls("validation-modal-carousel", media);
    initCarousel();
    toggleModal();
  }


  const fetch_validation_modal_content = (id) =>{
    fetchWithToken("/fetch_team_quest_link_content_for_modals", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ id: id})
      })
        .then(response => response.json())
        .then((data) => {
          displayValidationModal(data);
        });
  }


  // validationModalClose.addEventListener('click', (e) => toggleModal(e));
  validationModalBackground.addEventListener('click', (e) => toggleModal(e));
  validationMedia.forEach(item => {item.addEventListener('click', (e) => fetch_validation_modal_content(item.dataset.id))});


}

export{handleValidationModal};
