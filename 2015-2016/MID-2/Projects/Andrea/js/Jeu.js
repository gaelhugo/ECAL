var Jeu = function(connection){
	this.canvas = document.getElementById("canvas");
	var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
	this.canvas.width = window.innerWidth * pixelRatio;
	this.canvas.height = window.innerHeight * pixelRatio;
	this.ctx = this.canvas.getContext('2d');

	this.nbrLigne 	= 10;
	this.nbrColonne = 10;
	this.tailleCase = 60 * pixelRatio;
	this.nbrWall	= 200;

	this.offsetX = this.canvas.width / 2 - this.nbrColonne * this.tailleCase / 2;
	this.offsetY = this.canvas.height / 2 - this.nbrLigne * this.tailleCase / 2;

	this.touteLignes = [];

	this.walls	   = [];
	this.jsonWalls = [];

	this.players = [];

	this.currentPlayer = 0;

	this.currentIndexX = 0;
	this.currentIndexY = 0;

	this.topNeighbor	= null;
	this.bottomNeighbor = null;
	this.rightNeighbor	= null;
	this.leftNeighbor	= null;

	this.topWall	= null;
	this.bottomWall	= null;
	this.rightWall	= null;
	this.leftWall	= null;

	this.toTheTop	 = true;
	this.toTheRight	 = true;
	this.toTheBottom = true;
	this.toTheLeft   = true;

	this.canIMove = false;

	this.moveNumber = 0;

	this.connection = connection;

	this.clientName;

	this.target = null;
	this.jsonTarget = {};

	this.canIReset = false;

	this.winner = null;

	//ADD FOR reset
	this.color;

	// this.setup();
}

