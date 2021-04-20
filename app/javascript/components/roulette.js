import { fetchWithToken } from "../utils/fetchWithToken";

const roulette = () => {
  const rouletteBtn = document.getElementById('roulette-btn');
  if(!rouletteBtn) return

  const rouletteList = document.getElementById('roulette-list');
  const rouletteListItems = rouletteList.querySelectorAll('li');
  const backSelect = document.getElementById('background-selector');
  const rouletteListItemsAmount = rouletteListItems.length;

  const rIncr = 1;
  let frequency = 50;

  const repositionAmount = rouletteListItemsAmount * (2 / rIncr) - 2; // La taille fait 2em
  let currentPosition = 0;
  let incrCount = 0;

  // const stopRoulette = 77 * 2; // max 3 fois la liste
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

  function launchEndAnimation(winner){

    backSelect.style.top = 0;

    winner.addEventListener('transitionend', (e) => {
      console.log("bigger");
      winner.classList.toggle('bigger');
    });

    backSelect.addEventListener('transitionend', (e) => {
      rouletteListItems.forEach(item => {
        if(item != winner){ // current position si la rouletteSize = 2
          item.style.transform = "scale(0)";
        }
      });

    })

    backSelect.style.height = "10em";
    winner.classList.toggle('bigger');



  }

  function sendResults(winner){

    fetchWithToken("/handle_roulette_result", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ roulette: rouletteList.dataset.list, index: winner.dataset.index})
      })
        .then(response => response.json())
        .then((data) => {console.log(data);});

  }


  function getResult(){
    rouletteListItems.forEach(item => {
      if(item.dataset.id == currentPosition + 4){ // current position si la rouletteSize = 2
        console.log(item.innerText);
        sendResults(item);
        launchEndAnimation(item);
      }
    });


  }

  function manageSpeed(){

    if(incrCount > 0.9 * stopRoulette){
      console.log("palier 2");
      frequency = 200;
    }else if(incrCount > 0.7 * stopRoulette){
      console.log("palier 1");
      frequency = 100;
    }
  }

  function rollRoulette(){

    if(incrCount == stopRoulette ){
      // clearInterval(timer);
      getResult();
    }else if(currentPosition + 4 == repositionAmount){
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
