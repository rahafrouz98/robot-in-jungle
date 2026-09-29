function Particle(particleX,particleY,particleSpeedX,particleSpeedY,cloudColor,cloudSize, cloudThickness)
{
  //the partColor argument is an array with 4 elements as [red, green, blue, alpha]
  this.particleX = particleX;
  this.particleY = particleY;
  this.initialX = particleX;
  this.iniitialY= particleY;
  this.particleSpeedX = particleSpeedX;
  this.particleSpeedY = particleSpeedY;
  this.particleColor= cloudColor;
  this.initialAlpha = cloudColor[3];
  this.particleXSize = cloudSize/4;
  this.initialParticleXSize = cloudSize/4;
  this.cloudSize = cloudSize;
  this.initialParticleYSize = cloudThickness/5;
  this.particleYSize =  cloudThickness/5;
  this.cloudThickness = cloudThickness;
  this.drawParticle = ()=>
  {
    noStroke();
    fill(this.particleColor[0],this.particleColor[1],this.particleColor[2],this.particleColor[3]);
    ellipse(this.particleX, this.particleY, this.particleXSize,this.particleYSize);
  }
  this.updateParticle = (cloudX,cloudY) =>
  {
    //Update Position
    this.particleX += this.particleSpeedX;
    this.particleY += this.particleSpeedY;

    //Random Color
    this.particleColor[0] += random(-1.2,1.2);
    this.particleColor[1] += random(-1.2,1.2);
    this.particleColor[2] += random(-1.2,1.2);                         

    //update alpha and particle size
    let yFactor = ((this.cloudThickness/2)-abs(cloudY-this.particleY))/(this.cloudThickness/2)
    let xFactor = ((this.cloudSize/2)-abs(cloudX-this.particleX))/(this.cloudSize/2);
    let newAlpha = this.initialAlpha * pow(xFactor,5)* yFactor;
    let newXSize = this.initialParticleXSize * xFactor * yFactor;
    let newYsize = this.initialParticleYSize * xFactor * yFactor ;
    if(newAlpha < 1)
    {
      newAlpha = 0;
    }
    this.particleColor[3] = newAlpha;
    if(newXSize < 1)
    {
      newXSize = 0;
    }
    this.particleXSize = newXSize;
    if(newXSize < 1)
    {
      newXSize = 0;
    }
    this.particleYSize = newYsize;
  }
}
function Cloud(xPos,yPos,speed, size, cloudColor)
{
  //the cloudColor argument is an array with 4 elements as [red, green, blue, alpha]
  //negative speed is from right to left
  this.cloudX = xPos;
  this.cloudY = yPos;
  this.cloudSpeed = speed;
  this.cloudSize = size;
  this.cloudThickness = 100;
  this.particleList=[];
  this.cloudColor = cloudColor;
  this.cloudStability = 0.03;
  this.cloudResolution = 500

  this.cloudAssembler = ()=>
  {
    //the width of cloud is equal to the size and the hight is equal to size/3
    for ( i = 0; i < this.cloudResolution; i++)
    {
        let tempParticleX = this.cloudX + random(-this.cloudSize/2,this.cloudSize/2);
        let tempParticleY = this.cloudY - random (-this.cloudThickness/2, this.cloudThickness/2);
        let tempParticleSpeedX = random([-1,1]) * this.cloudStability;
        let tempParticleSpeedY = random([-1,1]) * this.cloudStability;
        let tempParticleColor = [this.cloudColor[0], this.cloudColor[1],this.cloudColor[2],this.cloudColor[3]]
        let tempParticle = new Particle(tempParticleX,tempParticleY, tempParticleSpeedX,tempParticleSpeedY,tempParticleColor, this.cloudSize, this.cloudThickness);
        tempParticle.updateParticle(this.cloudX, this.cloudY);
        this.particleList.push( tempParticle)
    }
  }
  this.updateCloud= ()=>
  {
    this.cloudX += this.cloudSpeed;
    for(i=0; i < this.particleList.length; i++)
    {
        this.particleList[i].updateParticle(this.cloudX, this.cloudY, this.cloudSize, this.cloudColor[3], this.cloudThickness);
        if (this.particleList[i].particleColor[3] < 2)
        {
          this.particleList.splice(i,1)
          let tempParticleX = this.cloudX + random(-this.cloudSize/2,this.cloudSize/2);
          let tempParticleY = this.cloudY - random (-this.cloudThickness/2, this.cloudThickness/2);
          let tempParticleSpeedX
          if (tempParticleX < this.cloudX )
            tempParticleSpeedX = random(-1,0) * this.cloudStability;
          else
            tempParticleSpeedX = random(0,1) * this.cloudStability;
          let tempParticleSpeedY
          if (tempParticleY < this.cloudY )
            tempParticleSpeedY = random(-1,0) * this.cloudStability;
          else
            tempParticleSpeedY = random(0,1) * this.cloudStability;
          let tempParticleColor = [this.cloudColor[0], this.cloudColor[1],this.cloudColor[2],this.cloudColor[3]]
          let tempParticle = new Particle(tempParticleX,tempParticleY, tempParticleSpeedX,tempParticleSpeedY,tempParticleColor, this.cloudSize, this.cloudThickness);
          tempParticle.updateParticle(this.cloudX, this.cloudY);
          this.particleList.push( tempParticle)
        }
    }
  }
  this.drawCloud = ()=>
  {
    if (this.particleList.length == 0)
    {
      this.cloudAssembler();
    }
    this.updateCloud()
    for ( i = 0; i < this.particleList.length; i++)
    {
      this.particleList[i].drawParticle();
    } 
  }
}