const sideNavLinks = () => {

  const sideNav = document.getElementById("sideNav");
  if(!sideNav) return;
  const sideNavLinks = document.querySelectorAll("#sideNav-links a");

  sideNavLinks.forEach(link => {
    if(link.dataset.id == sideNav.dataset.id){
      link.classList.add("active");
    }
  });

}

export{sideNavLinks};
