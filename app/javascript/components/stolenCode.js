const stolenCode = () => {

  // https://codepen.io/chengarda/pen/wRxoyB

  let canvas = document.getElementById("my-canvas")
  let ctx = canvas.getContext('2d')

  let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
  let cameraZoom = 1
  let MAX_ZOOM = 5 // Inversé pour nous
  let MIN_ZOOM = 0.1 // Inversé pour nous
  let SCROLL_SENSITIVITY = 0.005

  let isDragging = false
  let dragStart = { x: 0, y: 0 }
  let initialPinchDistance = null
  let lastZoom = cameraZoom

  let island = new Image();
  let treasure = new Image();
  island.src = "/assets/bigpic.png";
  treasure.src = "/assets/treasure.png";
  let desiredWidth = 1920 / 1.2; // determiner le max zoom sur ca?
  let desiredHeight = 1080 / 1.2; // determiner le max zoom sur ca?


  // Objectif 1 : de la mer bleu partout autours peut importe la vue - ok ==> Le faire avant les phases de transformations/ Le canvas se réinitialise!
  // Objectif 2 : redéfinir le zoom max et min pour pas aller trop loin ==> Annulé car mer bleue ok / A voir si intéressant plus tard
  // Objectif 3 : Determiner les zooms qui correspondent aux niveaux
  // Objectif 4 : Faire une fonction qui zoom sur le niveau qui nous intéresse
  // Objectif 5 : Ajouter une image en 2D clickable avec système de coordonnées clair du coup (click)



  function draw()
  {



      // Ca c´est cool ca veut dire qu´ on adapte en temps réel le canvas par rapport à la taille de l´ecran
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      ctx.fillStyle = "#45C4C7";
      drawRect(0,0, window.innerWidth, window.innerHeight)

      // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
      ctx.translate( window.innerWidth / 2, window.innerHeight / 2 ) // Le point d´origine du canvas est au centre de la window
      ctx.scale(cameraZoom, cameraZoom)
      ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y ) // reajustement après scale


      // En fait on dessine toujours la même chose avec la même taille et les mêmes coordonnées, c´est notre vue qui change
      ctx.drawImage(island,-window.innerWidth / 2 ,-window.innerHeight / 2 , window.innerWidth , (window.innerWidth * 1080)/ 1920) // Obligé de dessiner l´image avec des coordonnées négatives par rapport au centre qui est l´origine

      // ctx.fillStyle = "#991111"
      // Quel est le centre?
      // drawRect(0,0, getTranslatedSize(100),getTranslatedSize(100)) // ok
      // drawRect(getTranslatedLocation({x: 0, y: 0}).x,getTranslatedLocation({x: 0, y: 0}).y, getTranslatedSize(100),getTranslatedSize(100)) // ok


      drawGrid()

      requestAnimationFrame( draw ) // Ca veut dire que ca tourne en boucle/ On redraw à chaque FPS
  }

  // Gets the relevant location from a mouse or single touch event
    // Retourne un hash avec des coordonnées x et y de la souris ou du touch DANS LE MONDE RÉEL
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


  function drawGrid() {


    ctx.fillStyle = "#EA3424";
    drawText(`(0,0)`, 0, 0,32, "courier")


    ctx.fillStyle = "#45C4C7";
    ctx.fillRect(0,0, 50, 50);


    ctx.fillStyle = "#000000";

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10000, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 10000);
    ctx.stroke();

    for(let i = 100; i < 10000;  i += 100){
      ctx.beginPath();
      ctx.moveTo(i, -100);
      ctx.lineTo(i, 10000);
      ctx.stroke();
      drawText(`${i}`, i, -150,32, "courier")
    }

    for(let j = 100; j < 10000;  j += 100){
      ctx.beginPath();
      ctx.moveTo(-100, j);
      ctx.lineTo(10000, j);
      ctx.stroke();
      drawText(`${j}`, -150, j,32, "courier")
    }
  }

  // function getTranslatedLocation(coord){
  //   // Fonction de Tim pour retourner un hash x et y avec les coordoonnées translatée à partir de coordonnées du monde réel
  //   // Je veux que si je donne 0,0 ca me donne les coordonnées translatées qui correspondent à mon 0,0 dans le monde réel
  //   // Il ne faut pas que ca bouge quand je zoom
  //   // Il ne faut aps que ca bouge quand je drag

  //   let x = coord.x - cameraOffset.x // sans le scale applied
  //   let y = coord.y - cameraOffset.y // sans le scale applied

  //   // On scale par rapport à cameraZoom en x et y ==> déterminer la translation que ca représente et l´inverser

  //   x = x / cameraZoom; // Tout simplement car x' = kx
  //   y = y / cameraZoom;

  //   // Manque le drag
  //   // x = x + dragStart.x
  //   // y = y + dragStart.y

  //   // Donc en gros (hash.x - cameraOffset.x) / cameraZoom mais je garde les étapes pour m´en souvenir

  //   return{x: x, y: y}
  // }

  // function getTranslatedSize(size){
  //   // Fonction Tim pour avoir une size dans le monde réel
  //   return size / cameraZoom
  // }

  function drawRect(x, y, width, height)
  {
      ctx.fillRect( x, y, width, height )
  }

  function drawText(text, x, y, size, font)
  {
      ctx.font = `${size}px ${font}`
      ctx.fillText(text, x, y)
  }



  function setToLevel(level){

    // Peu importe où on est, gérer cameraZoom et offset nous amenera au même endroit
    // Le problème à résoudre c´ est la taille du canvas : Selon la taille ca zoom aps au meme endroit


    // L´objectif est:
      // Définir des points sur l`image de base
      // Ces points sont au milieu des niveaux
      // Quand on demande a la fonction d´aller à un niveau, ces points sont au milieu de l´écran avec un zoom adapté
      // Hypothese : Comme pour le produit en croix, je peux donner un cameraOffset relatif au window.innerWidth


    switch(level){
      case 1:
        cameraZoom = 2.3 ;
        cameraOffset = {x: 0.23 * window.innerWidth, y: 0.3 * window.innerHeight};
        break;
      case 2:
        break;

    }
  }



  function onPointerDown(e)
  {


    if(e.shiftKey){
      setToLevel(1);
    }


    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y


    // console.log(`Coordonnées du monde réel ==> x : ${getEventLocation(e).x}, y : ${getEventLocation(e).y}`);
    // console.log(`Coordonnées du monde translated ==> x : ${ getTranslatedLocation(getEventLocation(e)).x}, y : ${getTranslatedLocation(getEventLocation(e)).y}`);
    // console.log(`Camera Zoom ==> ${cameraZoom}`);
    // console.log(`Camera Offset x ==> ${cameraOffset.x / window.innerWidth}`);
    // console.log(`Camera Offset y ==> ${cameraOffset.y / window.innerHeight}`);
    console.log(`Camera Offset y ==> ${getEventLocation(e).x / window.innerWidth}`);


  }

  function onPointerUp(e)
  {
      isDragging = false
      initialPinchDistance = null
      lastZoom = cameraZoom
  }

  function onPointerMove(e)
  {



      if (isDragging)
      {
          cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
          cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
      }else{
        // Section ajoutée par Tim pour déterminer les coordonnées du monde réel

        // console.log(getEventLocation(e).y);
      }
  }

  function handleTouch(e, singleTouchHandler)
  {
      if ( e.touches.length == 1 )
      {
          singleTouchHandler(e)
      }
      else if (e.type == "touchmove" && e.touches.length == 2)
      {
          isDragging = false
          handlePinch(e)
      }
  }



  function handlePinch(e)
  {
      e.preventDefault()

      let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }

      // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
      let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2

      if (initialPinchDistance == null)
      {
          initialPinchDistance = currentDistance
      }
      else
      {
          adjustZoom( null, currentDistance/initialPinchDistance )
      }
  }

  function adjustZoom(zoomAmount, zoomFactor)
  {

    // console.log(zoomAmount);
      if (!isDragging)
      {
          if (zoomAmount)
          {
              cameraZoom -= zoomAmount // cameraZoom += zoomAmount avant
          }
          else if (zoomFactor)
          {
              // console.log(zoomFactor)
              cameraZoom = zoomFactor*lastZoom
          }

          cameraZoom = Math.min( cameraZoom, MAX_ZOOM ) // Permet de maitriser zoom max
          cameraZoom = Math.max( cameraZoom, MIN_ZOOM ) // Permet de maitriser zoom min

          // console.log(zoomAmount)
      }
      // console.log(cameraZoom);
  }

  canvas.addEventListener('mousedown', (e) => onPointerDown(e))
  canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
  canvas.addEventListener('mouseup', onPointerUp)
  canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
  canvas.addEventListener('mousemove', onPointerMove)
  canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
  canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))

  // Ready, set, go
  draw()
}

export{stolenCode};

