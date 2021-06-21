const checkLanguage = () => {
  const navbar = document.getElementById("navbar");
  if(!navbar) return;

  // Une petite méthode qui check dans quel namespace de langue on est histoire de faire du design un peu plus classe

  if(window.location.pathname.startsWith("/en")){
    navbar.querySelector("#en-selection").style.display = "none";
  }else{
    navbar.querySelector("#fr-selection").style.display = "none";
  }

}

export{checkLanguage};
