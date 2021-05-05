const uploadQuestMedia = () => {

  const mediaGrid = document.querySelector('#media-grid');
  if(!mediaGrid) return;
  const addMedium = document.querySelector('#add-medium-to-tql');
  const mediaHandler = document.querySelector('#medium_attached_file');
  const submitMediumBtn = document.querySelector('#upload-medium');
  const submitBtn =  document.querySelector('#submit-quest');
  // const spinner = document.querySelector('#upload-spinner');
  // const checkUploadInterval;


  mediaHandler.addEventListener('change', (e) => {
    console.log("media upload");

    if(submitBtn) submitBtn.style.display = "none";
    addMedium.querySelector('p').style.display = "none";
    addMedium.querySelector('#upload-spinner').style.display = "block";
    submitMediumBtn.click();
  });

  const addDocument = () => {
    mediaHandler.click();
  }

  addMedium.addEventListener('click', (e) => addDocument());
  console.log("yo");
}

export{uploadQuestMedia}
