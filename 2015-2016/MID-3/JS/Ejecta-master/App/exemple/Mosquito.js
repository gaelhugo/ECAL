


var Mosquito = function(posx, posy, rayon, ctx){
    this.posX=20;
    this.posY=100;
    this.rayon = rayon;
    this.ctx = ctx;
    
    this.speedX = 10;
    this.speedY = 10;
    this.friction = 0.98;
    
    this.color = '#ffffff';
}

Mosquito.prototype = {
    
    /* Liste des fonctions de l'objet */
    
    display: function(){
        //console.log(this.rayon);
      
        
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rayon, 0, 2*Math.PI, true);
        this.ctx.closePath();
        this.ctx.fill();
    },
    
    animate : function (arc){
    
    
    },
    
    checkTouch:function(){}

}