var Game = function (_colors,_connection){
	this.support;
	this.colors = _colors;
	this.assignedColor;
	this.connection = _connection;
	//var self = this;

	this.jeu = new Jeu(this.connection);
}

Game.prototype = {

	connectionPanel:function(){
		this.support 	= document.createElement("div");
		this.support.id = 'support';
		document.body.appendChild(this.support);
		for(var i in this.colors){
			var palette = document.createElement("div");
			palette.id ='palette';
			palette.style.backgroundColor = '#'+this.colors[i];
			palette.style.width = '20px';
			palette.style.height = '10px';
			palette.style.float = 'left';
			this.support.appendChild(palette);
			palette.addEventListener('click', this.connectDice.bind(this));
		}

	},

	connectDice:function(e){
		var rgb = e.currentTarget.style.backgroundColor;
		var a = rgb.split("(")[1].split(")")[0];
		a = a.split(",");
		var color = a.map(function(x){
		    x = parseInt(x).toString(16);
		    return (x.length==1) ? "0"+x : x;
		});
		color = "0x"+color.join("");
		this.assignedColor = color;
		this.connection.send(JSON.stringify({message:'',creatorName:'',assignedColor:color,type:'connectGame'}));
		var element = document.getElementById("support");
		element.parentNode.removeChild(element);
	},

	autoLaunch:function(color){
		//getAnAutomatic color from the server

		this.assignedColor = "0x"+color;
		console.log("autoLaunch", this.assignedColor);
		this.connection.send(JSON.stringify({message:'',creatorName:'',assignedColor:color,type:'connectGame'}));
	},


	getAssignedColor:function(){
		return this.assignedColor;
	},

	reset:function(){
		this.connection.send(JSON.stringify({message:'',creatorName:'',assignedColor:'',type:'deconnexion'}));
	},

/* TO CUSTOMIZE*/

	setMoveNumber:function(val){
		this.jeu.setMoveNumber(val);
	},

	initiate:function(isMaster, jsonWalls, jsonTarget, clientName) {
		this.jeu.setup(isMaster, jsonWalls, jsonTarget, this.assignedColor, clientName);
	},

	sendWalls:function(diceName, userName) {
		this.jeu.sendWalls(diceName, userName);
	},

	addPlayer:function(color) {
		this.jeu.addPlayer(color);
	},

	movePlayer:function(color, direction) {
		this.jeu.movePlayer(color, direction);
	},

	rotateWalls:function(clockwise) {
		this.jeu.rotateWalls(clockwise);
	}

}
