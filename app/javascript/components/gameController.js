import { Quest } from '../models/questModel';
import treasure_src from '../../assets/images/treasure.png'
import i00 from '../../assets/images/00.png'

const gameController = () => {

  // https://codepen.io/chengarda/pen/wRxoyB
  let redSquareInfo = document.querySelector("#redSquareInfo");
  let canvas = document.getElementById("my-canvas")
  if(!canvas) return;

  let questsRepo = [];

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


  // Division de l´île en 16 images de 1920 x 1080 = 7680 x 4320 image de base
  let island_00 = new Image();
  let island_01 = new Image();
  let island_02 = new Image();
  let island_03 = new Image();
  let island_10 = new Image();
  let island_11 = new Image();
  let island_12 = new Image();
  let island_13 = new Image();
  let island_20 = new Image();
  let island_21 = new Image();
  let island_22 = new Image();
  let island_23 = new Image();
  let island_30 = new Image();
  let island_31 = new Image();
  let island_32 = new Image();
  let island_33 = new Image();

  console.log(island_00);
  island_00.src = i00;
  // console.log(url("/../../assets/images/00.png"));
  // island_00.src = "/assets/00.png";
  // island_01.src = "/assets/01.png";
  // island_02.src = "/assets/02.png";
  // island_03.src = "/assets/03.png";
  // island_10.src = "/assets/10.png";
  // island_11.src = "/assets/11.png";
  // island_12.src = "/assets/12.png";
  // island_13.src = "/assets/13.png";
  // island_20.src = "/assets/20.png";
  // island_21.src = "/assets/21.png";
  // island_22.src = "/assets/22.png";
  // island_23.src = "/assets/23.png";
  // island_30.src = "/assets/30.png";
  // island_31.src = "/assets/31.png";
  // island_32.src = "/assets/32.png";
  // island_33.src = "/assets/33.png";


  let imageWidth = 960;
  let imageHeight = 540;


  let treasure = new Image();
  treasure.src = treasure_src;
  // let imageWidth = window.innerWidth;
  // let imageHeight = (imageWidth * 1080) / 1920;


  let clickX = 0;
  let clickY = 0;
  let mousePoint = new DOMPoint(0,0);

  let gridIncrement = 10
  let gridLinesSize = 10000

  let currentLevel = 0;

  let movingItemsFactor = 0;
  let movingItemsFactorIncrement = 0.08;


  let a = new Quest(questsRepo, 1640, 1080);
  let b = new Quest(questsRepo, 1540, 1180);
  let c = new Quest(questsRepo, 640, 1280);
  let d = new Quest(questsRepo, 1540, 1090);
  let e = new Quest(questsRepo, 1440, 1080);
  let f = new Quest(questsRepo, 3080, 1740);
  console.log(questsRepo);




  function draw()
  {

      // Fait monter et descendre le mooving item factor
      movingItemsFactor += movingItemsFactorIncrement


      // Ca c´est cool ca veut dire qu´ on adapte en temps réel le canvas par rapport à la taille de l´ecran
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      ctx.fillStyle = "#45C4C7";
      drawRect(0,0, window.innerWidth, window.innerHeight)

      // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
      ctx.translate( window.innerWidth / 2, window.innerHeight / 2 ); // Le point d´origine du canvas est au centre de la window
      ctx.scale(cameraZoom, cameraZoom);
      ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y ); // reajustement après scale

      // ctx.drawImage(island,0 ,0 , imageWidth , imageHeight); // CAS OU ON GARDE L´IMAGE A UNE TAILLE FIXE ET REDIMMENSIONNE DIRECT APRES

      // On peint les 16 images de l´île---------
      ctx.drawImage(island_00, 0 ,0 , imageWidth , imageHeight);
      // ctx.drawImage(island_01, imageWidth , 0 , imageWidth , imageHeight);
      // ctx.drawImage(island_02, imageWidth * 2, 0 , imageWidth , imageHeight);
      // ctx.drawImage(island_03, imageWidth * 3, 0 , imageWidth , imageHeight);

      // ctx.drawImage(island_10, 0, imageHeight , imageWidth , imageHeight);
      // ctx.drawImage(island_11, imageWidth, imageHeight , imageWidth , imageHeight);
      // ctx.drawImage(island_12, imageWidth * 2, imageHeight , imageWidth , imageHeight);
      // ctx.drawImage(island_13, imageWidth * 3, imageHeight , imageWidth , imageHeight);

      // ctx.drawImage(island_20, 0, imageHeight * 2 , imageWidth , imageHeight);
      // ctx.drawImage(island_21, imageWidth, imageHeight * 2, imageWidth , imageHeight);
      // ctx.drawImage(island_22, imageWidth * 2, imageHeight * 2, imageWidth , imageHeight);
      // ctx.drawImage(island_23, imageWidth * 3, imageHeight * 2, imageWidth , imageHeight);

      // ctx.drawImage(island_30, 0, imageHeight * 3 , imageWidth , imageHeight);
      // ctx.drawImage(island_31, imageWidth, imageHeight * 3, imageWidth , imageHeight);
      // ctx.drawImage(island_32, imageWidth * 2, imageHeight * 3, imageWidth , imageHeight);
      // ctx.drawImage(island_33, imageWidth * 3, imageHeight * 3, imageWidth , imageHeight);


      // drawGrid();

      ctx.fillStyle = "#EA3424";
      drawMouseRec();

      questsRepo.forEach(quest => quest.drawSelfAndMove(ctx, treasure, movingItemsFactor));
      questsRepo.forEach(quest => quest.drawSurroundingCircle(ctx));

      requestAnimationFrame( draw ) // Ca veut dire que ca tourne en boucle/ On redraw à chaque FPS
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

  function drawMouseRec(){

    // Le mouse point est calculé à chaque mouvement de souris
    let mouseTranslated = translateFromRealToCanvas(mousePoint)

    let paintedX = Math.floor(mouseTranslated.x / gridIncrement) * gridIncrement
    let paintedY = Math.round(mouseTranslated.y / gridIncrement) * gridIncrement

    drawRect( paintedX, paintedY, gridIncrement , gridIncrement)

    redSquareInfo.innerHTML = `<p>Red Square Position :</p><p>(x , y) => (${paintedX}, ${paintedY})</p>`

  }


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

    ctx.fillStyle = "#000000";

    for(let i = -gridLinesSize; i < 10000;  i += gridIncrement){

      ctx.beginPath();
      ctx.moveTo(i, - gridLinesSize);
      ctx.lineTo(i, gridLinesSize);
      ctx.stroke();
    }

    for(let j = -gridLinesSize; j < 10000;  j += gridIncrement){
      ctx.beginPath();
      ctx.moveTo(-gridLinesSize, j);
      ctx.lineTo(gridLinesSize, j);
      ctx.stroke();
    }
  }

  function drawRect(x, y, width, height)
  {
      ctx.fillRect( x, y, width, height )
  }

  function drawText(text, x, y, size, font)
  {
      ctx.font = `${size}px ${font}`
      ctx.fillText(text, x, y)
  }



  function focusOnObject(x, y, zoom, additionalOffset = 0){
    // si on veut offset pour centrer sur l´objet on peut mais c´est un argument optionnel
    cameraZoom = zoom
    cameraOffset = {x: - x + window.innerWidth / 2 - additionalOffset , y: - y + window.innerHeight / 2 - additionalOffset}
  }


  function setToLevel(level){


    // LEVELS DETERMINED IF THE IMAGE IS PAINTED ALWAYS AT SAME SIZE AND SAME COORDINATES WHATEVER THE SCREEN
    switch(level){
      case 0:
        focusOnObject(0.5  * 3840 , 0.5 * 2160, 0.2)
        break;
      case 1:
        focusOnObject(3040,1910,1)
        break;
      case 2:
        focusOnObject(2954,1602,1)
        break;
      case 3:
        focusOnObject(2550,1670,1)
        break;
      case 4:
        focusOnObject(2060,1660,1)
        break;
      case 5:
        focusOnObject(2190,1340,1)
        break;
      case 6:
        focusOnObject(2290,930,1)
        break;
      case 7:
        focusOnObject(1870,820,1)
        break;
      case 8:
        focusOnObject(1570,1030,1)
        break;
      case 9:
        focusOnObject(1230,1020,1)
        break;
      case 10:
        focusOnObject(890,860,1)
        break;
      case 11:
        focusOnObject(1280,590,1)
        break;
      case 12:
        focusOnObject(750,440,1)
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
//
      // console.log(`offset x : ${cameraOffset.x - (window.innerWidth / 2)} - offset y : ${cameraOffset.y - (window.innerHeight / 2)}`);

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

  }

  function onPointerUp(e)
  {
      isDragging = false
      initialPinchDistance = null
      lastZoom = cameraZoom
  }

  function onPointerMove(e)
  {

      mousePoint.x = getEventLocation(e).x
      mousePoint.y = getEventLocation(e).y


      if (isDragging)
      {
          cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
          cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
      }else{
        // Section ajoutée par Tim pour déterminer les coordonnées du monde réel
        questsRepo.forEach(quest => quest.isUnderMouse(translateFromRealToCanvas(mousePoint).x, translateFromRealToCanvas(mousePoint).y, ctx));
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
      let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2;

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
  setToLevel(0)
}

function inCircle(xRef,yRef,radiusRef){
  if(Math.pow((relativeX-xRef),2)+Math.pow((relativeY-yRef), 2)<Math.pow(radiusRef,2)){
    return true;
  }else{
    return false;
  }
}

function inSquare(xRef,yRef,radiusRef){

  // Checker si adaptée en négatif
  let  horiS=false;
  let  vertiS=false;

  let leftS = xRef-radiusRef;
  let rightS = xRef+radiusRef;
  let topS = yRef-radiusRef;
  let bottomS = yRef+radiusRef;

  if((relativeX>=leftS) && (relativeX<=rightS)){horiS=true;}else{horiS=false;}
  if((relativeY>=topS) && (relativeY<=bottomS)){vertiS=true;}else{vertiS=false;}
  if((horiS==true)&&(vertiS==true)){return true;}else{return false;}
}

export{gameController};

