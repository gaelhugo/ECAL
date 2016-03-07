var Node = function(headSize,radius,skeleton){
  this.skeleton    = skeleton;
  this.headSize = (headSize == 0)?1:headSize ;
  this.radiusX  = this.radiusY = this.radiusZ = radius;

  // this.headSize = (headSize == 0)?1:headSize ;
  // =>=>=>
  // if(headSize == 0){
  //   this.headSize = 1;
  // }else{
  //   this.headSize = headSize;
  // }

  this.x;
  this.y;
  this.z;

  this.geometry;
  this.meterial;
  this.mesh;
  this.angleX = 0;
  this.angleY = 0;
  this.angleZ = 0;
  this.parent;
  this.children = [];
  this.delta;
  this.param;
  this.size = 10;

  this.setup();
}

Node.prototype = {
  setup:function(){
    this.geometry = new THREE.SphereGeometry( this.headSize, this.size,this.size );
    this.material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x333333, shininess: 4, shading: THREE.FlatShading } )
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.skeleton.parent.scene.add(this.mesh);
    this.skeleton.allMeshes.push(this.mesh);
  },

  updateAngle:function(){
    var newRadius = this.param.radius;
    var speed     = this.param.speed;
    this.delta    = this.param.delta;
    var limit     = this.param.limit;

    this.radiusX  = newRadius[0];
    this.radiusY  = newRadius[1];
    this.radiusZ  = newRadius[2];
    this.angleX  += speed[0];
    this.angleY  += speed[1];
    this.angleZ  += speed[2];

    if(limit!=null){
      if(this.angleY<=limit[0] || this.angleY>=limit[1]) speed[1]*=-1;
      if(this.angleZ<=limit[0] || this.angleZ>=limit[1]) speed[2]*=-1;
    }
  },

  update:function(){
    this.updateAngle();
    this.x = this.parent.x + Math.cos((this.angleX+this.delta[0])*Math.PI/180)*this.radiusX;
    this.y = this.parent.y + Math.sin((this.angleY+this.delta[1])*Math.PI/180)*this.radiusY;
    this.z = this.parent.z + Math.cos((this.angleZ+this.delta[2])*Math.PI/180)*this.radiusZ;
    this.mesh.position.x = this.x;
    this.mesh.position.y = this.y;
    this.mesh.position.z = this.z;

    if(this.children.length!=0){
      for(var i =0;i<this.children.length;i++){
        this.children[i].update();
      }
    }
  }
}
