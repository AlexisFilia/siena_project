const stolenCode = () => {

  // https://codepen.io/chengarda/pen/wRxoyB

  let canvas = document.getElementById("my-canvas")
  let ctx = canvas.getContext('2d')
  console.log(ctx.getTransform())

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
  let imageWidth = window.innerWidth;
  let imageHeight = (imageWidth * 1080) / 1920;

  let clickX = 0;
  let clickY = 0;
  let currentLevel = 0;

  // Objectif 1 : de la mer bleu partout autours peut importe la vue - ok ==> Le faire avant les phases de transformations/ Le canvas se réinitialise!
  // Objectif 2 : redéfinir le zoom max et min pour pas aller trop loin ==> Annulé car mer bleue ok / A voir si intéressant plus tard
  // Objectif 3 : Determiner les zooms qui correspondent aux niveaux
    // Commencer par selectionner un point au milieu du niveau 1
    // Determiner comment faire pour que ce point soit au milieu de l´écran
      // L´image ne doit pas bouger de sa position
      // C´est notre regard sur elle qui doit changer
      // On peut zoomer qu´à la fin
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
      ctx.drawImage(island,-window.innerWidth / 2 ,-window.innerHeight / 2 , imageWidth , imageHeight) // Obligé de dessiner l´image avec des coordonnées négatives par rapport au centre qui est l´origine
      // ctx.drawImage(island,-window.innerWidth * 2 ,-window.innerHeight * 2  , window.innerWidth , (window.innerWidth * 1080)/ 1920) // Obligé de dessiner l´image avec des coordonnées négatives par rapport au centre qui est l´origine

      // drawGrid()
      drawLines()

      // ctx.fillStyle = "#EA3424";
      // drawRect(transformedPoint.x, transformedPoint.y, 50, 50)
      // drawRect(getTranslatedLocation({x: clickX, y: clickY}).x, getTranslatedLocation({x: clickX, y: clickY}).y, 50,50);

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

  function drawLines(){

    let pointLeft = new DOMPoint(0,window.innerHeight / 2 )
    let pointRight = new DOMPoint(window.innerWidth ,window.innerHeight / 2)
    let pointTop = new DOMPoint(window.innerWidth / 2 , 0)
    let pointDown = new DOMPoint(window.innerWidth / 2 , window.innerHeight)

    ctx.fillStyle = "#EA3424";
    ctx.beginPath();
    ctx.moveTo(translateFromRealToCanvas(pointLeft).x, translateFromRealToCanvas(pointLeft).y);
    ctx.lineTo(translateFromRealToCanvas(pointRight).x, translateFromRealToCanvas(pointRight).y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(translateFromRealToCanvas(pointTop).x, translateFromRealToCanvas(pointTop).y);
    ctx.lineTo(translateFromRealToCanvas(pointDown).x, translateFromRealToCanvas(pointDown).y);
    ctx.stroke();

  }


  function drawGrid() {


    ctx.fillStyle = "#EA3424";
    drawText(`(0,0)`, 0, 0,32, "courier")


    // ctx.fillStyle = "#45C4C7";
    // ctx.fillRect(0,0, 50, 50);


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

  function translateFromRealToCanvas(point){
    // Donne moi un point avec des coordonnées dans le monde réel et je te rend un point avec des coordonnées dans le monde du canvas
    // (Si je click je peux faire apparaitre ton click au bon endroit)
    let matrix = ctx.getTransform().invertSelf()
    let transformedPoint = point.matrixTransform(matrix);

    return transformedPoint
  }

  function translateFromCanvasToReal(point){

    // Donne moi un point avec des coordonnées dans le monde canvas et je te rend un point avec des coordonnées dans le monde réel
    let matrix = ctx.getTransform()
    let transformedPoint = point.matrixTransform(matrix);

    return transformedPoint

  }

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

  function keyDown(e){

    if(e.key == "ArrowRight"){
      cameraOffset.x -= 10
            console.log(`relative offsetX : ${cameraOffset.x / imageWidth} - relativeOffsetY : ${(cameraOffset.y - (window.innerHeight - imageHeight)) / imageHeight} `) ;
    }else if(e.key == "ArrowLeft"){
      cameraOffset.x += 10
            console.log(`relative offsetX : ${cameraOffset.x / imageWidth} - relativeOffsetY : ${(cameraOffset.y - (window.innerHeight - imageHeight)) / imageHeight} `) ;
    }else if(e.key == "ArrowDown"){
      cameraOffset.y -= 10
            console.log(`relative offsetX : ${cameraOffset.x / imageWidth} - relativeOffsetY : ${(cameraOffset.y - (window.innerHeight - imageHeight)) / imageHeight} `) ;

    }else if(e.key == "ArrowUp"){
      cameraOffset.y += 10
            console.log(`relative offsetX : ${cameraOffset.x / imageWidth} - relativeOffsetY : ${(cameraOffset.y - (window.innerHeight - imageHeight)) / imageHeight} `) ;

    }
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

      case 0:
        cameraZoom = 0.8 ;
        cameraOffset = {x: 0.5  * imageWidth , y: 0.5 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 1:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.20473970473970474 * imageWidth, y: 0.10075110075110075 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 2:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.22804972804972806 * imageWidth, y: 0.252697919364586 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 3:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.3368298368298368 * imageWidth, y: 0.22507122507122507 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 4:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.46114996114996115 * imageWidth, y: 0.23888457221790554  * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 5:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.43006993006993005 * imageWidth, y: 0.37701804368471037 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 6:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.40675990675990675 * imageWidth, y: 0.5842182508849175 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 7:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.5155400155400155 * imageWidth, y: 0.6118449451782785  * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 8:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.5932400932400932 * imageWidth, y: 0.5289648622981956  * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 9:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.6787101787101787 * imageWidth, y: 0.5289648622981956 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      // case 10:
      //   cameraZoom = 4 ;
      //   cameraOffset = {x: 0.771950271950272 * imageWidth, y: 0.598031598031598 * imageHeight + (window.innerHeight - imageHeight)};
      //   break;
      case 10:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.7641802641802642 * imageWidth, y: 0.6118449451782785 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 11:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.6631701631701632 * imageWidth, y: 0.7223517223517224 * imageHeight + (window.innerHeight - imageHeight)};
        break;
      case 12:
        cameraZoom = 4 ;
        cameraOffset = {x: 0.8108003108003108 * imageWidth, y: 0.8052318052318053 * imageHeight + (window.innerHeight - imageHeight)};
        break;

    }
  }



  function onPointerDown(e)
  {


    if(e.shiftKey){


      // console.log(ctx.getTransform())

      // setToLevel(1);

      // clickX = getEventLocation(e).x;
      // clickY = getEventLocation(e).y;
      // let point = new DOMPoint(clickX, clickY)

      setToLevel(currentLevel)
      currentLevel += 1
      // console.log(`relative offsetX : ${cameraOffset.x / imageWidth} - relativeOffsetY : ${(cameraOffset.y - (window.innerHeight - imageHeight)) / imageHeight} `) ;

      // console.log(cameraOffset.x - (window.innerWidth/2));

      // console.log(`Click x : ${clickX} - Click y : ${clickY}`);
      // getTranslatedLocation(point)
      // console.log(`Translated x : ${getTranslatedLocation({x: clickX, y: clickY}).x}-  Translated y : ${getTranslatedLocation({x: clickX, y: clickY}).y} `);
      // console.log(`DragStart x : ${dragStart.x}-  DragStart y : ${dragStart.y} `);
    }


    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y


    // console.log(`Coordonnées du monde réel ==> x : ${getEventLocation(e).x}, y : ${getEventLocation(e).y}`);
    // console.log(`Coordonnées du monde translated ==> x : ${ getTranslatedLocation(getEventLocation(e)).x}, y : ${getTranslatedLocation(getEventLocation(e)).y}`);
    // console.log(`Camera Zoom ==> ${cameraZoom}`);
    // console.log(`Camera Offset x ==> ${cameraOffset.x / window.innerWidth}`);
    // console.log(`Camera Offset y ==> ${cameraOffset.y / window.innerHeight}`);
    // console.log(`Camera Offset y ==> ${getEventLocation(e).x / window.innerWidth}`);


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
  document.addEventListener("keydown", (e) => keyDown(e));

  // Ready, set, go
  draw()
}

export{stolenCode};

