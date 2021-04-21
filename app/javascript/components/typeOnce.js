const typeOnce = (target_element, speed) => {

  const textToType = target_element.innerText;
  const characters = textToType.split('');
  let constructedText = '';
  let i = 0;


  const typeText = () => {

    if(i == characters.length){
      clearInterval(timer);
    }else{
      constructedText += characters[i];
      i += 1;
      target_element.innerText = constructedText;
    }
  }

  const timer = setInterval(typeText, speed);

}

export{typeOnce};
