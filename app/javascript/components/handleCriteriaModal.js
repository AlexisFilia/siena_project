const handleCriteriaModal = () => {

  const criteriaModal = document.getElementById('criteria-modal');
  if(!criteriaModal) return;

  const criteriaModalClose = document.getElementById('criteria-modal-close');

  const closeModal = () => {
    criteriaModal.classList.remove('active');
    const draggable = document.querySelector('.draggable');
    const txt = document.querySelector('.tql-validation-text');
    draggable.classList.remove('reject');
    txt.innerText = "";
    criteriaModalClose.removeEventListener('click', closeModal, true);
  }

  criteriaModalClose.addEventListener('click', closeModal, true);

  criteriaModal.classList.add('active');
}

export{ handleCriteriaModal };
