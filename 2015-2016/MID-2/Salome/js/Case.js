var Case = function(x,y,radiusMax,angle,angleDepart,ctx,id){
	this.x = x;
	this.y = y;
	this.radius= radiusMax;
	this.angle = angle;
	this.angleDepart = angleDepart*Math.PI/180;
	this.ctx = ctx;

	this.color = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
	this.strokeColor = '#8ec448';
	this.ID = id;
}

Case.prototype= {

	display:function(){
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.moveTo(this.x,this.y);
		this.ctx.lineTo( Math.cos(this.angleDepart)*this.radius + this.x, Math.sin(this.angleDepart)*this.radius +this.y);
		this.ctx.arc(this.x,this.y,this.radius,this.angleDepart,this.angle+this.angleDepart,false);
		this.ctx.lineTo(this.x, this.y);
		
		
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}
}