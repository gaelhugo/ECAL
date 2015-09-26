var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext('2d');

/*  ----------------------------------------  */

var nbrBall = 25;
var allBalls = [];

function setup(){
    
    for(var i = 0;i<nbrBall;i++){
        var myBall = new Ball(Math.random()*w,Math.random()*h,Math.random()*10+5,ctx);
        allBalls.push(myBall);
    }
    
    

    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    draw();
}

function draw(){
    
    ctx.clearRect(0,0,w,h);
   
    
    for(var i=0;i<allBalls.length;i++){
        allBalls[i].move();
        allBalls[i].display();
    }
    
    requestAnimationFrame(draw);
}

function onTouchStart(touch){
    console.log("touch strat");
}

function onTouchMove(touch){
    console.log("touch move");
}
function onTouchEnd(touch){
    console.log("touch end");
}









setup();