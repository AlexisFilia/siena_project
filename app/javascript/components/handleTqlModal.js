const handleTqlModal = () => {

  const tqlModalBtn = document.getElementById('tql-upload-btn');
  if(!tqlModalBtn) return;

  const tqlModalClose = document.querySelector('#tql-modal-close');
  const tqlModal = document.querySelector('#tql-modal');
  const btnSendMedia = document.querySelector('#btn-send-media');
  const attachement = document.querySelector('#medium_attached_file');

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

