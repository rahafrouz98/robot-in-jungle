//floorPos_y is global variable from sketch.js
function Mountain( x, scale)
{
    this.x = x;
    this.y = floorPos_y;
    this.scale = scale;
    this.mountainColor = [90+random(-10,10), 130+random(-10,10), 170+random(-10,10)]

    this.drawMountain = ()=>
    {
        noStroke();
        fill(this.mountainColor);
		beginShape();
		vertex(this.x,this.y);
		vertex(this.x+this.scale*93,this.y-this.scale*193);
		vertex(this.x+this.scale*130,this.y-this.scale*133);
		vertex(this.x+this.scale*151,this.y-this.scale*163);
		vertex(this.x+this.scale*270,this.y);
		endShape();
        //drawpeak
		fill(255,255,255);
		triangle(this.x+this.scale*93,this.y-this.scale*193, 
			this.x+this.scale*78, this.y-this.scale*161, 
			this.x+this.scale*117,this.y-this.scale*155);
		triangle(this.x+this.scale*151,this.y-this.scale*163
			,this.x+this.scale*137,this.y-this.scale*143,
			this.x+this.scale*164,this.y-this.scale*145);		
    }

}