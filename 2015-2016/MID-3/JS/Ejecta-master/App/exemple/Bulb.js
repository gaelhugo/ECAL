angleMode = "radians";





var Bulb = function(origin,armLength)
{
    this.origin = origin;
    this.armLength = armLength;
    
    this.angle = Math.PI/4;
     this.position = new PVector();
    this.aVelocity = 0;
    this.aAcceleration = 0.0;
    // Arbitrary damping
    this.damping = 1 ;
    // Arbitrary ball radius
    this.ballRadius = Math.floor(Math.random() * 70) + 30  ;
    this.dragging = false;
}



Bulb.prototype={
    
    
update: function(ctx){
    
    if (!this.dragging) {
        // Arbitrary constant
        var gravity = 0.2;
        // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
        this.aAcceleration = (-1 * gravity / this.armLength) * Math.sin(this.angle);
        // Increment velocity
        this.aVelocity += this.aAcceleration;
        // Arbitrary damping
        this.aVelocity *= this.damping;
        // Increment angle
        this.angle += this.aVelocity;
        }
},
    
    display : function (ctx){
        
        // Polar to cartesian conversion
       this.position = new PVector(
      this.armLength * Math.sin(this.angle),
      this.armLength * Math.cos(this.angle));
        this.position.add(this.origin);
        
        
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.closePath();
        
        
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        var grd = ctx.createRadialGradient(this.position.x, this.position.y,this.ballRadius/3, this.position.x, this.position.y, this.ballRadius);
        grd.addColorStop (1,"rgba(0,0,0,0)");
        grd.addColorStop(0, "rgba(250,250,250,1)");
        
        ctx.fillStyle = grd;
        
      
        
        // Use this code for drawing instead of this
        //ellipse(this.position.x, this.position.y, this.ballRadius, this.ballRadius);
        
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.ballRadius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
        
    },
    
checkTouch:function(){}
    
}

