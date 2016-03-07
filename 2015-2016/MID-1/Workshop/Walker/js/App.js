var App = function(){
  this.camera;
  this.scene;
  this.renderer;
  this.controls;
  this.skeleton = new Skeleton(this);
  this.init();
}

App.prototype = {
  midiControl:function(val){
    console.log(val)
    switch(val[3]){
      case 1:
          this.updateBallsSize(val[4]);
      break;
      case 2:
          this.updateBallsResolution(val[4]);
      break;
      case 3:
          this.updateConntectorsRadius(val[4]);
      break;
      case 4:
          this.updateConntectorsResolution(val[4]);
      break;
    }
  },
  init:function(){
    this.scene = new THREE.Scene();
    // CAMERA
    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.set( 0, 100, 500 );
    // INTERACTION
    this.controls = new THREE.OrbitControls(this.camera);
    // RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor( 0x000000); // background color
  	this.renderer.setPixelRatio( window.devicePixelRatio );
  	this.renderer.setSize( window.innerWidth, window.innerHeight );
  	document.body.appendChild( this.renderer.domElement );
    // LIGHT
    var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
  	light1.position.set( 1, 1, 1 );
  	this.scene.add( light1 );
  	var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
  	light2.position.set( 0, 1200, 0 );
  	this.scene.add( light2 );
    // SEKELETON
    this.skeleton.build();
    // LISTENER
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    // ANIMATE
    this.animate();
  },
  animate:function(){
    requestAnimationFrame( this.animate.bind(this) );
  	this.render();
  },
  render:function() {
    this.skeleton.render();
  	this.renderer.render( this.scene, this.camera );
  },
  onWindowResize:function() {
  	this.camera.aspect = window.innerWidth / window.innerHeight;
  	this.camera.updateProjectionMatrix();
  	this.renderer.setSize( window.innerWidth, window.innerHeight );
  },

  //UPDATE FUNCTIONS DEMO
  updateBallsSize:function(val){
    for(var i = 0;i<this.skeleton.allMeshes.length;i++){
        this.skeleton.allMeshes[i].scale.x = val;
        this.skeleton.allMeshes[i].scale.y = val;
        this.skeleton.allMeshes[i].scale.z = val;
    }
  },
  updateBallsResolution:function(val){
    val = Math.floor(val.map(0,127,1,72));
    var geometry = new THREE.SphereGeometry( this.skeleton.headSize, val,val );
    for(var i = 0;i<this.skeleton.allMeshes.length;i++){
        this.skeleton.allMeshes[i].geometry.dispose();
        this.skeleton.allMeshes[i].geometry = geometry;
    }
  },
  updateConntectorsRadius:function(val){
    for(var i = 0;i<this.skeleton.connectors.length;i++){
      this.skeleton.connectors[i].radius = val;
    }
  },
  updateConntectorsResolution:function(val){
    val =  Math.floor(val.map(0,127,3,72));
    for(var i = 0;i<this.skeleton.connectors.length;i++){
      this.skeleton.connectors[i].resolution = val;
    }
  }
}

//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
