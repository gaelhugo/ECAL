var camera, scene, renderer, dice;
var accelerationX,accelerationY;
var vitesseX, vitesseY;
var goalX, goalY, goalZ;
var counter = 10;
var messageSent = 1;
var myName = '';
var isRemote = false;
var globalColor = 0xffffff;




function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

	accelerationX = .0001 * Math.round(Math.random()*5+1);
	accelerationY = .0001 * Math.round(Math.random()*5+1);
	vitesseX = 0;
	vitesseY = 0;
	goalX = 0;
	goalY = 0;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 1000);
    camera.lookAt(scene.position);
    scene.add(camera);

	var pointLight = new THREE.PointLight(globalColor);
	pointLight.position.set(0, 0, 1000);
	var ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(pointLight);

	THREE.ImageUtils.crossOrigin = '';
    var materials = [
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('data/un.jpg')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('data/deux.jpg')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('data/trois.jpg')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('data/quatre.jpg')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('data/cinq.jpg')
       }),
       new THREE.MeshLambertMaterial({
           map: THREE.ImageUtils.loadTexture('data/six.jpg')
       })
    ];

    dice = new THREE.Mesh(
    new THREE.BoxGeometry( 600, 600, 600, 1, 1, 1 ),
    new THREE.MeshFaceMaterial( materials ) );
	scene.add( dice );
}

function reDice(e){
	goalX = goalX + Math.PI/2 * Math.round(Math.random()*10);
	goalY = goalY + Math.PI/2 * Math.round(Math.random()*10);
	vitesseX = vitesseY = .09;
	messageSent = 0;
	connection.send(JSON.stringify({message:[goalX,goalY,goalZ],diceName:String(myName),type:'rollDice'}));
}

function launchRemoteDice(remoteGoals){
	goalX = remoteGoals[0];
	goalY = remoteGoals[1];
	vitesseX = vitesseY = .09;
	messageSent = 0;
	isRemote = true;
}

function animate() {
    requestAnimationFrame(animate);
    dice.rotation.x += vitesseX;
    dice.rotation.y += vitesseY;
    renderer.render(scene, camera);

	if(dice.rotation.x<goalX){}else{ vitesseX = 0;dice.rotation.x = goalX;}
	if(dice.rotation.y<goalY){}else{ vitesseY = 0;dice.rotation.y = goalY;}

	if((vitesseX == 0 && vitesseY == 0 ) && messageSent==0 ){
		if(!isRemote){
			var val = getValue(dice.rotation.x,dice.rotation.y);
			console.log(val);
			messageSent = 1;
			isRemote = false;
			sendMessage(val,myName);
		}else{
			isRemote = false;
			messageSent = 1;
		}
	}
	counter++;
}

function getValue(angle1,angle2){
	var diff1 = angle1*180/Math.PI % 360;
	var diff2 = angle2*180/Math.PI % 360;

	if(Math.round(diff1) == 0 || Math.round(diff1) == 360){
		switch(Math.round(diff2)){
			case 0:
				return 5;
			break;
			case 90:
				return 2;
			break;
			case 180:
				return 6;
			break;
			case 270:
				return 1;
			break;
		}
	}
	if(Math.round(diff1) == 90){
		return 3;
	}
	if(Math.round(diff1) == 180){
		switch(Math.round(diff2)){
			case 0:
				return 6;
			break;
			case 90:
				return 1;
			break;
			case 180:
				return 5;
			break;
			case 270:
				return 2;
			break;
		}
	}
	if(Math.round(diff1) == 270){
		return 4;
	}
}

if ("ontouchstart" in document.documentElement){
	document.addEventListener('touchstart',reDice);
}else{
	document.addEventListener('click',reDice);
}

//check pour firefox (Mozilla). L'appel aux websockets s'écrit différemment
window.WebSocket = window.WebSocket || window.MozWebSocket;

//si le navigateur n'accepte pas les websocket
if (!window.WebSocket) {
      	alert("Il faut utiliser un autre navigateur. Chrome par exemple. ça serait une bonne idée");

}else{
	//si le navigateur est ok
	//on initialise une connection sur le bon port, et la bonne IP (celle de l'ordinateur qui a le serveur)
	connection = new WebSocket('ws://'+IPAddress+':1337');
	//on ouvre la connection
	connection.onopen = function(){
		connection.send(JSON.stringify({message:'',diceName:'',type:'connectTheDice'}));
	}

	connection.onerror = function(error){
		//on alert une erreur
		alert("Il y a un problème avec la connection au serveur. Vérifiez l'IP ou le PORT...");
	}

	connection.onmessage = function(message){
		//on vérifie l'état du JSON afin d'éviter des erreurs
		 try {
            var json = JSON.parse(message.data);
        } catch (e) {
            alert("Le fichier JSON semble être mal formé");
			return;
        }


		console.log("data: "+ message.data);

		switch(json.type){
			case 'initialisation':
				myName = json.diceName;
				globalColor = json.assignedColor;

				init();
				animate();
				console.log("init"+myName);
			break;
			case 'activation':
				if(myName == json.diceName){
					console.log("I ran the dice and get : "+json.message);
				}else{
					console.log("Somebody ran the dice and get : "+json.message);
				}
			break;


			case 'rollDice':
				if(myName != json.diceName){
					launchRemoteDice(json.message);
				}
			break;
			case 'deconnexion':
				if(globalColor == json.color){
					alert("The connected game has been closed.");
				}
			break;
		}
	}
}

function sendMessage(value,myName){
	connection.send(JSON.stringify({message:value,diceName:String(myName),type:'activation'}));
}
