const handleTchatModal = () => {

  const tchatModalBtn = document.querySelector('#tchat-action-bar-btn-plus');
  if(!tchatModalBtn) return;

  const tchatModalClose = document.querySelector('#tchat-modal-close');
  const tchatModal = document.querySelector('#tchat-modal');
  const btnSendMedia = document.querySelector('#btn-send-media');
  const btnCreatePoll = document.querySelector('#create-poll');
  const attachement = document.querySelector('#medium_attached_file');
  const btnUploadProxy = document.querySelector('#upload-file-proxy');
  const spinner = document.querySelector('#upload-spinner');


  tchatModalBtn.addEventListener('click', (e) => {
    tchatModal.classList.toggle('active');
  });

  tchatModalClose.addEventListener('click', (e) => {
    tchatModal.classList.toggle('active');
    btnCreatePoll.style.display = 'flex';
    btnUploadProxy.style.display = 'flex';
    spinner.style.display = "none";
    // btnSendMedia.style.display = 'none';
    attachement.value = '';
  });

  btnUploadProxy.addEventListener('click', (e) => {
    console.log("yo");
    attachement.click();
  })

  attachement.addEventListener('change', (e) => {
    btnCreatePoll.style.display = 'none';
    btnUploadProxy.style.display = 'none';
    // btnSendMedia.style.display = 'flex';
    btnSendMedia.click();
    spinner.style.display = "block";

  });

}

export{handleTchatModal};

