angleMode = "radians";


var Mover = function(m,x,y){
    
    this.position = new PVector(x, y);
    this.mass = m;
    
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;
    
    this.velocity = new PVector(random(-1, 1), random(-1, 1));
    this.acceleration = new PVector(0, 0);

}

Mover.prototype={
    
    applyForce : function (ctx,force){
        
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
        
    },
    
    update : function(ctx){
        
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        
        this.aAcceleration = this.acceleration.x / 10.0;
        this.aVelocity += this.aAcceleration;
        this.aVelocity = constrain(this.aVelocity, -0.1, 0.1);
        this.angle += this.aVelocity;
        
        this.acceleration.mult(0);
        
    },
    
    display : function (ctx){
        
        stroke(0, 0, 0);
        fill(175, 175, 175, 200);
        rectMode(CENTER);
        pushMatrix();
        translate(this.position.x, this.position.y);
        rotate(this.angle);
        rect(0, 0, this.mass*16, this.mass*16);
        popMatrix();
           },

    
    checkTouch:function(){}

}

