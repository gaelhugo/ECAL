var Case = function(x,y,radiusMax,angle,angleDepart,ctx,id,caseWidth){
	this.x = x;
	this.y = y;
	this.radius= radiusMax;
	this.angle = angle;
	this.angleDepart = angleDepart*Math.PI/180;
	this.ctx = ctx;
	this.caseWidth = caseWidth;
	this.color = this.originalColor = 'rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
	this.strokeColor = '#8ec448';
	this.ID = id;
	//DE QUEL GRAND CERCLE CETTE CASE FAIT PARTIE
	this.areaIndex = (this.radius / this.caseWidth)-1;
	//rotation in RAD
	this.rotation = {"x":0 * Math.PI/180};

}

Case.prototype= {

	display:function(){
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.moveTo(this.x,this.y);
		this.ctx.lineTo( Math.cos(this.angleDepart + this.rotation.x)*this.radius + this.x, Math.sin(this.angleDepart+this.rotation.x)*this.radius +this.y);
		this.ctx.arc(this.x,this.y,this.radius,this.angleDepart+this.rotation.x,this.angle+this.angleDepart+this.rotation.x,false);
		this.ctx.lineTo(this.x, this.y);
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	},

	check:function(x,y){
		var angle = this.getAngle(this.x,this.y,x,y)*180/Math.PI;
			angle = (angle<0)?360+angle:angle;
			angle = angle - this.rotation.x*180/Math.PI;
			if(angle<0){
				angle+=360;
				//this.rotation.x-=360*Math.PI/180; 
			}
		var dist = this.getDistance(this.x,this.y,x,y);
		if(angle>=this.angleDepart*180/Math.PI && angle<=this.angleDepart*180/Math.PI+this.angle*180/Math.PI && dist<this.radius && dist>(this.radius-this.caseWidth)){
			this.color = '#ffffff';
			return {"id":this.ID,"radius":this.radius};
		}else{
			this.color = this.originalColor;
		}
	},
	/*
		Récupérer la distance entre 2 points
	*/
	getDistance:function(x1,y1,x2,y2){
		return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
	},
	/* 
		Récupérer l'angle entre 2 points en radian
	*/
	getAngle:function(x1,y1,x2,y2){
		return Math.atan2(y2 - y1, x2 - x1);
	},
	tween:function(val){
		// IL FAUT CHECKER LA ROTATION ICI CAR ELLE PEUT DEVENIR TRES GRANDE SI ON NE LUI CLICK JAMAIS DESSUS
		var finalRotation = val*Math.PI/180+this.rotation.x;
		/* good mais reviens en arrière
		if(finalRotation>=360*Math.PI/180){
			finalRotation = 0;
		}
		*/
		var tween = new TWEEN.Tween(this.rotation)
		.to({x:finalRotation},1000)
		.easing(TWEEN.Easing.Elastic.Out)
		.onComplete((function(){
			if(this.rotation.x>=360*Math.PI/180){
				this.rotation.x = 0;
			}
		}).bind(this))
		.start();
	}
}