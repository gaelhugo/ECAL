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

var clients = [];
var colors = [0xff0000,0xffffff,0xff00ff,0x0000ff,0xffff00,0x00ffff];

wsServer.on('request', function(request){
	var connection = request.accept(null,request.origin);
	var date = new Date();
	var clientName = 'client_'+date.getHours()+date.getMinutes()+date.getSeconds()+date.getMilliseconds();
	clients[clientName] = {"connection":connection,"color":0xcccccc,"connectedDice":'',"type":null};
	
	connection.on('message',function(message){

		console.log(message);
		var json = JSON.parse(message.utf8Data);

		switch(json.type){
			case 'connectTheDice':
				if(colors.length>0){
					var shifted = colors.shift();
					clients[clientName].color = shifted;
					clients[clientName].type = 'dice';
					connection.send(JSON.stringify({message:'',diceName:clientName,assignedColor:shifted,type:'initialisation'}));
				}else{
					connection.send(JSON.stringify({message:'',diceName:clientName,assignedColor:'error',type:'initialisation'}));
					clients[clientName].type = null;
				}
				console.log("connect the dice");	
			break;
			case 'activation':
				for(var name in clients){
					clients[name].connection.send(JSON.stringify({message:json.message,diceName:clientName,type:'activation'}));	
				}
			break;
			case 'rollDice':
				for(var name in clients){
					if(clients[name] != json.diceName){
						clients[name].connection.send(JSON.stringify({message:json.message,diceName:clientName,type:'rollDice'}));
					}
				}
			break;
			case 'connectGame':
				if(clients[clientName]!=undefined){
					clients[clientName].type = 'game';
					clients[clientName].color =  json.assignedColor;
					var w = 1;
					for(var name in clients){
						if('0x'+decimalToHex(clients[name].color,6) == json.assignedColor && clients[name].type == 'dice'){
							connection.send(JSON.stringify({message:'',diceName:name,userName:clientName,type:'ready'}));
						}
						w++;
					}
				}else{
					console.log("you need to reload your game");
					connection.send(JSON.stringify({message:'',type:'reload'}));
				}
			break;	
			case 'deconnexion':
				var colorDeconnected = clients[clientName].color;
				//delete clients[clientName];
				for(var name in clients){
					clients[name].connection.send(JSON.stringify({message:'',user:clientName,color:colorDeconnected,type:'deconnexion'}));
				}
				colors = [0xff0000,0xffffff,0xff00ff,0x0000ff,0xffff00,0x00ffff];
				clients = [];
			break;

		}

	});

	//deconnection
	connection.on('close', function(connection){
		if(clients[clientName]!= undefined){
			var colorDeconnected = clients[clientName].color;
			var typeDeconnected = clients[clientName].type;
			delete clients[clientName];
			for(var name in clients){
				clients[name].connection.send(JSON.stringify({message:'',user:clientName,color:colorDeconnected,featuring:typeDeconnected,type:'deconnexion'}));
			}
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