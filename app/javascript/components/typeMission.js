import { typeOnce } from '../components/typeOnce';

const typeMission = () => {
  const mission = document.querySelector('.mission');
  if(!mission) return;

  typeOnce(mission, 20);

}

export{typeMission};
