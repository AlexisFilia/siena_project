const handlePollVotes = () => {

  const selection = document.getElementById("poll-selected-option");
  if(!selection) return;

  const options = document.querySelectorAll(".poll-option-selectable");

  options.forEach(option => {
    option.addEventListener('click', (e) => {
      options.forEach(opt => {opt.classList.remove("active")});
      option.classList.add("active");
      selection.value = option.dataset.id;
    });
  });
}

export{handlePollVotes};
