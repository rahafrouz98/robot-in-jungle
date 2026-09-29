
/*Following variables are global variables from sketch.js
 gameChar_x
 gameChar_y
 isHunted
 hunted_time;
*/

//drawHunted is used when the gameCharacter is in contact with enemy
function drawHunted()
{
	strokeWeight(2);
	fill(255,255,255)
	stroke(0,0,0);
	push();
		angleMode(DEGREES);
		ellipseMode(CENTER);
		translate(gameChar_x,gameChar_y);
		let rotate_angle = min(map (2*(millis()-hunted_time), 0, 2000, 2,4.3),4.3);
		rotate(rotate_angle*rotate_angle*rotate_angle);
		push();
		translate(-1,-64);
		rotate((rotate_angle*rotate_angle*rotate_angle)*.75);
			//head
			ellipse(0, 0, 20,25);
			//Eyes and nose
			fill(0,0,0);
			ellipse(-7,-3,4,3);
			triangle(-13, 1, -10, -1, -10, 2);
		pop();
		//Body
		fill(255,200,0);
		rect(-5, -50, 10,25,5);
		// Feet and legs
		let animationScale = min(map (2*(millis()-hunted_time), 0, 2000, 20,60),60);
		line(-2,-25,-12,-30);
		line(-12,-30,-25,-30);
		line(+2 - animationScale/15,-25,+12- animationScale/2.5,-30-animationScale/15);
		line(+12 - animationScale/2.5,-30-animationScale/15,+25 - animationScale/1.2,-30-animationScale/15);
		ellipse(-30,-25,15,10);
		ellipse(+25-animationScale/1.2,-30-animationScale/15,15,10);
		//Arms
		fill(0,0,0);
		ellipse(0,-45,3,3);
		line(0, -45, -18,-50);
		line(0, -45, -16,-55);
		// left Hands
		fill(255,200,0);
		push();
			angleMode(DEGREES);
			translate(-18, -50);
			rotate(-10);
			ellipse(0,0,12,8);
		pop();
		// right Hands
		fill(255,200,0);
		push();
			angleMode(DEGREES);
			translate(-16,-55);
			rotate(-10);
			ellipse(0,0,12,8);
		pop();
	pop();
}
function drawJumpLeft()
{
	strokeWeight(2);
	fill(255,255,255);
	stroke(0,0,0);
	//head
	ellipse(gameChar_x-1, gameChar_y-64, 20,25);
	//Eyes and nose
	fill(0,0,0);
	ellipse(gameChar_x-7,gameChar_y-67,4,3);
	triangle(gameChar_x-13, gameChar_y-63, gameChar_x-10, gameChar_y-65, gameChar_x-10, gameChar_y-61);
	//Body
	fill(255,200,0);
	rect(gameChar_x-5, gameChar_y-50, 10,25,5);
	// Feet and legs
	line(gameChar_x-2,gameChar_y-25,gameChar_x-12,gameChar_y-30);
	line(gameChar_x-12,gameChar_y-30,gameChar_x-10,gameChar_y-25);
	line(gameChar_x+2,gameChar_y-25,gameChar_x+7,gameChar_y-19);
	line(gameChar_x+7,gameChar_y-19,gameChar_x+20,gameChar_y-14);
	ellipse(gameChar_x-14,gameChar_y-20,15,10);
	ellipse(gameChar_x+15,gameChar_y-12.5,15,10);
	//Arms
	fill(0,0,0)
	ellipse(gameChar_x,gameChar_y-45,3,3);
	line(gameChar_x, gameChar_y-45, gameChar_x-18,gameChar_y-50);
	line(gameChar_x, gameChar_y-45, gameChar_x-16,gameChar_y-55);
	// left Hands
	fill(255,200,0);
	push();
		angleMode(DEGREES);
		translate(gameChar_x-18, gameChar_y-50);
		rotate(-10);
		ellipse(0,0,12,8);
	pop();
	// right Hands
	fill(255,200,0);
	push();
		angleMode(DEGREES);
		translate(gameChar_x-16, gameChar_y-55);
		rotate(-10);
		ellipse(0,0,12,8);
	pop();
}
function drawJumpRight()
{
	strokeWeight(2);
	fill(255,255,255);
	stroke(0,0,0);
	//head
	ellipse(gameChar_x+1, gameChar_y-64, 20,25);
	//Eyes and nose
	fill(0,0,0);
	ellipse(gameChar_x+7,gameChar_y-67,4,3);
	triangle(gameChar_x+13, gameChar_y-63, gameChar_x+10, gameChar_y-65, gameChar_x+10, gameChar_y-61);
	fill(255,200,0);
	rect(gameChar_x-5, gameChar_y-50, 10,25,5);
	// Feet and legs
	line(gameChar_x+2,gameChar_y-25,gameChar_x+12,gameChar_y-30);
	line(gameChar_x+12,gameChar_y-30,gameChar_x+10,gameChar_y-25);
	line(gameChar_x-2,gameChar_y-25,gameChar_x-7,gameChar_y-19);
	line(gameChar_x-7,gameChar_y-19,gameChar_x-20,gameChar_y-14);
	ellipse(gameChar_x+14,gameChar_y-20,15,10);
	ellipse(gameChar_x-15,gameChar_y-12.5,15,10);
	//Arms
	fill(0,0,0);
	ellipse(gameChar_x,gameChar_y-45,3,3);
	line(gameChar_x, gameChar_y-45, gameChar_x+18,gameChar_y-50);
	line(gameChar_x, gameChar_y-45, gameChar_x+16,gameChar_y-55);
	// left Hands
	fill(255,200,0);
	push();
	angleMode(DEGREES);
	translate(gameChar_x+18, gameChar_y-50);
	rotate(-10);
	ellipse(0,0,12,8);
	pop();
	// right Hands
	fill(255,200,0);
	push();
		angleMode(DEGREES);
		translate(gameChar_x+16, gameChar_y-55);
		rotate(-10);
		ellipse(0,0,12,8);
	pop();
}
function drawWalkLeft()
{
	strokeWeight(2);
	fill(255,255,255);
	stroke(0,0,0);
	//Head
	ellipse(gameChar_x-1, gameChar_y-64, 20,25);
	//Eyes and nose
	fill(0,0,0);
	ellipse(gameChar_x-7,gameChar_y-67,4,3);
	triangle(gameChar_x-13, gameChar_y-63, gameChar_x-10, gameChar_y-65, gameChar_x-10, gameChar_y-61);
	//Body
	fill(255,200,0);
	rect(gameChar_x-5, gameChar_y-50, 10,25,5);
	//Feet and legs
	line(gameChar_x-2,gameChar_y-25,gameChar_x-13,gameChar_y);
	line(gameChar_x+2,gameChar_y-25,gameChar_x+6,gameChar_y-15);
	line(gameChar_x+6,gameChar_y-15,gameChar_x+20,gameChar_y);
	ellipse(gameChar_x-13,gameChar_y-2.5,15,10);
	ellipse(gameChar_x+15,gameChar_y-2.5,15,10);
	//Arms
	fill(0,0,0);
	ellipse(gameChar_x,gameChar_y-45,3,3);
	line(gameChar_x, gameChar_y-45, gameChar_x-16.5, gameChar_y-35 );
	// Hands
	fill(255,200,0);
	push();
		angleMode(DEGREES);
		translate(gameChar_x-16.5, gameChar_y-35);
		rotate(-20);
		ellipse(0,0,12,8);
	pop();	
}
function drawWalkRight()
{
	strokeWeight(2);
	fill(255,255,255);
	stroke(0,0,0);
	//head
	ellipse(gameChar_x+1, gameChar_y-64, 20,25);
	//Eyes and nose
	fill(0,0,0);
	ellipse(gameChar_x+7,gameChar_y-67,4,3);
	triangle(gameChar_x+13, gameChar_y-63, gameChar_x+10, gameChar_y-65, gameChar_x+10, gameChar_y-61);
	//Body
	fill(255,200,0);
	rect(gameChar_x-5, gameChar_y-50, 10,25,5);
	//feet and legs
	line(gameChar_x+2,gameChar_y-25,gameChar_x+13,gameChar_y);
	line(gameChar_x-2,gameChar_y-25,gameChar_x-6,gameChar_y-15);
	line(gameChar_x-6,gameChar_y-15,gameChar_x-20,gameChar_y);
	ellipse(gameChar_x+13,gameChar_y-2.5,15,10);
	ellipse(gameChar_x-15,gameChar_y-2.5,15,10);
	//Arms
	fill(0,0,0);
	ellipse(gameChar_x,gameChar_y-45,3,3);
	line(gameChar_x, gameChar_y-45, gameChar_x+16.5, gameChar_y-35 );
	// Hands
	fill(255,200,0);
	push();
		angleMode(DEGREES);
		translate(gameChar_x+16.5, gameChar_y-35);
		rotate(20);
		ellipse(0,0,12,8);
	pop();
}
function drawJumpForward()
{
	strokeWeight(2);
	fill(255,255,255);
	stroke(0,0,0);
	//Head
	ellipse(gameChar_x, gameChar_y-64, 45,25);
	fill(0,0,0);
	//Eyes and nose
	ellipse(gameChar_x-5,gameChar_y-67,4,4);
	ellipse(gameChar_x+5,gameChar_y-67,4,4);
	square(gameChar_x-2,gameChar_y-63,4);
	//Body
	fill(255,200,0);
	rect(gameChar_x-5, gameChar_y-50, 10,25,5);
	//Feet amd legs
	line(gameChar_x-2,gameChar_y-25,gameChar_x-12,gameChar_y-30);
	line(gameChar_x-12,gameChar_y-30, gameChar_x-14,gameChar_y-15,);
	line(gameChar_x+2,gameChar_y-25,gameChar_x+12,gameChar_y-30);
	line(gameChar_x+12,gameChar_y-30,gameChar_x+14,gameChar_y-15);
	ellipse(gameChar_x-16,gameChar_y-15,15,10);
	ellipse(gameChar_x+16,gameChar_y-15,15,10);
	//Arms
	line(gameChar_x-5, gameChar_y-45, gameChar_x-16.5, gameChar_y-45);
	line(gameChar_x+5, gameChar_y-45, gameChar_x+16.5, gameChar_y-45);
	//Right hand
	push();
		angleMode(DEGREES);
		translate(gameChar_x-15.6, gameChar_y-45);
		rotate(30);
		ellipse(-4,0,12,8);
	pop();
	//Left Hand
	push();
		angleMode(DEGREES);
		translate(gameChar_x+15.6, gameChar_y-45);
		rotate(-30);
		ellipse(4,0,12,8);
	pop();
}
function drawParachuting()
{

	strokeWeight(2);
	fill(255,255,255);
	stroke(0,0,0);
	//Head
	ellipse(gameChar_x, gameChar_y-64, 45,25);
	fill(0,0,0);
	//Eyes and nose
	ellipse(gameChar_x-5,gameChar_y-67,4,4);
	ellipse(gameChar_x+5,gameChar_y-67,4,4);
	square(gameChar_x-2,gameChar_y-63,4);
	//Body
	fill(255,200,0);
	rect(gameChar_x-5, gameChar_y-50, 10,25,5);
	//Feet amd legs
	line(gameChar_x-2,gameChar_y-25,gameChar_x-12,gameChar_y-30);
	line(gameChar_x-12,gameChar_y-30, gameChar_x-14,gameChar_y-15,);
	line(gameChar_x+2,gameChar_y-25,gameChar_x+12,gameChar_y-30);
	line(gameChar_x+12,gameChar_y-30,gameChar_x+14,gameChar_y-15);
	ellipse(gameChar_x-16,gameChar_y-15,15,10);
	ellipse(gameChar_x+16,gameChar_y-15,15,10);
	//Arms
	line(gameChar_x-5, gameChar_y-45, gameChar_x-16.5, gameChar_y-45);
	line(gameChar_x+5, gameChar_y-45, gameChar_x+16.5, gameChar_y-45);
	//Right hand
	push();
		angleMode(DEGREES);
		translate(gameChar_x-15.6, gameChar_y-45);
		rotate(30);
		ellipse(-4,0,12,8);
	pop();
	//Left Hand
	push();
		angleMode(DEGREES);
		translate(gameChar_x+15.6, gameChar_y-45);
		rotate(-30);
		ellipse(4,0,12,8);
	pop();
	//parachute
	//rightline
	push();
	angleMode(DEGREES);
	translate(gameChar_x-15.6, gameChar_y-45);
	rotate(40);
	line(-5,0,-50,0);
	pop();
	//leftline
	push();
	angleMode(DEGREES);
	translate(gameChar_x+15.6, gameChar_y-45);
	rotate(140);
	line(-5,0,-50,0);
	pop();
	//fabric
	push();
		fill(255,0,0);
		beginShape();
			curveVertex(gameChar_x-50,gameChar_y+100);
			curveVertex(gameChar_x-54,gameChar_y-77);
			curveVertex(gameChar_x+54, gameChar_y-77);
			curveVertex(gameChar_x+50,gameChar_y+100);

		endShape();
	pop();
}
function drawStandingForward()
{
	strokeWeight(2);
	fill(255,255,255);
	stroke(0,0,0);
	//Head
	ellipse(gameChar_x, gameChar_y-64, 45,25);
	//Eyes and nose
	fill(0,0,0);
	ellipse(gameChar_x-5,gameChar_y-67,4,4);
	ellipse(gameChar_x+5,gameChar_y-67,4,4);
	square(gameChar_x-2,gameChar_y-63,4);
	//body
	fill(255,200,0);
	rect(gameChar_x-5, gameChar_y-50, 10,25,5);
	//Feet and legs
	line(gameChar_x-2,gameChar_y-25,gameChar_x-10,gameChar_y);
	line(gameChar_x+2,gameChar_y-25,gameChar_x+10,gameChar_y);
	ellipse(gameChar_x-12,gameChar_y-2.5,15,10);
	ellipse(gameChar_x+12,gameChar_y-2.5,15,10);
	//Arms
	line(gameChar_x-5, gameChar_y-45, gameChar_x-12, gameChar_y-28);
	line(gameChar_x+5, gameChar_y-45, gameChar_x+12, gameChar_y-28);
	//Right hand
	push();
		angleMode(DEGREES);
		translate(gameChar_x-12, gameChar_y-28);
		rotate(-50);
		ellipse(0,0,12,8);
	pop();
	//Left hand
	push();
		angleMode(DEGREES);
		translate(gameChar_x+12, gameChar_y-28);
		rotate(+50);
		ellipse(0,0,12,8);
	pop();
}

function checkGameCharacterDie()
{
	
	//decrease the lives and restart thr game if lives are higher than zero
	if (lives > 0 && (gameChar_y > height  || isHunted))
	{
		lives--;
	}
	//there is a 2 seconds delay for game character animation when it is hunted
	if (lives >= 1 && (gameChar_y > height || isHunted ))
	{
		startGame();
	}
}