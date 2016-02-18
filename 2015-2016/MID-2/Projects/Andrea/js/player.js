var Player = function(x, y, offset, color, ctx) {

	this.x = x;
	this.y = y;

	this.xAnim = x;
	this.yAnim = y;

	this.offset = offset;

	this.size = offset / 3;

	this.color = color;

	this.ctx = ctx;

	this.scale = 1;
	this.scaleAnim = 1;

	this.stopAnim = false;

}

Player.prototype = {

	display: function() {
		this.xAnim += (this.x - this.xAnim) * .2;
		this.yAnim += (this.y - this.yAnim) * .2;
		if(!this.stopAnim){
			this.scaleAnim += (this.scale - this.scaleAnim) * .025;
		}
		this.ctx.save();
		this.ctx.translate(this.xAnim, this.yAnim);
		this.ctx.translate(this.offset / 2, this.offset / 2);
		this.ctx.scale(this.scaleAnim, this.scaleAnim);
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.ellipse(0, 0, this.size, this.size, 0, 0, 2 * Math.PI);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
	},

	move: function(direction) {

		switch(direction) {
			case 0: // to the right
				this.x += this.offset;
				break;

			case 1: // to the left
				this.x -= this.offset;
				break;

			case 2: // to the top
				this.y -= this.offset;
				break;

			case 3: // to the bottom
				this.y += this.offset;
				break;
		}

	}

}
