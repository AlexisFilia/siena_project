import { fetchWithToken } from "../utils/fetchWithToken";

const draggables = () => {
  const draggables = document.querySelectorAll('.draggable');
  if(!draggables[0]) return;


  let isDragging = false;
  let refClick = new DOMPoint(0,0);
  let mousePoint = new DOMPoint(0,0);
  let votePosition = 'middle';
  let vote = "";
  const palier = 70;


  const onPointerDown = (e, draggable) => {
    isDragging = true;
    refClick.x = getEventLocation(e).x;
    refClick.y = getEventLocation(e).y;
    // console.log(draggable);
  }

  const onPointerUp = (e, draggable) => {
    isDragging = false;

    switch(votePosition){
      case 'middle':
        draggable.style.transform = `translate(0px) rotate(0deg)`;
        break;
      case 'left':
        vote = false;
        sendVote(draggable);
        break;
      case 'right':
        vote = true;
        sendVote(draggable);
        break;
      default:
        break;

    }
  }

  const onPointerMove = (e, draggable) => {
    if(isDragging){
      mousePoint.x = getEventLocation(e).x;
      mousePoint.y = getEventLocation(e).y;
      // console.log(mousePoint.x - refClick.x);
      const txt = draggable.querySelector('.tql-validation-text');
      const translation = mousePoint.x - refClick.x;

      draggable.style.transform = `translate(${translation / 2}px) rotate(${translation / 10}deg)`;
      if(translation / 2 >= palier){
        votePosition = "right";
        draggable.classList.remove('reject');
        draggable.classList.add('validate');
        txt.innerText = "YES";

      }else if(translation / 2 <= -palier){
        votePosition = "left";
        draggable.classList.remove('validate');
        draggable.classList.add('reject');
        txt.innerText = "NO";
      }else{
        votePosition = "middle";
        draggable.classList.remove('validate');
        draggable.classList.remove('reject');
        txt.innerText = "";
      }
    }
  }

  function sendVote(draggable){

    fetchWithToken("/swipe_vote", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({ tql: draggable.dataset.id, vote: vote})
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
        });

  }



  // Handle position of touch and mouse
  function getEventLocation(e)
  {
      if (e.touches && e.touches.length == 1)
      {
          return { x:e.touches[0].clientX, y: e.touches[0].clientY }
      }
      else if (e.clientX && e.clientY)
      {
          return { x: e.clientX, y: e.clientY }
      }
  }

  // Handle touch by passing the click function to the touch event
  function handleTouch(e, draggable, singleTouchHandler)
  {


      if ( e.touches.length == 1 )
      {
        singleTouchHandler(e, draggable);
      }else if(e.type == "touchend"){
        singleTouchHandler(e, draggable);
      }
      else if (e.type == "touchmove" && e.touches.length == 2)
      {
          // gere peut etre une situation autre
          isDragging = false;
      }
  }



  draggables.forEach(draggable => draggable.addEventListener('mousedown', (e) => onPointerDown(e, draggable)));
  draggables.forEach(draggable => draggable.addEventListener('touchstart', (e) => handleTouch(e, draggable, onPointerDown)));
  draggables.forEach(draggable => draggable.addEventListener('mouseup', (e) => onPointerUp(e, draggable)));
  draggables.forEach(draggable => draggable.addEventListener('touchend', (e) => handleTouch(e, draggable, onPointerUp)));
  draggables.forEach(draggable => draggable.addEventListener('mousemove', (e) => onPointerMove(e, draggable)));
  draggables.forEach(draggable => draggable.addEventListener('touchmove', (e) => handleTouch(e, draggable, onPointerMove)));
}

export{draggables};

