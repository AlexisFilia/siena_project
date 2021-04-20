const handleMainMenu = () => {
  const etbBurgerMenu = document.getElementById('etb-burger-menu');
  if(!etbBurgerMenu) return;
  const closeMainMenu = document.getElementById('main-menu-close');
  const mainMenu = document.getElementById('main-menu');

  etbBurgerMenu.addEventListener('click', (e) => {
    mainMenu.classList.toggle('active');
  });

  closeMainMenu.addEventListener('click', (e) => {
    mainMenu.classList.toggle('active');
  });
}

export{handleMainMenu};
