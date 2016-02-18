var Target = function(x, y, offset, ctx) {

	this.x = x;
	this.y = y;

	this.offset = offset;

	this.size = offset / 5;

	this.color = "#FFD700";

	this.ctx = ctx;

}

Target.prototype = {

	display: function() {
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.beginPath();
        this.ctx.translate(this.offset / 2, this.offset / 2)
        this.ctx.rotate(Math.PI / 4);
        this.ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
		// this.ctx.ellipse(0, 0, this.size, this.size, 0, 0, 2 * Math.PI);
		this.ctx.closePath();
        this.ctx.fillStyle = this.color;
		this.ctx.fill();
		this.ctx.restore();
	}

}
