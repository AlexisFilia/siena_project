const handleTqlModal = () => {

  const tqlModalBtn = document.getElementById('tql-upload-btn');
  if(!tqlModalBtn) return;

  const tqlModalClose = document.getElementById('tql-modal-close');
  const tqlModal = document.getElementById('tql-modal');
  const btnSendMedia = document.getElementById('btn-send-media');
  const attachement = document.getElementById('medium_attached_file');

  tqlModalBtn.addEventListener('click', (e) => {
    tqlModal.classList.toggle('active');
  });

  tqlModalClose.addEventListener('click', (e) => {
    tqlModal.classList.toggle('active');
    btnSendMedia.style.display = 'none';
    attachement.value = '';
  });

  attachement.addEventListener('change', (e) => {
    btnSendMedia.style.display = 'flex';
  });
}

export{handleTqlModal};

