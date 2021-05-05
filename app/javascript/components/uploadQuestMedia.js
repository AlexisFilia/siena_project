const uploadQuestMedia = () => {

  const mediaGrid = document.querySelector('#media-grid');
  if(!mediaGrid) return;
  const addMedium = document.querySelector('#add-medium-to-tql');
  const mediaHandler = document.querySelector('#medium_attached_file');


  const addDocument = () => {
    mediaHandler.click();
  }

  addMedium.addEventListener('click', (e) => addDocument());
  console.log("yo");
}

export{uploadQuestMedia}
