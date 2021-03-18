class Quest {
  constructor(questsRepo, x, y) {

    this.index = questsRepo.length;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.center = new DOMPoint(this.x + this.width / 2, this.y + this.height /2);
    this.radius = 40;
    this.mouseOver = false;

    questsRepo.push(this); // Adding self to the repository(array) of quests

  };

  drawSelf(ctx,img){
    ctx.drawImage(img, this.x, this.y, this.width ,this.height);
  };

  drawSelfAndMove(ctx,img, movingFactor){
    ctx.drawImage(img, this.x, this.y + Math.sin(movingFactor) * 10, this.width, this.height)
  };

  drawSurroundingCircle(ctx){

    if(!this.mouseOver){
      let previousStrokeStyle = ctx.strokeStyle; // Pour ne pas changer la couleur via la fonction
      ctx.strokeStyle = "#EA3424";
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.strokeStyle = previousStrokeStyle;
    }else{
      let previousStrokeStyle = ctx.strokeStyle; // Pour ne pas changer la couleur via la fonction
      let previousFillStyle = ctx.fillStyle; // Pour ne pas changer la couleur via la fonction
      ctx.strokeStyle = "green";
      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.strokeStyle = previousStrokeStyle;
      ctx.fillStyle = previousFillStyle;
    }
  }

  isUnderMouse(translatedMouseX, translatedMouseY, ctx){
    // Check if the mouse is in the circle of a specific radius around self

    if(Math.pow((translatedMouseX - this.center.x), 2) + Math.pow((translatedMouseY - this.center.y), 2) < Math.pow(this.radius, 2)){
      this.mouseOver = true;
      console.log(this);
    }else{
      this.mouseOver = false;
      // return false;
    }
  };



};

// function

export{Quest}




// function inCircle(xRef,yRef,radiusRef){
//   if(Math.pow((relativeX-xRef),2)+Math.pow((relativeY-yRef), 2)<Math.pow(radiusRef,2)){
//     return true;
//   }else{
//     return false;
//   }
// }
