var port = 1337;
var http = require('http');
var server = http.createServer(function(request,response){});
server.listen(port,function(){
	console.log("Le port "+port+" est ouvert.");
});

var serverWebSocket = require('websocket').server;
var wsServer = new serverWebSocket({
	httpServer:server
});

var clients = [],
	master	= null;
var colors 		 = ['3165ba','ba3192','31bab2','5d2747'];
var diceColors;


var dice = null;
var players = [];
//var isMaster = false;


wsServer.on('request', function(request){
	var connection = request.accept(null,request.origin);
	var date = new Date();
	var clientName = 'client_'+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
	clients[clientName] = {"connection":connection,"color":0xcccccc,"connectedDice":'',"type":null};

  // NEW VERSION
  // JUST PUSH ALL CLIENTS ONE AFTER THE OTHER
  //clients.push({"connection":connection,"color":0xcccccc,"connectedDice":'',"type":null})

	var isMaster = false;

	connection.on('message',function(message){

		console.log(message);
		var json = JSON.parse(message.utf8Data);

		switch(json.type){
			case 'connectTheDice':


				/* ----          TOTAL ARRAY AVAILABLE        ----*/
				/* ---- Depending on how many screen is used ---- */
				/* ---- ['3165ba','ba3192','31bab2','5d2747']---- */

				// CHANGE HERE IF YOU HAVE MORE THAN 2 SCREENS

				diceColors = ['3165ba','ba3192'];
				clients[clientName].type = 'dice';
        //dice = {"connection":connection,"type":"dice","color":String(0x3165ba)}
        // send to dice
        connection.send(JSON.stringify({assignedColor:diceColors[0],type:'initialisation'}));
        /*
        if(colors.length>0){
					var shifted = colors.shift();
					clients[clientName].color = shifted;
					clients[clientName].type = 'dice';
					connection.send(JSON.stringify({message:'',diceName:clientName,assignedColor:shifted,type:'initialisation'}));
				}else{
					connection.send(JSON.stringify({message:'',diceName:clientName,assignedColor:'error',type:'initialisation'}));
					clients[clientName].type = null;
				}
        */
				console.log("the dice is connected");

			break;

      case 'giveMeAColor':
          connection.send(JSON.stringify({assignedColor:String(colors[0]),type:'hereIsAcolor'}));
          var shifted = colors.shift();
          colors.push(shifted);
      break;

			case 'activation':
				console.log(clients);
      	for(var name in clients){
					clients[name].connection.send(JSON.stringify({message:json.message,diceName:clientName,assignedColor:json.assignedColor,type:'activation'}));
				}

				// SEND THE NEW COLOR
				// for(var name in clients){
				// 	if(	clients[name].type == 'dice'){
				// 	  var shifted =	diceColors.shift();
				// 		diceColors.push(shifted);
				// 		clients[name].connection.send(JSON.stringify({newColor:diceColors[0],type:'updateColor'}));
				// 	}
				// }

			break;

			// NEW FUNCTION WE CAN CALL JUST AFTER THE USER HAS CLICKED ON DICE.
			case 'changeDiceColor':
				// SEND THE NEW COLOR
				for(var name in clients){
					if(	clients[name].type == 'dice'){
						var shifted =	diceColors.shift();
						diceColors.push(shifted);
						clients[name].connection.send(JSON.stringify({newColor:diceColors[0],type:'updateColor'}));
					}
				}
			break;

      /*
      case 'rollDice':
				for(var name in clients){
					if(clients[name] != json.diceName){
						clients[name].connection.send(JSON.stringify({message:json.message,diceName:clientName,type:'rollDice'}));
					}
				}
			break;
      */
			case 'connectGame':

        console.log("call to connectGAME");

				if(clients[clientName]!=undefined){
            console.log("not undefined");
					clients[clientName].type = 'game';
					clients[clientName].color = json.assignedColor;

					if(master == null) {
              console.log("master null");
						master = clients[clientName];
						isMaster = true;

						var w = 1;
						for(var name in clients){
              console.log(w);
						if(clients[name].type != 'dice'){
                console.log("no condition");
								connection.send(JSON.stringify({diceName:name,userName:clientName,master:isMaster,type:'ready'}));
						}
							w++;
						}
					} else {

						//le master envoi au nouveau client :
						// le nom du dé connecté
						// le nom du nouvel utilisateur


					//	for(var name in clients){
							//if('0x'+decimalToHex(clients[name].color,6) == json.assignedColor && clients[name].type == 'dice'){
								master.connection.send(JSON.stringify({diceName:name,userName:clientName,type:'sendWalls'}));
						//	}
					//	}
					}
				}else{
					console.log("you need to reload your game");
					connection.send(JSON.stringify({message:'',type:'reload'}));
				}
			break;
			case 'walls':
				clients[json.targetUserName].connection.send(JSON.stringify({walls:json.walls,target:json.target,diceName:json.targetDiceName,userName:json.targetUserName,master:false,type:'ready'}));
			break;
			case 'newPlayer':
				for(var name in clients) {
					if(clients[name].type == 'game' && name != json.newPlayerName) {
						clients[name].connection.send(JSON.stringify({newPlayerColor:json.newPlayerColor,type:'addPlayer'}));
						//connection.send(JSON.stringify({newPlayerColor:clients[name].color,type:'addPlayer'}));
					}
				}
			break;
			case 'getAllPlayers':
				console.log("get ALL players", json.newPlayerName);
				for(var name in clients) {
					if(clients[name].type == 'game' && name != json.newPlayerName) {
						//clients[name].connection.send(JSON.stringify({newPlayerColor:json.newPlayerColor,type:'addPlayer'}));
						//connection.send(JSON.stringify({newPlayerColor:clients[name].color,type:'addPlayer'}));
							console.log("this other player has color: ", clients[name].color);
						clients[json.newPlayerName].connection.send(JSON.stringify({newPlayerColor:clients[name].color,type:'addPlayer'}));
					}
				}
			break;
			case 'getGamePlayers':
				for(var name in clients) {
					var conn = clients[name].connection;

					for(var n in clients) {
						if(clients[n].type != 'dice') {
							//clients[name].connection.send(JSON.stringify({newPlayerColor:json.newPlayerColor,type:'addPlayer'}));
							//connection.send(JSON.stringify({newPlayerColor:clients[name].color,type:'addPlayer'}));
							//console.log("this other player has color: ", clients[name].color);
							conn.send(JSON.stringify({newPlayerColor:clients[n].color,type:'addPlayer'}));
						}
					}

				}
			break;

			case 'movePlayer':
				for(var name in clients) {
					if(clients[name].type == 'game' && name != json.playerName) {
						clients[name].connection.send(JSON.stringify({playerColor:json.playerColor,direction:json.direction,type:'movePlayer'}));
					}
				}
			break;
			case 'rotateWalls':
				for(var name in clients) {
					if(clients[name].type == 'game' && name != json.playerName) {
						clients[name].connection.send(JSON.stringify({clockwise:json.clockwise,type:'rotateWalls'}));
					}
				}
			break;
			case 'deconnexion':
				var colorDeconnected = clients[clientName].color;
				//delete clients[clientName];
				for(var name in clients){
					clients[name].connection.send(JSON.stringify({message:'',user:clientName,color:colorDeconnected,type:'deconnexion'}));
				}
				// clients 	 = [];
				// colors 		 = ['3165ba','ba3192','31bab2','5d2747'];
				// master		 = null;
			break;

		}

	});

	//deconnection
	connection.on('close', function(connection){
		if(clients[clientName]!= undefined) {
			var colorDeconnected = clients[clientName].color;
			var typeDeconnected = clients[clientName].type;
			delete clients[clientName];
			for(var name in clients){
				clients[name].connection.send(JSON.stringify({message:'',user:clientName,color:colorDeconnected,featuring:typeDeconnected,master:clients[clientName] == master,type:'deconnexion'}));
			}
		}

		// !! RELOAD WON'T WORK
		// BECAUSE IT WILL ERASE EACH ELEMENT AFTER RELOAD
		// RELOAD THE DICE ALSO BE CAREFULL !!
		// reset allClients
		// FOR HAVING IT WORK : 1 load DICE, 2 new GAME in a NEW TAB
		if(typeDeconnected!='dice'){
			clients 	 = [];
			colors 		 = ['3165ba','ba3192','31bab2','5d2747'];
			master		 = null;
		}

	});

});


function decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
      hex = "0" + hex;
  }

  return hex;
}
