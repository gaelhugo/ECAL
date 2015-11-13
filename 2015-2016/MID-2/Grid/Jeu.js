var Jeu = function(){

	this.canvas = document.getElementById("canvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.ctx = this.canvas.getContext('2d');

	this.nbrLigne 	= 10;
	this.nbrColonne = 10;
	this.tailleCase = 60;

	this.touteLignes= [];

	this.setup();
}

Jeu.prototype = {

	setup:function(){

		//créer un tableau avec toutes les cases
		for(var j=0;j<this.nbrLigne;j++){
			var ligne = [];
			for(var i=0;i<this.nbrColonne;i++){ 
				var maCase = new Case(i*this.tailleCase,j*this.tailleCase,this.tailleCase,this.tailleCase,this.ctx);
				ligne.push(maCase);
			}
			this.touteLignes.push(ligne);
		}

		document.addEventListener("click", this.onmouseclick.bind(this));

		this.draw();
	},

	onmouseclick:function(e){
		var indexX = Math.floor(e.x / this.tailleCase);
		var indexY = Math.floor(e.y / this.tailleCase);
		this.touteLignes[indexY][indexX].color = "#ff00ff";

		//check des voisins directs
		var voisinDuDessus = indexY-1;
		var voisinDuDessous = indexY+1;
		var voisinDroite = indexX+1;
		var voisinGauche = indexX-1;

		if(this.touteLignes[indexY][voisinGauche]!=undefined){
			this.touteLignes[indexY][voisinGauche].color 	= "#00ff00";
		}
		if(this.touteLignes[indexY][voisinDroite]!=undefined){
			this.touteLignes[indexY][voisinDroite].color 	= "#00ff00";
		}
		if(this.touteLignes[voisinDuDessus]!=undefined){
			this.touteLignes[voisinDuDessus][indexX].color 	= "#00ff00";
		}
		if(this.touteLignes[voisinDuDessous]!=undefined){
			this.touteLignes[voisinDuDessous][indexX].color = "#00ff00";
		}
	},

	draw:function(){

		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

		//il faut afficher toutes les cases
		for(var m = 0;m<this.touteLignes.length;m++){
			for(var n = 0;n<this.touteLignes[m].length;n++){
				//UNE CASE
				this.touteLignes[m][n].display();
			}

		}



		requestAnimationFrame(this.draw.bind(this));
	}
}






//Lancer le jeu
var monJeu = new Jeu();