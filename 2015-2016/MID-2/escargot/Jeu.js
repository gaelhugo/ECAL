var Jeu = function(){
	
	this.canvas = document.getElementById("canvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.ctx = this.canvas.getContext('2d');
	
	this.nbrLigne = 10;
	this.nbrColonne = 10;
	this.tailleCase = 60;
	
	this.touteLignes = [];
	this.touteCases = [];
	this.nbrRandom = 0;
	this.addElements = false;
	this.dx = 0;
    this.dy = 1;
    this.originLimit = 1;
    this.x_limit = 1;
    this.y_limit = 0;
    this.x = 2;
    this.y = 0;
	
	this.setup();
}

Jeu.prototype = {
	
	setup:function(){
		/*
		for(var j = 0; j < this.nbrLigne; j++){
			var ligne = [];
			for(var i = 0; i < this.nbrColonne; i++){	
				var maCase = new Case(i*this.tailleCase,j*this.tailleCase,this.tailleCase,this.tailleCase,this.ctx);
				ligne.push(maCase);	
			}
			this.touteLignes.push(ligne);	
		}
		*/
		//document.addEventListener("click", this.onemouseclick.bind(this)); // .bind(this) -> lie la fonction javascript au prototype
		var left = window.innerWidth/2 - 6*this.tailleCase/2;
		var top = window.innerHeight/2 - this.tailleCase/2;
		for(var i=0;i<this.x*2;i++){
			var maCase = new Case(left +i*this.tailleCase,top,this.tailleCase,this.tailleCase,this.ctx);
			this.touteCases.push(maCase);
		}
		
		document.addEventListener("click", this.onemouseclick.bind(this));
		
		this.draw();
	},
	
	onemouseclick:function(e){
		//console.log(e);
			this.nbrRandom = Math.ceil(Math.random()*6);
			console.log(this.nbrRandom);
			this.addElements = true;
			},
	
	draw:function(){
		
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		/*
		for(var m = 0; m< this.touteLignes.length;m++){
			for(var n = 0; n < this.touteLignes[m].length;n++){
				this.touteLignes[n][m].draw(); // on affiche toutes les lignes et les colonnes
				
			}
		}
		*/
		
		for(var i = 0;i<this.touteCases.length;i++){
			this.touteCases[i].draw();
		}
		
		if(this.addElements){
			if(this.nbrRandom>0){
								
				if( this.dx > 0 ){//Dir right
				       if(this.x > this.x_limit){
				           this.dx = 0;
				           this.dy = 1;
				       }
				   }
				   else if( this.dy > 0 ){ //Dir up
				       if(this.y > this.y_limit){
				           this.dx = -1;
				           this.dy = 0;
				       }
				   }
				   else if(this.dx < 0){ //Dir left
				       if(this.x < (-1 * this.x_limit)){
				           this.dx = 0;
				           this.dy = -1;
				       }
				   }
				   else if(this.dy < 0) { //Dir down
				       if(this.y < (-1 * this.y_limit)){
				           this.dx = 1;
				           this.dy = 0;
				           this.x_limit += 1;
				           this.y_limit += 1;
				       }
				   }
				   
				    this.x += this.dx;
				    this.y += this.dy; 
				    
				    console.log(this.x,this.y);
				
				var maCase = new Case(this.x*this.tailleCase + this.touteCases[this.originLimit].x,this.y*this.tailleCase+this.touteCases[this.originLimit].y,this.tailleCase,this.tailleCase,this.ctx);
				this.touteCases.push(maCase);
				this.nbrRandom--;
			}else{
				this.addElements = false;
			}
			
		}
		
		requestAnimationFrame(this.draw.bind(this)); // .bind(this) -> lie la fonction javascript au prototype
	}
	
}

var monJeu = new Jeu();