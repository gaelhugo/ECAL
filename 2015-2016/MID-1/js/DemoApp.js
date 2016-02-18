var DemoApp = function(){
  this.ctx;
  this.width  = window.innerWidth;
  this.height = window.innerHeight;
  //balls
  this.balls  = [];
  this.setup();
}

DemoApp.prototype = {
  midiControl:function(val){
    console.log(val);
    switch(val[3]){
      case 0:
        this.updateBallsGravity(val[4]);
      break;
      case 1:
        this.updateBallsRadius(val[4]);
      break;
    }
  },
  setup:function(){
    var canvas    = document.getElementById("canvas");
    canvas.width  = this.width;
    canvas.height = this.height;
    this.ctx      = canvas.getContext("2d");
    this.balls.push(new Ball(this.width/2,-250,50,this.ctx));
    this.draw();
  },
  draw:function(){
    //this.ctx.clearRect(0,0,this.width,this.height);
    this.ctx.fillStyle = "rgba(0,0,0,0.05)";
    this.ctx.fillRect(0,0,this.width,this.height);
    for(var i = 0;i<this.balls.length;i++){
        this.balls[i].move();
        this.balls[i].display();
    }
    requestAnimationFrame(this.draw.bind(this));
  },
  updateBallsGravity:function(value){
    for(var i = 0;i<this.balls.length;i++){
        this.balls[i].gravity = (64-value)/64;
    }
  },
  updateBallsRadius:function(value){
    for(var i = 0;i<this.balls.length;i++){
        this.balls[i].r = 50 + value*4;
    }
  }
}
