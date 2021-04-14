const roulette = () => {
  const rouletteBtn = document.querySelector('#roulette-btn');
  if(!rouletteBtn) return

  const rouletteList = document.querySelector('#roulette-list');
  const rouletteListItems = rouletteList.querySelectorAll('li');
  const rouletteListItemsAmount = rouletteListItems.length;

  const rIncr = 1;
  const frequency = 50;
  const repositionAmount = rouletteListItemsAmount * (2 / rIncr) - 2; // La taille fait 2em
  let currentPosition = 0;
  let incrCount = 0;

  const stopRoulette = getRandomEvenInteger(rouletteListItemsAmount, rouletteListItemsAmount * 2); // max 3 fois la liste
  let timer;

  console.log(stopRoulette);


  function getRandomEvenInteger(min, max) {

    const randomInteger = Math.floor(Math.random() * (max - min) ) + min;
    if(randomInteger % 2 == 0){
      return randomInteger
    }else{
      return randomInteger +1
    }

  }


  function getResult(){
    rouletteListItems.forEach(item => {
      if(item.dataset.id == currentPosition){
        console.log(item.innerText);
      }
    });


  }

  function rollRoulette(){

    if(incrCount == stopRoulette ){
      clearInterval(timer);
      getResult();
    }else if(currentPosition == repositionAmount){
      clearInterval(timer);
      repositionList();
    }else{
      currentPosition += rIncr;
      incrCount += 1;
      rouletteList.style.top = `-${currentPosition}em`;
    }

  }

  function repositionList(){
    currentPosition = 0;
    rouletteList.style.top = "0";
    timer = setInterval(rollRoulette, frequency);
  }

  const launchRoulette = (e) => {
    console.log(rouletteListItemsAmount);
    console.log(repositionAmount);

    timer = setInterval(rollRoulette, frequency);
  }



  rouletteBtn.addEventListener('click', (e) => launchRoulette(e));
}

export{roulette};
