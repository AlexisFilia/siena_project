const handleTqlModal = () => {

  const tqlModalBtn = document.querySelector('#tql-upload-btn');
  console.log('test');
  if(!tqlModalBtn) return;

  console.log('test1');
  const tqlModalClose = document.querySelector('#tql-modal-close');
  const tqlModal = document.querySelector('#tql-modal');
  const btnSendMedia = document.querySelector('#btn-send-media');
  const attachement = document.querySelector('#medium_attached_file');

  tqlModalBtn.addEventListener('click', (e) => {
    tqlModal.classList.toggle('active');
    console.log('test4');
  });

  tqlModalClose.addEventListener('click', (e) => {
    console.log('test5');
    tqlModal.classList.toggle('active');
    btnSendMedia.style.display = 'none';
    attachement.value = '';
  });

  attachement.addEventListener('change', (e) => {
    console.log('test6');
    btnSendMedia.style.display = 'flex';
  });
}

export{handleTqlModal};
