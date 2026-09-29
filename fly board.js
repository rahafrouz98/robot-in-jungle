/*Following variables are global variables from sketch.js
floorPos_y
height
gameChar_x;
gameChar_y;
game_scenery_height
*/
function FlyBoard(x,y)
{
  this.x = x;
  this.y = y;
  this.speedY = -6;
  this.speedX = 0;
  this.isRising = true;
  this.exhaustRight = new Exhaust(this.x +45, this.y+30, this.speedX,this.speedY, this.isRising);
  this.exhaustLeft = new Exhaust(this.x -40, this.y+30, this.speedX,this.speedY, this.isRising);

  this.drawFlyBoard = ()=>
  {
    push()
  
      fill(0); 
       //left exhaust
      quad(this.x-45,this.y+15,this.x-35,this.y+15,this.x-35,this.y+40,this.x-45,this.y+40)
      quad(this.x-35,this.y+40,this.x-45,this.y+40, this.x-50,this.y + 45,this.x-30,this.y + 45)
      //right exhaust
      quad(this.x+40,this.y+15,this.x+50,this.y+15,this.x+50,this.y+40,this.x+40,this.y+40)
      quad(this.x+50,this.y+40,this.x+40,this.y+40, this.x+35,this.y+45, this.x+55,this.y+45)
      //body
      ellipseMode(CENTER);
      rectMode(CENTER);
      fill(192, 192, 192); 
      stroke(0)
      strokeWeight(1)
      ellipse(this.x, this.y+20, 120, 40); 
      rect(this.x, this.y+10, 120, 20);

      this.exhaustLeft.emitSmoke();
      this.exhaustRight.emitSmoke();

      //update fly board location
      this.y += this.speedY;
      this.x += this.speedX;
      //update exaust location
      this.exhaustLeft.x = this.x - 40;
      this.exhaustRight.x = this.x + 45;
      this.exhaustLeft.y = this.y + 30;
      this.exhaustRight.y = this.y + 30;


    pop()
  }

  this.checkFlyBoardPosition = ()=>
  {
    if ( (this.isRising && this.y < -(game_scenery_height-height)*2/3 )|| (!this.isRising && this.y >  floorPos_y-100))
    {
      this.isRising = !this.isRising;
      //I used abs() function here so i can change the speed only by adjusting this.speedY
      if ( this.isRising)
      {
        this.speedY = -abs(this.speedY)
      }
      else if (!this.isRising)
      {
        this.speedY = abs(this.speedY)
      }
  
      this.exhaustLeft = new Exhaust(this.x -40, this.y+45,this.speedX, this.speedY, this.isRising);
      this.exhaustRight = new Exhaust(this.x +45, this.y+45,this.speedX, this.speedY, this.isRising);
    }
  }

  this.checkFlyBoardContact = ()=>
  {
      if(gameChar_x > this.x-70 && gameChar_x < this.x+70 &&
          gameChar_y < this.y+17&& gameChar_y > this.y -17 )
      {
        return true;
      }
        return false;
  }
}

function Exhaust(x,y,speedX,speedY,isRising)
{
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.smoke = [];
  this.isRising = isRising;
  
  this.emitSmoke = ()=>
  {
    let smoke_volume = 0
    if ( this.isRising)
    {
      smoke_volume = 100;
    }
    else
    {
      smoke_volume = 50;
    }
    if (this.smoke.length == 0)
    {
      for( i = 0; i < smoke_volume; i++)
      {
        let speedYAdjust = 0;
        if (this.isRising)
        {
          speedYAdjust=random(5,10);
        }
        else
        {
          speedYAdjust=random(.5,2);
        }
        this.smoke.push(new SmokeParticle(this.x+random(-5,5), this.y+20, this.speedX + random(-0.1,0.1), this.speedY + speedYAdjust))
      }
      
    }
    for (i = 0; i< this.smoke.length; i++)
    {
      this.smoke[i].updateSmokeParticle();
      if (this.smoke[i].smokeParticleColor[3] < 2)
      {
        let speedYAdjust = 0;
        if (this.isRising)
        {
          speedYAdjust=random(2,4);
        }
        else
        {
          speedYAdjust=random(.5,2);
        }
        this.smoke.splice(i,1);
        this.smoke.push(new SmokeParticle(this.x+random(-5,5), this.y+20, this.speedX + random(-0.1,0.1), this.speedY + speedYAdjust ))
      }
    }
    for (i = 0; i< this.smoke.length; i++)
    {
      this.smoke[i].drawSmokeParticle();
    }
   
    
  }
}
function SmokeParticle(x,y,speedX,speedY)
{
  this.x = x;
  this.y = y;
  this.speedX = speedX;
  this.speedY = speedY;
  this.age = 0;
  this.smokeParticleColor = [255,255,0,255]

  this.updateSmokeParticle = ()=>
  {
    this.age++;
    this.x += speedX;
    this.y += speedY;
    let alpha = map(this.age,0,10, 255,0);
    this.smokeParticleColor[3] = alpha
  }
  this.drawSmokeParticle = ()=>
  {
    push();
      fill(this.smokeParticleColor);
      noStroke();
      ellipse(this.x,this.y,3);
    pop();
  }

}