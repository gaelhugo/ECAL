angleMode = "radians";


var Attractor = function()
{
    
    this.position = new PVector(width/2, height/2);
    this.mass = 20;
    this.G = 1;
 
}



Attractor.prototype={
    
    
calculateAttraction: function(ctx, m){
    
    var force = PVector.sub(this.position, m.position);
    var distance = force.mag();
    this.distance = constrain(distance, 5, 25);
    this.force.normalize();
    var strength = (this.G * this.mass * m.mass) / (distance * distance);
    this.force.mult(strength);
    return force;
    
    },
    
    display : function (){
        
        
       
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.ballRadius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.strokeWeight(4);
       ctx.stroke(0);
        ctx.fill();
        
           },
    
checkTouch:function(){}
    
}
