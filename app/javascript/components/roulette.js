const roulette = () => {
  const rouletteBtn = document.querySelector('#roulette-btn');
  if(!rouletteBtn) return

  const rouletteList = document.querySelector('#roulette-list');
  const rouletteListItems = rouletteList.querySelectorAll('li');
  const rouletteListItemsAmount = rouletteListItems.length;

  const rIncr = 1;
  let frequency = 50;
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

  function manageSpeed(){

    // if(incrCount >= stopRoulette - 4){
    //   console.log("palier 3");
    //   frequency = 500;
    // }else

    if(incrCount > 0.8 * stopRoulette){
      console.log("palier 2");
      frequency = 200;
    }else if(incrCount > 0.6 * stopRoulette){
      console.log("palier 1");
      frequency = 100;
    }
  }

  function rollRoulette(){

    if(incrCount == stopRoulette ){
      // clearInterval(timer);
      getResult();
    }else if(currentPosition == repositionAmount){
      // clearInterval(timer);
      repositionList();
    }else{
      manageSpeed();
      currentPosition += rIncr;
      incrCount += 1;
      rouletteList.style.top = `-${currentPosition}em`;
      timer = setTimeout(rollRoulette, frequency);
    }

  }

  function repositionList(){
    currentPosition = 0;
    rouletteList.style.top = "0";
    timer = setTimeout(rollRoulette, frequency);
  }

  const launchRoulette = (e) => {
    console.log(rouletteListItemsAmount);
    console.log(repositionAmount);

    timer = setTimeout(rollRoulette, frequency);
  }



  rouletteBtn.addEventListener('click', (e) => launchRoulette(e));
}

export{roulette};
