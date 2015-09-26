var Ball = function(posx, posy, rayon, ctx){
    this.x = posx;
    this.y = posy;
    this.rayon = rayon;
    this.ctx = ctx;
    
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.friction = 0.98
    
    this.color = '#ffffff';
}


Ball.prototype = {

    /* LIste des fonctions de l'objets*/
    
    display: function(){
        console.log(this.rayon);
        
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.rayon,0,2*Math.PI,true);
        this.ctx.closePath();
        this.ctx.fill();
        
        
    /*
        if(this.x < window.innerWidth + this.rayon){
            this.x+=this.speedX;
            
        }else if ( this.x>window.innerWidth) {
            
            this.x = 0- this.rayon;
        }
       

       //---------------------------------- solution simplifiée
        if ( this.x>window.innerWidth){
         this.x = - this.rayon;
        }else{
         this.x+=this.speedX;
        }
        
        if ( this.y>window.innerHeight) {
            
            this.y = 0 - this.rayon;
        }else{
            this.y+=this.speedY;
        }
        //---------------------------------- solution simplifiée
        
        
       
        if(this.y < window.innerHeight + this.rayon){
            this.y+=this.speedY;
            
        }else if ( this.y>window.innerHeight) {
            
            this.y = 0 - this.rayon;
        }*/
        
    },

    move:function(){

         if ( this.x>window.innerWidth){
             this.x = - this.rayon;
        }else{
            this.x+=this.speedX;
        }
            
        if ( this.y>window.innerHeight) {
            
            this.y = 0 - this.rayon;
        }else{
            this.y+=this.speedY;
        }

    },
    
    checkTouch:function(){}
    

}