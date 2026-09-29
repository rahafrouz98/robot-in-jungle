/*
following variables are global and defined in sketch.js:
current_level ,
reached_time, 
game_level_length floorPos_y
game_scenery_height
*/
function BeamLight()
{
  this.x = current_level_start_x + game_level_length;
  this.y = floorPos_y+10;
  this.scale =  .7;
  this.isReached = false;
  this.beamLevel = current_level;
  //isRecentlyReached is used to identify if the characterhas recently reached the beam light or not. I use it
  //to prevent the beamLightFailSound from playing continuously.
  this.isRecentlyReached = false;

  this. drawBeamLight = ()=>
  {
    fill(0,0,139)
    rect(this.x,this.y, 20*this.scale, -40*this.scale);
    quad(this.x, this.y-(40*this.scale), 
          this.x-(6*this.scale),this.y-(60*this.scale),
            this.x+(26*this.scale), this.y-(60*this.scale), 
              this.x+(20*this.scale), this.y-(40*this.scale));
   
    if (this.isReached)
    {
      fill(255,255,0,100);
      noStroke();
      quad(this.x-(6*this.scale),this.y-(60*this.scale),
            this.x-(50*this.scale),-(game_scenery_height-height),
              this.x+(70*this.scale),-(game_scenery_height-height),
                this.x+(26*this.scale),this.y-(60*this.scale));
    }
  }
  this.checkBeamLight = ()=>
  {
    //if the charechter is reached to the beam light for the first time, it turns true.
    if(dist(gameChar_x, gameChar_y, this.x, this.y) < 30 && !this.isReached )
    {
      return true;
    }
    return false;
  }
}