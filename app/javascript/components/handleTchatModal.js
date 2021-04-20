const handleTchatModal = () => {

  const tchatModalBtn = document.getElementById('tchat-action-bar-btn-plus');
  if(!tchatModalBtn) return;

  const tchatModalClose = document.getElementById('tchat-modal-close');
  const tchatModal = document.getElementById('tchat-modal');
  const btnSendMedia = document.getElementById('btn-send-media');
  const btnCreatePoll = document.getElementById('create-poll');
  const attachement = document.getElementById('medium_attached_file');

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
