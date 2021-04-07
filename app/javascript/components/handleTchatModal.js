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
    btnCreatePoll.style.display = 'block';
    btnSendMedia.style.display = 'none';
    attachement.value = '';
  });


  attachement.addEventListener('change', (e) => {
    // console.log(attachement.value);
    btnCreatePoll.style.display = 'none';
    btnSendMedia.style.display = 'block';

  });

}

export{handleTchatModal};
