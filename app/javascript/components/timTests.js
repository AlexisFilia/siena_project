const timTests = () => {

  // ce qu´ on aimerait avoir c´est google map : scroll to zoom et click to pan
  // Sachant qu' on veut que des images soient posées dessus et clickables
  // What about une iframe d´une page déjá faite sans zoom?
  // Le canvas risque detre mega complexe nan??
  // http://phrogz.net/tmp/canvas_zoom_to_cursor.html


  let canvas = document.getElementById("my-canvas");
  if(!canvas) return;

  //get DPI (blurry canvas shit)
  let dpi = window.devicePixelRatio;

  // Get context
  let ctx = canvas.getContext('2d'); // Le truc pour manipuler l´ interieur du canvas
  // ctx.imageSmoothingEnabled = false;

  // Les images en preload
  let island = new Image();
  let treasure = new Image();
  island.src = "/assets/bigpic.png";
  treasure.src = "/assets/treasure.png";

  // Des variables pour le mouvement de souris
  let x = 0,
      y = 0,
      offsetX = 0,
      offsetY = 0,
      relativeX = 0,
      relativeY = 0;


  const fix_dpi = () => {
    // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
  }


  island.addEventListener("load", (e) => {
    // image loadée
    // https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage
    // ctx.drawImage(image, dx, dy, dLargeur, dHauteur); les deux derniers sont optionnels
    // ctx.drawImage(image, sx, sy, sLargeur, sHauteur, dx, dy, dLargeur, dHauteur); ==> Probablement la version qu`il nous faudra!

    let canvasWidth = canvas.getBoundingClientRect().width;
    let canvasHeight = canvas.getBoundingClientRect().height;
    // let canvasWidth = canvas.width;
    // let canvasHeight = canvas.height;
    fix_dpi();
    let desiredWidth = 1920 ;
    let desiredHeight = 1080;


    ctx.drawImage(island,0 ,0 , desiredWidth , desiredHeight);
  });

  //island.onload = function(){console.log("j´ai lile");}

  canvas.addEventListener("DOMMouseScroll", (e) => {
    console.log("DOMMouseScroll?");
  });

  canvas.addEventListener("mousewheel", (e) => {

    // Celui ci a l`air de marcher pour moi
    // Regarde à l´intérieur de l´event, en plus du delta ya les infos si shift ou ctrl pressed

    e.preventDefault;
    // console.log(e);
  });


  canvas.addEventListener("mousemove", (e) => {
    //console.log("Mouse move...");

    // Position de la souris sur l´ écran
    x = event.clientX;
    y = event.clientY;

    // Position du canvas à l`écran`
    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;

    // Position de la souris par rapport au canvas
    relativeX = x - offsetX;
    relativeY = y - offsetY;

    // console.log(y);



  });
}

export{timTests};