Jeu.prototype = {

	setup:function(isMaster, jsonWalls, jsonTarget, color, clientName){
		this.color = color;
		this.clientName = clientName;

		this.initTableau();
		this.initPlayers();



		if(isMaster == true) {
			this.initAllWalls();
		} else {
			console.log("not a master");
			for(var i = 0; i < jsonWalls.length; i++) {
				this.walls.push(new Wall(this.touteLignes[jsonWalls[i].indexY][jsonWalls[i].indexX].x,
										 this.touteLignes[jsonWalls[i].indexY][jsonWalls[i].indexX].y,
										 jsonWalls[i].indexX,
										 jsonWalls[i].indexY,
										 this.tailleCase,
										 jsonWalls[i].rotation,
										 jsonWalls[i].color,
										 this.ctx));
			}

			this.target = new Target(this.touteLignes[jsonTarget.indexY][jsonTarget.indexX].x,
									 this.touteLignes[jsonTarget.indexY][jsonTarget.indexX].y,
									 this.tailleCase,
									 this.ctx);

			this.connection.send(JSON.stringify({newPlayerColor:color,newPlayerName:this.clientName,type:'newPlayer'}));
			//GET ALL PREVIOUS PLAYERS
			this.connection.send(JSON.stringify({newPlayerName:this.clientName,type:'getAllPlayers'}));
		}

		//document.addEventListener("click", this.onmouseclick.bind(this));
		document.addEventListener("keydown", this.onkeydown.bind(this));

		console.log(this.players);

		this.draw();
	},

	restart:function(){
		this.winner 			= null;
		this.players 			= [];
		this.touteLignes 	= [];

		this.initTableau();
		this.initPlayers();
		this.initAllWalls();
		//GET ALL OTHERS PLAYERS
		//ASK THE server
		//this.connection.send(JSON.stringify({type:'getGamePlayers'}));
		this.connection.send(JSON.stringify({newPlayerName:this.clientName,type:'getAllPlayers'}));
	},

	initPlayers:function(){
		// ajouter les joueurs
		if(	this.color == 0x3165ba) {
			this.players.push(new Player(this.touteLignes[0][0].x, this.touteLignes[0][0].y, this.tailleCase, "#3165ba", this.ctx));
			this.currentIndexX = 0;
			this.currentIndexY = 0;
		} else if(	this.color == 0xba3192) {
			this.players.push(new Player(this.touteLignes[this.nbrLigne - 1][this.nbrColonne - 1].x, this.touteLignes[this.nbrLigne - 1][this.nbrColonne - 1].y, this.tailleCase, "#ba3192", this.ctx));
			this.currentIndexX = this.nbrColonne - 1;
			this.currentIndexY = this.nbrLigne - 1;
		} else if(	this.color == 0x31bab2) {
			this.players.push(new Player(this.touteLignes[0][this.nbrColonne - 1].x, this.touteLignes[0][this.nbrColonne - 1].y, this.tailleCase, "#31bab2", this.ctx));
			this.currentIndexX = this.nbrColonne - 1;
			this.currentIndexY = 0;
		} else if(	this.color == 0x5d2747) {
			this.players.push(new Player(this.touteLignes[this.nbrLigne - 1][0].x, this.touteLignes[this.nbrLigne - 1][0].y, this.tailleCase, "#5d2747", this.ctx));
			this.currentIndexX = 0;
			this.currentIndexY = this.nbrLigne - 1;
		}
	},

	initTableau:function(){
		//créer un tableau avec toutes les cases
		for(var j = 0; j < this.nbrLigne; j++){
			var ligne = [];
			for(var i = 0; i < this.nbrColonne; i++){
				var maCase = new Case(this.offsetX + i * this.tailleCase,
									  this.offsetY + j * this.tailleCase,
									  this.tailleCase,
									  this.tailleCase,
									  this.ctx);
				ligne.push(maCase);
			}
			this.touteLignes.push(ligne);
		}
	},

	initAllWalls:function(){
		// créer un tableau avec tous les murs
		for (var i = 0; i < this.nbrWall; i++){
			var randx = Math.floor(Math.random() * (this.nbrColonne - 1)) + 1;
			var randy = Math.floor(Math.random() * (this.nbrLigne - 1)) + 1;

			var isThereAlreadyAWall = true;
			for (var j = 0; j < this.walls.length; j++) {
				if(randx == this.walls[j].indexX && randy == this.walls[j].indexY) {
					isThereAlreadyAWall = false;
					break;
				}
			}

			if(isThereAlreadyAWall) {
				var randc;
				switch( Math.floor(Math.random() * 4) ) {
					case 0:
						randc = "#3165ba";
						break;

					case 1:
						randc = "#ba3192";
						break;

					case 2:
						randc = "#31bab2";
						break;

					case 3:
						randc = "#5d2747";
						break;
				}

				var randr;
				switch( Math.floor(Math.random() * 4) ) {
					case 0:
						randr = 0;
						break;

					case 1:
						randr = Math.PI * .5;
						break;

					case 2:
						randr = Math.PI;
						break;

					case 3:
						randr = Math.PI * 1.5;
						break;
				}

				this.walls.push(new Wall(this.touteLignes[randy][randx].x,
										 this.touteLignes[randy][randx].y,
										 randx,
										 randy,
										 this.tailleCase,
										 randr,
										 randc,
										 this.ctx));

				this.jsonWalls.push({indexX:randx, indexY:randy, color:randc, rotation:randr});
			}
		}

		var targetRandX = Math.floor(Math.random() * (this.nbrColonne - 1)) + 1;
		var targetRandY = Math.floor(Math.random() * (this.nbrLigne - 1)) + 1;

		this.target = new Target(this.touteLignes[targetRandY][targetRandX].x,
								 this.touteLignes[targetRandY][targetRandX].y,
								 this.tailleCase,
								 this.ctx);

		this.jsonTarget = {indexX:targetRandX, indexY:targetRandY};

	},


	draw:function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

		//
		// il faut afficher toutes les cases
		for(var m = 0; m < this.touteLignes.length; m++){
			for(var n = 0; n < this.touteLignes[m].length; n++){
				//UNE CASE
				this.touteLignes[m][n].display();
			}
		}

		//
		// il faut afficher tous les murs
		for(var w = 0; w < this.walls.length; w++) {
			this.walls[w].display();
		}

		//
		// il faut afficher tous les joueurs
		for(var p = 0; p < this.players.length; p++) {
			if(this.target.x == this.players[p].x && this.target.y == this.players[p].y && this.players[p].scale != 100) {
				this.players[p].scale = 100;
				this.canIReset = true;
				this.winner = p;
			}
			if(this.winner != null && this.winner != p) this.players[p].display();
			else this.players[p].display();
		}

		// on affiche par dessus le currentPlayer
		if(this.winner != null) {
			this.players[this.winner].display();

			//IF WIN -> RESTART
			if(this.players[this.winner].scaleAnim > 98 && this.players[this.winner].stopAnim !=true){
				this.players[this.winner].stopAnim = true;

				console.log("restart ?");
				this.restart();
			}
		}

		if(this.target != null) {
			this.target.display();
		}



		requestAnimationFrame(this.draw.bind(this));
	},

	onmouseclick:function(e){
		if(this.canIReset) {

		}
	},

	onkeydown:function(e) {

		if(this.canIMove && this.moveNumber > 0) {
			switch (e.keyCode){
				case 39: // right
					if(this.players[this.currentPlayer].x <= this.touteLignes[0][this.nbrColonne - 1].x - this.tailleCase) {
						if(this.toTheRight)	{
							this.players[this.currentPlayer].move(0);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:0,playerName:this.clientName,type:'movePlayer'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexX++;
						} else if(this.players[this.currentPlayer].color == this.rightWall.color) {
							this.players[this.currentPlayer].move(0);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:0,playerName:this.clientName,type:'movePlayer'}));

							var clockwise;
							if(this.players[this.currentPlayer].y == this.rightWall.y) {
								clockwise = false;
							} else {
								clockwise = true;
							}

							for(var w = 0; w < this.walls.length; w++) {
								this.walls[w].rotate(clockwise);
							}

							this.connection.send(JSON.stringify({clockwise:clockwise,playerName:this.clientName,type:'rotateWalls'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexX++;
						}
					}
				break;

				case 37: // left
					if(this.players[this.currentPlayer].x >= this.tailleCase) {
						if(this.toTheLeft) {
							this.players[this.currentPlayer].move(1);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:1,playerName:this.clientName,type:'movePlayer'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexX--;
						} else if(this.players[this.currentPlayer].color == this.leftWall.color) {
							this.players[this.currentPlayer].move(1);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:1,playerName:this.clientName,type:'movePlayer'}));

							var clockwise;
							if(this.players[this.currentPlayer].y == this.leftWall.y) {
								clockwise = true;
							} else {
								clockwise = false;
							}

							for(var w = 0; w < this.walls.length; w++) {
								this.walls[w].rotate(clockwise);
							}

							this.connection.send(JSON.stringify({clockwise:clockwise,playerName:this.clientName,type:'rotateWalls'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexX--;
						}
					}
				break;

				case 38: // top
					if(this.players[this.currentPlayer].y >= this.tailleCase) {
						if(this.toTheTop) {
							this.players[this.currentPlayer].move(2);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:2,playerName:this.clientName,type:'movePlayer'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexY--;
						} else if(this.players[this.currentPlayer].color == this.topWall.color) {
							this.players[this.currentPlayer].move(2);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:2,playerName:this.clientName,type:'movePlayer'}));

							var clockwise;
							if(this.players[this.currentPlayer].x == this.topWall.x) {
								clockwise = false;
							} else {
								clockwise = true;
							}

							for(var w = 0; w < this.walls.length; w++) {
								this.walls[w].rotate(clockwise);
							}

							this.connection.send(JSON.stringify({clockwise:clockwise,playerName:this.clientName,type:'rotateWalls'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexY--;
						}
					}
				break;

				case 40: // bottom
					if(this.players[this.currentPlayer].y <= this.touteLignes[this.nbrLigne - 1][this.nbrColonne - 1].y - this.tailleCase) {
						if(this.toTheBottom) {
							this.players[this.currentPlayer].move(3);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:3,playerName:this.clientName,type:'movePlayer'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexY++;
						} else if(this.players[this.currentPlayer].color == this.bottomWall.color) {
							this.players[this.currentPlayer].move(3);

							this.connection.send(JSON.stringify({playerColor:this.players[this.currentPlayer].color,direction:3,playerName:this.clientName,type:'movePlayer'}));

							var clockwise;
							if(this.players[this.currentPlayer].x == this.bottomWall.x) {
								clockwise = true;
							} else {
								clockwise = false;
							}

							for(var w = 0; w < this.walls.length; w++) {
								this.walls[w].rotate(clockwise);
							}

							this.connection.send(JSON.stringify({clockwise:clockwise,playerName:this.clientName,type:'rotateWalls'}));

							this.moveNumber--;

							this.resetNeighbors();
							this.currentIndexY++;
						}
					}
				break;
			}

			console.log(this.moveNumber);

			this.checkNeighbors();
		}

	},

	resetNeighbors:function() {
		//
		// on remet les cases précédentes en blanc
		if(this.leftNeighbor != null) {
			if(this.touteLignes[this.currentIndexY][this.leftNeighbor] != undefined){
				this.touteLignes[this.currentIndexY][this.leftNeighbor].from = null;
			}

			if(this.touteLignes[this.currentIndexY][this.rightNeighbor] != undefined){
				this.touteLignes[this.currentIndexY][this.rightNeighbor].from = null;
			}

			if(this.touteLignes[this.topNeighbor] != undefined){
				this.touteLignes[this.topNeighbor][this.currentIndexX].from = null;
			}

			if(this.touteLignes[this.bottomNeighbor] != undefined){
				this.touteLignes[this.bottomNeighbor][this.currentIndexX].from = null;
			}
		}
	},

	checkNeighbors:function() {

		//
		// on récupère l'index du player en cours
		// this.currentIndexX = Math.floor(this.players[this.currentPlayer].x / this.tailleCase);
		// this.currentIndexY = Math.floor(this.players[this.currentPlayer].y / this.tailleCase);

		//
		// on met la case sur lequel se trouve le player en blanc
		this.touteLignes[this.currentIndexY][this.currentIndexX].color = "#000000";

		//
		// on récupère les voisins directs
		this.topNeighbor	= this.currentIndexY - 1;
		this.bottomNeighbor = this.currentIndexY + 1;
		this.rightNeighbor	= this.currentIndexX + 1;
		this.leftNeighbor	= this.currentIndexX - 1;

		this.toTheTop	 = true;
		this.toTheBottom = true;
		this.toTheLeft	 = true;
		this.toTheRight	 = true;

		//
		// * ------- *
		// |         |
		// |    0    |
		// |         |
		// * ------- *
		//
		// on check tous les murs
		for(var w = 0; w < this.walls.length; w++) {
			//
			// on récupère l'index du mur en cours
			var wallIndexX = this.walls[w].indexX;
			var wallIndexY = this.walls[w].indexY;

			//
			// si le mur commence à gauche...
			if(wallIndexX == this.currentIndexX) {
				//
				// ... en haut ...
				if(wallIndexY == this.currentIndexY) {
					//
					// ... avec une rotation 0 ...
					if(this.walls[w].r == 0) {
						this.toTheTop = false;
						this.topWall = this.walls[w];
					}
					//
					// ... avec une rotation PI / 2 ...
					else if(this.walls[w].r == Math.PI / 2) {
						this.toTheLeft = false;
						this.leftWall = this.walls[w];
					}
				}
				//
				// ... en bas ...
				else if(wallIndexY == this.bottomNeighbor) {
					//
					// ... avec une rotation 0 ...
					if(this.walls[w].r == 0) {
						this.toTheBottom = false;
						this.bottomWall = this.walls[w];
					}
					//
					// ... avec une rotation PI + PI / 2 ...
					else if(this.walls[w].r == Math.PI + Math.PI / 2) {
						this.toTheLeft = false;
						this.leftWall = this.walls[w];
					}
				}
			}
			//
			// si le mur commence à droite...
			else if(wallIndexX == this.rightNeighbor) {
				//
				// ... en haut ...
				if(wallIndexY == this.currentIndexY) {
					//
					// ... avec une rotation PI / 2 ...
					if(this.walls[w].r == Math.PI / 2) {
						this.toTheRight = false;
						this.rightWall = this.walls[w];
					}
					//
					// ... avec une rotation PI ...
					else if(this.walls[w].r == Math.PI) {
						this.toTheTop = false;
						this.topWall = this.walls[w];
					}
				}
				//
				// ... en bas ...
				else if(wallIndexY == this.bottomNeighbor) {
					//
					// ... avec une rotation PI + PI / 2 ...
					if(this.walls[w].r == Math.PI + Math.PI / 2) {
						this.toTheRight = false;
						this.rightWall = this.walls[w];
					}
					//
					// ... avec une rotation PI ...
					else if(this.walls[w].r == Math.PI) {
						this.toTheBottom = false;
						this.bottomWall = this.walls[w];
					}
				}
			}
		}

		//
		// on colorie celui à gauche
		if(this.touteLignes[this.currentIndexY][this.leftNeighbor] != undefined){
			if(this.toTheLeft) {
				this.touteLignes[this.currentIndexY][this.leftNeighbor].from = "right";
			}
		}
		//
		// on colorie celui à droite
		if(this.touteLignes[this.currentIndexY][this.rightNeighbor] != undefined){
			if(this.toTheRight) this.touteLignes[this.currentIndexY][this.rightNeighbor].from = "left";
		}
		//
		// on colorie celui en haut
		if(this.touteLignes[this.topNeighbor] != undefined){
			if(this.toTheTop) this.touteLignes[this.topNeighbor][this.currentIndexX].from = "bottom";
		}
		//
		// on colorie celui en bas
		if(this.touteLignes[this.bottomNeighbor] != undefined){
			if(this.toTheBottom) this.touteLignes[this.bottomNeighbor][this.currentIndexX].from = "top";
		}

	},

	setMoveNumber:function(val) {
		this.canIMove = true;

		this.moveNumber = val;
	},

	sendWalls:function(diceName, userName) {
		this.connection.send(JSON.stringify({walls:this.jsonWalls,target:this.jsonTarget,targetDiceName:diceName,targetUserName:userName,type:'walls'}));
	},

	addPlayer:function(color) {
		if(color == 0x3165ba || color == '3165ba') {
			this.players.push(new Player(this.touteLignes[0][0].x, this.touteLignes[0][0].y, this.tailleCase, "#3165ba", this.ctx));
		} else if(color == 0xba3192 || color == 'ba3192') {
			this.players.push(new Player(this.touteLignes[this.nbrLigne - 1][this.nbrColonne - 1].x, this.touteLignes[this.nbrLigne - 1][this.nbrColonne - 1].y, this.tailleCase, "#ba3192", this.ctx));
		} else if(color == 0x31bab2 || color == '31bab2') {
			this.players.push(new Player(this.touteLignes[0][this.nbrColonne - 1].x, this.touteLignes[0][this.nbrColonne - 1].y, this.tailleCase, "#31bab2", this.ctx));
		} else if(color == 0x5d2747 || color == '5d2747') {
			this.players.push(new Player(this.touteLignes[this.nbrLigne - 1][0].x, this.touteLignes[this.nbrLigne - 1][0].y, this.tailleCase, "#5d2747", this.ctx));
		}
	},

	movePlayer:function(color, direction) {
		for(var i = 0; i < this.players.length; i++) {
			if(color == this.players[i].color) {
				this.players[i].move(direction);
				break;
			}
		}
	},

	rotateWalls:function(clockwise) {
		for(var w = 0; w < this.walls.length; w++) {
			this.walls[w].rotate(clockwise);
		}
	}
}
