var app = function(){
  this.canvas = document.getElementById("canvas");
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  this.ctx = this.canvas.getContext("2d");
  this.ball = new Ball(200,200,50,this.ctx);

  this.draw();
}

app.prototype = {

  midiControl:function(val){
    console.log(val);
    if(val[3] == 0){
      this.ball.r = val[4]+10;
    }
    if(val[3] == 1){
      var map = val[4].map(0,127,-1,1);
      console.log(map);
      this.ball.gravity = map;
    }
  },

  draw:function(){
    console.log("message");
    //this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    this.ctx.fillStyle = "rgba(255,255,255,0.1)";
    this.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    this.ball.display();
    //this.ball.x++;
    this.ball.move();
    requestAnimationFrame(this.draw.bind(this));
  }

}
