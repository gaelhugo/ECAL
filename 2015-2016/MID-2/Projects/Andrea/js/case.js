var Case = function(x,y,w,h,ctx){

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.ctx = ctx;

	this.color = '#000000';
	this.colorStroke = '#ffffff';

	this.from = null;
}

Case.prototype = {

	display:function(){
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.w, this.h);
		this.ctx.closePath();
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.colorStroke;
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.fillStyle = "white";
		switch(this.from) {
			case "left":
				this.ctx.beginPath();
				this.ctx.ellipse(0, this.h / 2, this.h / 8, this.h / 8, -Math.PI / 2, 0, Math.PI);
				this.ctx.fill();
				this.ctx.closePath();
			break;
			case "right":
				this.ctx.beginPath();
				this.ctx.ellipse(this.w, this.h / 2, this.h / 8, this.h / 8, Math.PI / 2, 0, Math.PI);
				this.ctx.fill();
				this.ctx.closePath();
			break;
			case "top":
				this.ctx.beginPath();
				this.ctx.ellipse(this.w / 2, 0, this.h / 8, this.h / 8, 0, 0, Math.PI);
				this.ctx.fill();
				this.ctx.closePath();
			break;
			case "bottom":
				this.ctx.beginPath();
				this.ctx.ellipse(this.w / 2, this.h, this.h / 8, this.h / 8, Math.PI, 0, Math.PI);
				this.ctx.fill();
				this.ctx.closePath();
			break;
		}
		this.ctx.restore();
	}
}
