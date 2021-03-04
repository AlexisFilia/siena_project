const timTests = () => {

  // ce qu´ on aimerait avoir c´est google map : scroll to zoom et click to pan
  // Sachant qu' on veut que des images soient posées dessus et clickables
  // What about une iframe d´une page déjá faite sans zoom?
  // Le canvas risque detre mega complexe nan??
  // https://gist.github.com/dzhang123/2a3a611b3d75a45a3f41 et http://phrogz.net/tmp/canvas_zoom_to_cursor.html


  let canvas = document.getElementById("my-canvas");
  if(!canvas) return;

  //get DPI (blurry canvas shit)
  let dpi = window.devicePixelRatio;

  // Get context
  let ctx = canvas.getContext('2d'); // Le truc pour manipuler l´ interieur du canvas
  // ctx.imageSmoothingEnabled = false;

  // Dimensions du canvas
  let canvasWidth = canvas.getBoundingClientRect().width; // Fonctionne avec resize de lecran
  let canvasHeight = canvas.getBoundingClientRect().height; // Fonctionne avec resize de lecran
  // let canvasWidth = canvas.width;
  // let canvasHeight = canvas.height;

  // Les images en preload
  let island = new Image();
  let treasure = new Image();
  island.src = "/assets/bigpic.png";
  treasure.src = "/assets/treasure.png";

  // la taille de l' image de base (7680 x 4320)
  let desiredWidth = 1920 / 1.5;
  let desiredHeight = 1080 / 1.5;

  // Des variables pour le mouvement de souris
  let x = 0,
      y = 0,
      offsetX = 0,
      offsetY = 0,
      relativeX = canvas.width/2,
      relativeY = canvas.height/2;

  // Variables de zoom
  // let zoom = 0; // En mode 100%
  let scaleFactor = 1.1;

  // Drag
  let dragStart, dragged;
  // let dragEnd;

  let clicks = 0;

  // LA BASE --------------------------------------------------------------------------------------------------


  // La fonction qui fixe le côté flou on ne sait trop comment
  const fix_dpi = () => {
    // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
    //get CSS height //the + prefix casts it to an integer //the slice method gets rid of "px" //get CSS width //scale the canvas
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
  }

  const redraw = () => {
    // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage
    // ctx.drawImage(image, dx, dy, dLargeur, dHauteur); les deux derniers sont optionnels
    // ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur); ==> Probablement la version qu`il nous faudra!

    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    // ctx.fillStyle = "#45C4C7";
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(island,0 ,0 , desiredWidth , desiredHeight);
    // ctx.drawImage(treasure, 500 , 500, 512/10, 451/10);
    // ctx.clearRect(0,0, canvasWidth, canvasHeight);
    // ctx.beginPath();
    // ctx.rect(20, 20, 50, 50);
    // ctx.stroke();


  }

  const init = () => {
    console.log(canvasWidth);
    // fix_dpi();
    console.log(canvasWidth);

    redraw();

  }

  island.addEventListener("load", (e) => {
    // image loadée
    init();
  });




  canvas.addEventListener("mousemove", (e) => {
    relativeX = e.clientX - canvas.getBoundingClientRect().left;;
    relativeY = e.clientY - canvas.getBoundingClientRect().top;;
    // console.log(relativeX);
  });



  canvas.addEventListener("click", (e) => {
    console.log("yo");

    clicks += 1;

    ctx.scale(0.9, 0.9);
    // redraw();

    ctx.clearRect(0,0, canvasWidth / Math.pow(0.9, clicks), canvasHeight / Math.pow(0.9, clicks));

    // ctx.drawImage(island, 0 , 0 , desiredWidth , desiredHeight);
    ctx.drawImage(island, (canvasWidth / Math.pow(0.9, clicks) -  0.9 *  canvasWidth) / 2 , (canvasHeight / Math.pow(0.9, clicks) - 0.9 *  canvasHeight) / 2 , desiredWidth , desiredHeight);

    ctx.beginPath();
    // ctx.rect(0, 0, (canvasWidth - 10) / Math.pow(0.9, clicks) , (canvasHeight - 10) / Math.pow(0.9, clicks));
    ctx.stroke();
    console.log(canvasWidth);
  });







  // let zoom = (clicks) => {

  //   let factor = Math.pow(scaleFactor,clicks);
  //   ctx.scale(factor, factor);
  //   ctx.translate(-relativeX,-relativeY);
  //   redraw();
  // }


  // // Event listeners sur le canvas --------------------------------------------------------------------------------------------------


  // // canvas.addEventListener("DOMMouseScroll", (e) => {
  // //   console.log("DOMMouseScroll?");
  // // });

  // canvas.addEventListener("mousewheel", (e) => {
  //   // Celui ci a l`air de marcher pour moi
  //   // Regarde à l´intérieur de l´event, en plus du delta ya les infos si shift ou ctrl pressed
  //   // e.preventDefault; // MARCHE PAS TROP CA
  //   let delta = e.wheelDelta ? e.wheelDelta/40 : e.detail ? -e.detail : 0;
  //   zoom(delta);
  //   return e.preventDefault() && false;

  // });


  // canvas.addEventListener("mousemove", (e) => {
  //   //console.log("Mouse move...");

  //   relativeX = e.offsetX || (e.pageX - canvas.offsetLeft);
  //   relativeY = e.offsetY || (e.pageY - canvas.offsetTop);
  //   dragged = true;

  //   if (dragStart){
  //     ctx.translate(relativeX - dragStart[0],relativeY -dragStart[1]);
  //     redraw();
  //   }

  // });

  // canvas.addEventListener('mousedown',(e) => {
  //   document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
  //   relativeX = e.offsetX || (e.pageX - canvas.offsetLeft);
  //   relativeY = e.offsetY || (e.pageY - canvas.offsetTop);
  //   dragStart = [relativeX,relativeY];
  //   dragged = false;
  // },false);


  // canvas.addEventListener('mouseup',(e) => {
  //   dragStart = null;
  //   if (!dragged) zoom(e.shiftKey ? -1 : 1 );
  // },false);


}

export{timTests};
