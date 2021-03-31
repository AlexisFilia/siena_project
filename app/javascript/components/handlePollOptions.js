const handlePollOptions = () => {

  let pollOptionsContainer = document.querySelector('.form-section.poll-options')
  if(!pollOptionsContainer) return;

  let addOption = document.querySelector(".add-an-option");
  let optionsAmount = 1;
  let pollOptions;

  let deleteBtns = document.querySelectorAll('.delete-option');



  function resetOptionsIndexes(){

    pollOptions = document.querySelectorAll(".poll-option");
    let optionsLength = pollOptions.length;
    optionsAmount = 1;

    pollOptions.forEach(option => {

      let deleteBtn = option.querySelector('.delete-option');
      if(optionsLength == 1 ){
        console.log("yes");
        deleteBtn.style.display = 'none';
      }else{
        deleteBtn.style.display = 'block';
      }

      option.dataset.id = optionsAmount;
      option.querySelector('input').name = `options[${optionsAmount}]`;
      option.querySelector('input').placeholder = `Option n°${optionsAmount}`;
      deleteBtn.dataset.id = optionsAmount;
      optionsAmount += 1;
    });

  }



  function addOptionFunc(){
    optionsAmount += 1;

    let htmlInput = `
      <div class="form-group string poll_name add-an-option" data-id="addopt">
        <input class="form-control string" name="addopt" type="text" placeholder="Ajouter une option">
        <div class="delete-option" data-id="addopt" style="display: none">X</div>
      </div>
    `
    pollOptionsContainer.insertAdjacentHTML('beforeend', htmlInput);
    addOption.classList.remove("add-an-option");
    addOption.classList.add("poll-option");
    addOption.querySelector('input').removeEventListener('click', addOptionFunc);
    addOption = document.querySelector(".add-an-option");
    addOption.querySelector('input').addEventListener('click', addOptionFunc);
    addOption.querySelector('.delete-option').addEventListener('click', (e) => deleteOption(e));

    resetOptionsIndexes();

  }


  function deleteOption(e){
    pollOptions = document.querySelectorAll(".poll-option");

    let targetId = e.target.dataset.id;
    console.log(targetId);

    pollOptions.forEach(option => {
      if(option.dataset.id == targetId){
        option.remove();
        // console.log(option);
      }
    });

     resetOptionsIndexes();
  }


  // EVENT LISTENERS ------------------------------------------------------------------------

  resetOptionsIndexes();

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => deleteOption(e));
  });

  addOption.querySelector('input').addEventListener('click', addOptionFunc);


}

export{handlePollOptions};
