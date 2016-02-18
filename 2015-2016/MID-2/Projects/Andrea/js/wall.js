var Wall = function(x, y, indexX, indexY, w, r, color, ctx) { // posX, posY, largeur, rotation, couleur, ctx

	this.x = x;
	this.y = y;
	this.indexX = indexX;
	this.indexY = indexY;
	this.w = w;
	this.h = w / 8;	// hauteur
	this.rAnim = r;
	this.rAnimNew = r;
	this.r = r; // 0, PI/2, PI, PI + PI/2
	this.ctx = ctx;

	this.color = color;

}

Wall.prototype = {

	display: function(){
		this.rAnim += (this.rAnimNew - this.rAnim) * .2;

		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.rAnim);
		this.ctx.beginPath();
		this.ctx.rect(0, -this.h / 2, this.w - this.w / 5, this.h);
		this.ctx.closePath();
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.ellipse(this.w - this.w / 5, 0, this.h / 2, this.h / 2, 0, 0, 360);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.ellipse(0, 0, this.w / 10, this.w / 10, 0, 0, 360);
		this.ctx.closePath();
		this.ctx.fillStyle = "black";
		this.ctx.strokeStyle = "white";
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.restore();
	},

	rotate: function(clockwise){
		this.r += clockwise ? Math.PI / 2 : -Math.PI / 2;
		this.rAnimNew += clockwise ? Math.PI / 2 : -Math.PI / 2;

		if(this.r == 2 * Math.PI) {
			this.r = 0;
		} else if(this.r == -Math.PI / 2) {
			this.r = Math.PI + Math.PI / 2;
		}
	}

}
