var w = window.innerWidth;
var h = window.innerHeight;
var canvas = document.getElementById('canvas');
canvas.width = w;
canvas.height = h;
var ctx = canvas.getContext('2d');

//utils
var angle 		= 30*Math.PI/180;
var caseWidth 	= 70;
var nbrCase		= 5;
var allCases 	= [];
var centre 		= {"x":window.innerWidth/2,"y":window.innerHeight/2};

function setup(){

	//creation de toutes les Case
	var id = 0;
	//pour avoir les 5 cases par ANGLE
	var radiusMax = nbrCase*caseWidth;
	while(radiusMax>0){
		for(var i =0;i<360;i+=30){
			//creation de case
			var maCase = new Case(centre.x,centre.y,radiusMax,angle,i,ctx,id,caseWidth);
			allCases.push(maCase);
			id++;
		}
		radiusMax-=caseWidth;
	}
	document.addEventListener("mousemove", onMouseMove);
	document.addEventListener("click", onMouseClick);
	draw();
}

function onMouseMove(e){
	//JUST FOR ROLLOVER
	for(var i=0;i<allCases.length;i++){
		allCases[i].check(e.pageX,e.pageY);
	}
}

function onMouseClick(e){
	var myCase;
	for(var i=0;i<allCases.length;i++){
		myCase = allCases[i].check(e.pageX,e.pageY);
		if(myCase!=undefined){
			break;
		}	
	}
	//TWEEN JUST THE SELECTED CIRCLE
	if(myCase!=undefined){
		for(var i=0;i<allCases.length;i++){
			if(allCases[i].radius == myCase.radius){
				allCases[i].tween(30);
			}
		}
	}
}

function draw(){
	TWEEN.update();
	ctx.clearRect(0,0,w,h);
	//dessiner
	for(var i=0;i<allCases.length;i++){
		allCases[i].display();
	}
	requestAnimationFrame(draw);
}
setup();