var Game = function (_colors,_connection){
	this.support;
	this.colors = _colors;
	this.assignedColor;
	this.connection = _connection;
	//var self = this;

	this.jeu = new Jeu();


	this.init();
}

Game.prototype = {

	connectionPanel:function(){
		this.support 	= document.createElement("div");
		this.support.id 	= 'support';
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

	getAssignedColor:function(){
		return this.assignedColor;
	},

	reset:function(){
		this.connection.send(JSON.stringify({message:'',creatorName:'',assignedColor:'',type:'deconnexion'}));
	},

/* TO CUSTOMIZE*/

	activeFunction:function(val){
		//called when the user throw the dice
		this.jeu.move(val);
	},

	passiveFunction:function(val){
		//called when other users throw the dice
		this.jeu.moveBack(val);
	},

	init:function(){
		//used for initiate the game
		this.jeu.initJeu();
	}

}