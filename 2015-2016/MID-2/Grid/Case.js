var Case = function(x,y,w,h,ctx){

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.ctx = ctx;

	this.color = '#ff0000';
	this.colorStroke = '#000000';

}

Case.prototype = {

	display:function(){
		//console.log("draw");
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.colorStroke;
		this.ctx.rect(this.x,this.y,this.w,this.h);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
	}
}