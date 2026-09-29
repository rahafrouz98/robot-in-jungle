/*Following variables are global variables from sketch.js
 gameChar_x
 gameChar_y
*/
function Collectable(x,y)
{
  this.x = x;
  this.y = y;
  this.size = 30;
  this.isFound = false

  this.drawCollectable = ()=>
  {
    if(this.isFound == false)
    {
      stroke(100,180,0);
      strokeWeight(this.size*0.12);
      fill(255,215,0);
      push();
      rectMode(CENTER);
      rect(this.x,this.y, this.size*1.2,this.size*.8,this.size*0.20 );
      rect(this.x,this.y-this.size/2+this.size*0.20, this.size*1.4,this.size*0.2);
      fill(100,180,0)
      stroke(100,180,0)
      rect(this.x-this.size/3,this.y-this.size/2, this.size*.3,this.size*.2);
      rect(this.x+this.size/3,this.y-this.size/2, this.size*.3,this.size*.2);
      strokeWeight(this.size*0.05);
      textSize(this.size*0.4);
      textAlign(CENTER,CENTER);
      stroke(0,0,0);
      text("+",this.x-this.size/3,this.y-this.size/2 )
      text("-",this.x+this.size/3,this.y-this.size/2 )
      pop();
    }
  }
  this.checkCollectable= ()=>
  {
    //if charrecter is on the collectable for the first time, the function returns true,
    if(dist(gameChar_x,gameChar_y-32, this.x, this.y) < 40 && !this.isFound)
    {
        return true;
    }
    return false;
  }
}