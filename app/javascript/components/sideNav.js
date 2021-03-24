const sideNav = () => {
  const plusBtn = document.querySelector("#bottom-bar-button-plus-rounded-div");
  if(!plusBtn) return;
  const sideNav = document.querySelector("#sideNav");
  const sideNavBackground = document.querySelector("#sideNav-background");
  const bottomBar = document.querySelector("#bottom-bar");
  const plusBtnI = document.querySelector("#bottom-bar-button-plus");
  const backBtnI = document.querySelector("#bottom-bar-button-back");

  plusBtn.addEventListener('click', (e) => {

    // plusBtn.classList.toggle("slided");
    sideNavBackground.classList.toggle("slided");
    sideNav.classList.toggle("slided");
    bottomBar.classList.toggle("slided");
    plusBtnI.classList.toggle("invisible");
    backBtnI.classList.toggle("invisible");

  });

}

export{sideNav};
