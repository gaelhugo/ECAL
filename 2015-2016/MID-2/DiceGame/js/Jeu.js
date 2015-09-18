var Jeu = function(){

	this.piece;
	this.positionActuelle;
}

Jeu.prototype = {

	initJeu:function(){

		for(var i=0;i<100;i++){
			console.log(i);
			var _case = document.createElement("div");
			_case.id = "maCase_"+i;
			_case.className = "case";
			document.body.appendChild(_case);
		}

		this.piece = document.createElement("div");
		this.piece.id = "piece";
		this.piece.style.top = '50px';
		this.piece.style.left = '50px';
		this.positionActuelle = 0;
		document.body.appendChild(this.piece);

	},

	move:function(val){
		var nouvelleValeur = this.positionActuelle + val;
		this.positionActuelle =nouvelleValeur;

		var maCase = document.getElementById("maCase_"+nouvelleValeur);
		var pos = maCase.getBoundingClientRect();
		console.log(pos);
		this.piece.style.left = pos.left+'px';
		this.piece.style.top = pos.top+'px';
		/*
		var nouvelleValeur = this.positionActuelle + 52*val;
		this.piece.style.left = nouvelleValeur+'px';
		this.positionActuelle =nouvelleValeur;

		if(nouvelleValeur == 258){
			alert("looser");
		}
		*/

	},

	moveBack:function(val){
		var nouvelleValeur = this.positionActuelle - 52*(val-1);
		this.piece.style.left = nouvelleValeur+'px';
		this.positionActuelle =nouvelleValeur;

	}

}
