var clientName;//, assignedColor;
var userName;
var connectedDice;
var colors = ["3165ba","ba3192","31bab2","5d2747"];
var game;
var activeColor;

/*
function reset(){
	connection.send(JSON.stringify({message:'',creatorName:'',assignedColor:'',type:'deconnexion'}));
}

*/
//check pour firefox (Mozilla). L'appel aux websockets s'écrit différemment
window.WebSocket = window.WebSocket || window.MozWebSocket;

//si le navigateur n'accepte pas les websocket
if (!window.WebSocket) {
      	alert("Il faut utiliser un autre navigateur. Chrome par exemple.");

}else{

	//si le navigateur est ok
	//on initialise une connection sur le bon port, et la bonne IP (celle de l'ordinateur qui a le serveur)
	connection = new WebSocket('ws://'+IPAddress+':1337');
	//on ouvre la connection
	connection.onopen = function(){
		//connection.send(JSON.stringify({message:'',creatorName:'',type:'connection'}));
    console.log("ask for color");
    connection.send(JSON.stringify({type:'giveMeAColor'}));
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

		switch(json.type){
      case 'hereIsAcolor':
        console.log("get color",json.assignedColor);
        activeColor = "#"+json.assignedColor;
        game.autoLaunch(json.assignedColor);
      break;
			case 'activation':
        console.log("COLOR", json.assignedColor, activeColor);
        if(json.assignedColor == activeColor){
        //if(json.diceName == connectedDice){
					console.log("it's my turn to play ! with "+json.message);

					// we receive the dice value and send it to the active game (= current dice)
					game.setMoveNumber(parseInt(json.message));
				} else {
					console.log("it's not my turn with "+json.message);

					// we receive the dice value and send it to the active game (all the others)
					// game.passiveFunction(parseInt(json.message));
				}
			break;

			case 'deconnexion':
				//console.log("déconnection de l'utilisateur "+json.user);
				if(json.featuring!='dice'){
					alert("déconnexion de l'utilisateur "+json.user + ". \n 1. Rechargez le dé en premier \n 2. Dans un nouvel onglet, charger le jeu.\n Attention, ne pas simplement recharger la page.");

				} else if(json.featuring =='dice' && json.user == connectedDice){
					//alert("the connected dice is disconnected");
					//-> reload the page
					window.location.reload();
				}
			break;

			case 'ready':
				connectedDice 	= json.diceName;
				clientName 		= json.userName;
				// document.body.style.backgroundColor = '#' + game.getAssignedColor().substr(2,game.getAssignedColor().length - 2);
				console.log("READY");

				game.initiate(json.master, json.walls, json.target, clientName);
			break;

			case 'reload':
				alert("you need to reload the game and the dice");
			break;



            case 'sendWalls':
                game.sendWalls(json.diceName, json.userName);
            break;

            case 'addPlayer':
                game.addPlayer(json.newPlayerColor);
            break;

            case 'movePlayer':
                game.movePlayer(json.playerColor, json.direction);
            break;
            break;

            case 'rotateWalls':
                game.rotateWalls(json.clockwise);
            break;
		}
	}

	game = new Game(colors,connection);
	//game.connectionPanel();
}
