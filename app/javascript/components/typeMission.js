import { typeOnce } from '../components/typeOnce';

const typeMission = () => {

  const mission = document.querySelector('.mission');
  if(!mission) return;
  if(mission.dataset.status != "open") return;
  const criteriaContainer = document.querySelector('.quest-criteria');
  const criteria = document.querySelectorAll('.criterium');
  const missionText = mission.innerText;
  const roulette = document.querySelector('.roulette');


  criteriaContainer.style.display = "none";

  if(roulette){
    roulette.style.display = "none";
    roulette.style.transform = "scale(0)";
    roulette.style.transition = "transform 0.2s";
  }


  criteria.forEach(criterium => {
    criterium.style.transform = "scale(0)";
    criterium.style.transition = "transform 0.2s";

  });

  const animateCriterium = (index) => {

    if(roulette) roulette.style.transform = "scale(1)";

    if(index != criteria.length - 1){

      criteria[index].addEventListener('transitionend', (e) => {animateCriterium(index + 1)});
    }
    criteria[index].style.transform = "scale(1)";

  }


  const animateCriteria = () => {

    if(mission.dataset.typed == "true"){
      clearInterval(timer);
      animateCriterium(0);
    }
  }


  typeOnce(mission, 20);
  criteriaContainer.style.display = "block";
  if(roulette) roulette.style.display = "block";
  const timer = setInterval(animateCriteria, 500);



}

export{typeMission};
