const handleTchatModal = () => {

  const tchatModalBtn = document.querySelector('#tchat-action-bar-btn-plus');
  if(!tchatModalBtn) return;

  const tchatModalClose = document.querySelector('#tchat-modal-close');
  const tchatModal = document.querySelector('#tchat-modal');
  const btnSendMedia = document.querySelector('#btn-send-media');
  const btnCreatePoll = document.querySelector('#create-poll');
  const attachement = document.querySelector('#medium_attached_file');

  tchatModalBtn.addEventListener('click', (e) => {
    tchatModal.classList.toggle('active');
  });

  tchatModalClose.addEventListener('click', (e) => {
    tchatModal.classList.toggle('active');
    btnCreatePoll.style.display = 'flex';
    btnSendMedia.style.display = 'none';
    attachement.value = '';
  });


  attachement.addEventListener('change', (e) => {
    btnCreatePoll.style.display = 'none';
    btnSendMedia.style.display = 'flex';

  });

}

export{handleTchatModal};
