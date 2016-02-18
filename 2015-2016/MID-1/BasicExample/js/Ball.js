var Ball = function(x,y,r,ctx){
  this.x        = x;
  this.y        = y;
  this.r        = r;
  this.ctx      = ctx;
  this.color    = "rgba(255,255,255,1)";
  this.gravity  = 0.999;
  this.friction = 0.99;
  this.speed    = 15;
}


Ball.prototype = {
  display:function(){
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
    this.ctx.closePath();
    this.ctx.fill();
  },
  move:function(){
    this.speed += this.gravity;
    this.speed *= this.friction;
    this.y += this.speed;
    if((this.y+this.r)>=window.innerHeight){
      this.y = window.innerHeight-this.r;
      this.speed*=-1;
      this.color = "rgba(255,0,0,1)";
    }else{
      this.color = "rgba(255,255,255,1)";
    }
  }
}
