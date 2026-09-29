function Tree( x, y ,scale)
{
  this.x = x;
  this.y = y;
  this.scale = scale;
  this.leavesColor = [0,225 + random(-50,50),0]
  this.trunkColor = [0, 125 + random(-50,50),0]

  this.drawTree = ()=>
  {
    noStroke();
    fill(this.trunkColor);
    quad(this.x-(15*this.scale),this.y, this.x+(15*this.scale),this.y, this.x+(10*this.scale),this.y-(60*this.scale), this.x-(10*this.scale),this.y-(60*this.scale));
    fill(this.leavesColor);
    ellipse(this.x-(10*this.scale),this.y-(72*this.scale), (30*this.scale),(30*this.scale));
    ellipse(this.x-(25*this.scale),this.y-(79*this.scale), (40*this.scale),(40*this.scale));
    ellipse(this.x-(20*this.scale),this.y-(102*this.scale), (40*this.scale),(40*this.scale));
    ellipse(this.x+(20*this.scale),this.y-(102*this.scale), (40*this.scale),(40*this.scale));
    ellipse(this.x+(11*this.scale),this.y-(72*this.scale), (30*this.scale),(30*this.scale));
    ellipse(this.x+(27*this.scale),this.y-(79*this.scale), (40*this.scale),(40*this.scale));
    ellipse(this.x,this.y-(107*this.scale), (40*this.scale),(60*this.scale));
  }
}