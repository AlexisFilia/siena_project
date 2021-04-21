import { typeOnce } from '../components/typeOnce';

const typeMission = () => {
  const mission = document.querySelector('.mission');
  if(!mission) return;
  const criteria = document.querySelectorAll('.criterium');

  const missionText = mission.innerText;

  const animateCriterium = (index) => {

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
  const timer = setInterval(animateCriteria, 500);



}

export{typeMission};
