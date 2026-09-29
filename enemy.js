/*
following variables are global and defined in sketch.js:
floorPos_y is global variable from sketch.js
enemy_left_img
enemy_right_img
huntedSound
*/

function Enemy(leftLimit, rightLimit,)
{
    this.x = random(leftLimit, rightLimit);
    this.y = floorPos_y-25
    this.isRight = true;
    this.speed = 3;
    this.rightLimit= rightLimit;
    this.leftLimit = leftLimit;
    this.scale = .7;
    
    this.checkEnemyVsCharacter = ()=>
    {
        if ( dist(gameChar_x,gameChar_y-50,this.x, this.y) < 90*this.scale)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    this.updateEnemy = ()=>
    {
        this.x += this.speed;
        if ( this.x >=  rightLimit || this.x < leftLimit)
        {
            this.speed = -(this.speed);
            this.isRight = !this.isRight;
        }
    }
    this.drawEnemy= ()=>
    {
        if (this.isRight)
        {
            angleMode(DEGREES);
            ellipseMode(CENTER);
            //legs
            stroke(0);
            strokeWeight(3);
            line(this.x+45*this.scale,this.y+10*this.scale,this.x+60*this.scale,this.y+20*this.scale);
            line(this.x+42*this.scale,this.y+15*this.scale,this.x+45*this.scale,this.y+30*this.scale);
            line(this.x-10*this.scale,this.y+25*this.scale,this.x+0*this.scale,this.y+35*this.scale);
            line(this.x-15*this.scale,this.y+25*this.scale,this.x-25*this.scale,this.y+32*this.scale);
            //paws
            fill(10,10,10)
            stroke(80);
            strokeWeight(2);
            ellipse(this.x+60*this.scale,this.y+20*this.scale,20*this.scale,10*this.scale);
            ellipse(this.x+45*this.scale,this.y+30*this.scale,20*this.scale,10*this.scale);
            ellipse(this.x-0*this.scale,this.y+35*this.scale,20*this.scale,10*this.scale);
            ellipse(this.x-25*this.scale,this.y+32*this.scale,20*this.scale,10*this.scale);
            //body
            strokeWeight(3);
            stroke(0);
            fill(10,10,10)
            ellipse(this.x,this.y,100*this.scale,50*this.scale);
            //head
            ellipse(this.x+37*this.scale,this.y-40*this.scale,60*this.scale,35*this.scale);
            //ears
            arc(this.x+35*this.scale,this.y-60*this.scale,15*this.scale,25*this.scale,160,0);
            arc(this.x+55*this.scale,this.y-55*this.scale,15*this.scale,25*this.scale,200,30);
            //eye
            noStroke();
            fill(255,255,0);
            ellipse(this.x+34*this.scale,this.y-45*this.scale,15*this.scale,6*this.scale);
            ellipse(this.x+49*this.scale,this.y-45*this.scale,15*this.scale,6*this.scale);
            fill(0);
            ellipse(this.x+36*this.scale,this.y-45*this.scale,8*this.scale,6*this.scale);
            ellipse(this.x+51*this.scale,this.y-45*this.scale,8*this.scale,6*this.scale);
            //nose
            stroke(80);
            strokeWeight(2);
            fill(80);
            ellipse(this.x+42.5*this.scale,this.y-35*this.scale,5*this.scale,5*this.scale);
            line(this.x+42.5*this.scale,this.y-35*this.scale,this.x+42.5*this.scale,this.y-30*this.scale);
            noFill();
            arc(this.x+42.5*this.scale,this.y-35*this.scale,15*this.scale,10*this.scale,20,160);
            //tail
            push();
                stroke(0);
                strokeWeight(3);
                translate(this.x-70*this.scale,this.y+5*this.scale);
                rotate(-25);
                fill(10,10,10);
                ellipse(0,0,50*this.scale,20*this.scale);
	        pop();
        }
        else
        {
            angleMode(DEGREES);
            ellipseMode(CENTER);
            //legs
            stroke(0);
            strokeWeight(3);
            line(this.x-45*this.scale,this.y+10*this.scale,this.x-60*this.scale,this.y+20*this.scale);
            line(this.x-42*this.scale,this.y+15*this.scale,this.x-45*this.scale,this.y+30*this.scale);
            line(this.x+10*this.scale,this.y+25*this.scale,this.x-0*this.scale,this.y+35*this.scale);
            line(this.x+15*this.scale,this.y+25*this.scale,this.x+25*this.scale,this.y+32*this.scale);
            //paws
            fill(10,10,10)
            stroke(80);
            strokeWeight(2);
            ellipse(this.x-60*this.scale,this.y+20*this.scale,20*this.scale,10*this.scale);
            ellipse(this.x-45*this.scale,this.y+30*this.scale,20*this.scale,10*this.scale);
            ellipse(this.x-0*this.scale,this.y+35*this.scale,20*this.scale,10*this.scale);
            ellipse(this.x+25*this.scale,this.y+32*this.scale,20*this.scale,10*this.scale);
            //body
            strokeWeight(3);
            stroke(0);
            fill(10,10,10)
            ellipse(this.x,this.y,100*this.scale,50*this.scale);
            //head
            ellipse(this.x-37*this.scale,this.y-40*this.scale,60*this.scale,35*this.scale);
            //ears
            arc(this.x-35*this.scale,this.y-60*this.scale,15*this.scale,25*this.scale,160,10);
            arc(this.x-55*this.scale,this.y-55*this.scale,15*this.scale,25*this.scale,160,-30);
            //eyes
            noStroke();
            fill(255,255,0);
            ellipse(this.x-34*this.scale,this.y-45*this.scale,15*this.scale,6*this.scale);
            ellipse(this.x-49*this.scale,this.y-45*this.scale,15*this.scale,6*this.scale);
            fill(0);
            ellipse(this.x-36*this.scale,this.y-45*this.scale,8*this.scale,6*this.scale);
            ellipse(this.x-51*this.scale,this.y-45*this.scale,8*this.scale,6*this.scale);
            //nose
            stroke(80);
            strokeWeight(2);
            fill(80);
            ellipse(this.x-42.5*this.scale,this.y-35*this.scale,5*this.scale,5*this.scale);
            line(this.x-42.5*this.scale,this.y-35*this.scale,this.x-42.5*this.scale,this.y-30*this.scale);
            noFill();
            arc(this.x-42.5*this.scale,this.y-35*this.scale,15*this.scale,10*this.scale,20,160);
            //tail
            push();
                stroke(0);
                strokeWeight(3);
                translate(this.x+70*this.scale,this.y+5*this.scale);
                rotate(25);
                fill(10,10,10);
                ellipse(0,0,50*this.scale,20*this.scale);
            pop();
        }
    }
}
	
