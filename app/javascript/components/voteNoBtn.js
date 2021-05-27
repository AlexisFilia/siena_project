import { handleCriteriaModal } from './handleCriteriaModal';

const voteNoBtn = () => {
  const voteNo = document.querySelector('.vote-no');
  if(!voteNo) return;

  voteNo.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('test');

    handleCriteriaModal();
  });
}

export{voteNoBtn};
