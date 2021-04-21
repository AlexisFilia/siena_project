const handleMainMenu = () => {
  const etbBurgerMenu = document.querySelector('#etb-burger-menu');
  if(!etbBurgerMenu) return;
  const closeMainMenu = document.querySelector('#main-menu-close');
  const mainMenu = document.querySelector('#main-menu');

  etbBurgerMenu.addEventListener('click', (e) => {
    mainMenu.classList.toggle('active');
  });

  closeMainMenu.addEventListener('click', (e) => {
    mainMenu.classList.toggle('active');
  });
}

export{handleMainMenu};
