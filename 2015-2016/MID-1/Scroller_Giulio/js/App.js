var App = function(){
  this.camera       = null;
  this.scene        = null;
  this.renderer     = null;
  this.controls     = null;

  this.decoder      = null;
  this.allSpheres   = [];
  this.message      = "hello 1234   ";  // texte à faire défiler. Attention, toutes les lettre ne sont pas codées dans le décodeur
  this.synthetizedMessage = [];
  this.counter      = 0;
  this.grid         = {"x":18,"y":9,"z":3}; // taille de la grille
  this.gridDelta    = {"x":0,"y":1};   // Décalage du défilement dans la grille (En unité de sphere)
  this.speed        = 0.2;                 // Vitesse de défilement du texte
  this.red          = new THREE.Color(1,0,0);
  this.white        = new THREE.Color(1,1,1);

  //positions
  this.target       = {"explode":[],"grid":[],"sphere":[]}; // séquence pour les transformations
  this.sequence     = [];

  this.setup();
}

App.prototype = {

  setup:function(){
    this.camera               = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
		this.scene                = new THREE.Scene();
    this.controls             = new THREE.OrbitControls(this.camera);
    this.controls.maxDistance = 25000;
    this.controls.minDistance = 1;
    this.controls.zoomSpeed   = 0.2;
    this.renderer             = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.domElement.style.position = 'absolute';
    document.body.appendChild( this.renderer.domElement );

    //LISTENERS
    window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    document.body.addEventListener('keydown',this.onKeyDown.bind(this), false );

    //LAYOUT
    //var axisHelper = new THREE.AxisHelper( 500 );
    //this.scene.add( axisHelper );
    this.scene.fog = new THREE.FogExp2( 0x000000, 0.00015 );

    this.decoder = new Decoder();
    var light = new THREE.PointLight(0xcccccc);
    light.position.y = 1500;
    light.position.z = 1500;
    this.scene.add(light);
    this.camera.position.z = 4000;
    this.initGrid();
    this.synthetizeBinaries();

    this.draw();
  },

  initGrid:function(){
    var i = 0;
    var l = this.grid.z * this.grid.y * this.grid.x;
    for(var z = 0;z<this.grid.z;z++){
      var plan = [];
      for(var y = this.grid.y-1;y>=0;y--){
        for(var x = 0;x<this.grid.x;x++){
          var material = new THREE.MeshPhongMaterial({ color: 0xffffff,
					emissive: 0x050505,
					shading: THREE.FlatShading });
          var geometry = new THREE.SphereGeometry(50, 30,30);
          var mesh     = new THREE.Mesh(geometry,material);

          // structure de la grille
          var object = new THREE.Object3D();
          object.position.set( x*100-(this.grid.x*50), y*100-( (this.grid.y-1)*50 ), z*100-( 50*(this.grid.z-1) ) );
          this.target.grid.push(object);
          // structure explosion random
          var randomObject = new THREE.Object3D();
          var dist = 2000;
          randomObject.position.set(dist-Math.random()*dist*2,dist-Math.random()*dist*2,dist-Math.random()*dist*2);
          this.target.explode.push(randomObject);

          // structure spérique
          var phi = Math.acos( -1 + ( 2 * i ) / l );
          var theta = Math.sqrt( l * Math.PI ) * phi;
          var sphereObject = new THREE.Object3D();
          var radius = 1200;
          sphereObject.position.x = radius * Math.cos( theta ) * Math.sin( phi );
          sphereObject.position.y = radius * Math.sin( theta ) * Math.sin( phi );
          sphereObject.position.z = radius * Math.cos( phi );
          this.target.sphere.push(sphereObject);

          //structure initiale
          mesh.position.set(sphereObject.position.x,sphereObject.position.y,sphereObject.position.z);
          plan.push(mesh);
          this.scene.add(mesh);
          console.log("mesh");
          i++;
        }
      }
      this.allSpheres.push(plan);
    }
      this.sequence.push(this.target.explode,this.target.grid,this.target.sphere);
  },
  //fonction qui positionne tout l'encodage de la phrase, colonne par colonne
  synthetizeBinaries:function(){
    var allBinaries = [];
    for(var i = 0;i<this.message.length;i++){
      var letter = this.message[i];
      var binary = this.decoder.getBinaryByColumn(letter);
      for(var j = 0;j<binary.length;j++){
        this.synthetizedMessage.push(binary[j]);
      }
      this.synthetizedMessage.push([0,0,0,0,0,0,0]);
    }
  },

  //mise à jour du texte
  updateMessage:function(){
    //limiteur de vitesse de défilement
    if(this.counter>=1){var shifted = this.synthetizedMessage.shift();this.synthetizedMessage.push(shifted);this.counter = 0;}

    for(var x = this.gridDelta.x;x<this.grid.x;x++){
        for(var y = this.gridDelta.y;y<this.grid.y;y++){
          var activeSphere = this.allSpheres[this.allSpheres.length-1][y*this.grid.x + x];
          if(this.synthetizedMessage[x-this.gridDelta.x]!= undefined && this.synthetizedMessage[x-this.gridDelta.x][y-this.gridDelta.y] == 1){
             activeSphere.material.color = this.red;
          }else{
             activeSphere.material.color = this.white
          }
      }
    }
  },

  //animation entre les différentes structures
  transform:function( targets, duration ) {
    TWEEN.removeAll();
    var w = 0;
    for ( var i = 0; i < this.allSpheres.length; i++ ) {
      for( var j= 0;j <this.allSpheres[i].length;j++){
      var object = this.allSpheres[i][j];
      var target = targets[ w ];
      new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, duration )
        .easing( TWEEN.Easing.Elastic.Out )
        .start();
          w++;
      }
    }
  },

  update:function(){
    TWEEN.update();
    this.controls.update();
    this.updateMessage();
    this.counter+=this.speed;
  },

  draw:function(){
    this.update();
    this.renderer.render( this.scene, this.camera );
    requestAnimationFrame(this.draw.bind(this));
  },

  onWindowResize:function() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  },

  onKeyDown:function(e){
    e.preventDefault();
    var shifted = this.sequence.shift();
    this.sequence.push(shifted);
    this.transform(shifted,2000);
  }
}
