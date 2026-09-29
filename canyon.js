/*Following variables are global variables from sketch.js
 floorPos_y
 gameChar_x
 gameChar_y
*/
function Canyon(x, holeSize)
{
  this.x = x;
  this.y = floorPos_y+2;
  this.holeSize = holeSize;

  this.drawCanyon = ()=>
  {
    noStroke();
    fill(199,203,210);
    beginShape();
    vertex(this.x-this.holeSize/2,this.y);
    vertex(this.x-this.holeSize/1.1,this.y+40);
    vertex(this.x-this.holeSize/1.6,this.y+57);
    vertex(this.x-this.holeSize/0.94,this.y+158);
    vertex(this.x+this.holeSize/1.2,this.y+158);
    vertex(this.x+this.holeSize/3.4,this.y+82);
    vertex(this.x+this.holeSize/1.12,this.y+80);
    vertex(this.x+this.holeSize/2,this.y);
    endShape();
  }
  this.checkCanyon = ()=>
  {
    // if the charecter is on the canyon, it will be plummeted to the bottom of the canyon and it cannot move right or left
    if( gameChar_x > this.x-this.holeSize/2 && gameChar_x < this.x+this.holeSize/2 && gameChar_y >= floorPos_y)
    {
      return true;
    }
    return false;
  }
    
}