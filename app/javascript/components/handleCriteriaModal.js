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

  // const checkboxs = document.querySelectorAll('.checkbox');
  // checkboxs.forEach((checkbox) => {
  //   checkbox.addEventListener('click', () => {
  //     let checkboxIdex = checkbox.firstElementChild.id.replace(/valid-/,"");
  //     let textArea = document.getElementById("vote_why-" + checkboxIdex).parentNode;
  //     if (textArea.style.display === "block") {
  //       textArea.style.display = "none";
  //     } else {
  //       textArea.style.display = "block";
  //     }
  //   });
  // })
}

export{ handleCriteriaModal };
