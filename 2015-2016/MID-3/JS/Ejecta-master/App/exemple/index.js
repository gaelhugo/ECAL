var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;

var ctx = canvas.getContext('2d');

/* ---------------------------------------------------------------------- */

var nbrMosquito = 1;
var allMosquitos = [];
var nbrBulb = 5;
var allBulbs = [];







function setup(){
    
    for(var i = 0; i<nbrMosquito; i++){
        var myMosquito = new Mosquito(Math.random()*w,Math.random()*h,Math.random()*10+5,ctx);
        allMosquitos.push(myMosquito);
    }
    
    createBulbs();
}

    function createBulbs (){
        
        
        for(var i = 0; i<nbrBulb; i++){
            var myBulb = new Bulb(new PVector(/*pos x*/Math.random()*+w,/*pos y*/0),/*longueur fil*/ Math.random()*(h/1.5));
            allBulbs.push(myBulb);
        }
        
    }


    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
    draw();
    


function draw(){
    //console.log("draw");
   
    // tibor -- added background; remove to see what happens if not
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var i=0; i<allMosquitos.length; i++){
        allMosquitos[i].display();
    }
    
    for(var i=0; i<allBulbs.length; i++){
        allBulbs[i].update(ctx);
        allBulbs[i].display(ctx);
        
    }
    
    requestAnimationFrame(draw);
    
}


function onTouchStart(touch){
    console.log("touch start");
}

function onTouchMove(touch){
    console.log("touch move");
}

function onTouchEnd(touch){
    console.log("touch end");
}

setup();