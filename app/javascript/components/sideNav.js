const sideNav = () => {
  const plusBtn = document.getElementById("bottom-bar-button-plus-rounded-div");
  if(!plusBtn) return;
  const sideNav = document.getElementById("sideNav");
  const sideNavBackground = document.getElementById("sideNav-background");
  const bottomBar = document.getElementById("bottom-bar");
  const plusBtnI = document.getElementById("bottom-bar-button-plus");
  const backBtnI = document.getElementById("bottom-bar-button-back");

  const slideAll = () => {
    sideNavBackground.classList.toggle("slided");
    sideNav.classList.toggle("slided");
    bottomBar.classList.toggle("slided");
    plusBtnI.classList.toggle("invisible");
    backBtnI.classList.toggle("invisible");
  }

  plusBtn.addEventListener('click', (e) => {slideAll();});
  sideNavBackground.addEventListener('click', (e) => {slideAll();});



}

export{sideNav};
