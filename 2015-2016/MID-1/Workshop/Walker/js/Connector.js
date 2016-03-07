var Connector = function(node1,node2,skeleton){
    this.skeleton = skeleton;
    this.node1 = node1;
    this.node2 = node2;
    this.line;// BASIC LINE

    this.geom;
    this.tube = null;
    this.mat  = new THREE.MeshLambertMaterial({color: 0xffffff});
    this.path = new THREE.CatmullRomCurve3([this.node1.position,this.node2.position]);
    this.radius = 1;
    this.resolution = 3;

    // BASIC LINE
    // var curve = new THREE.CatmullRomCurve3( [
    //   this.node1.position,
    //   this.node2.position
    // ] );
    // var geometry = new THREE.Geometry();
    // geometry.vertices = curve.getPoints( 1 );
    // var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
    // this.line = new THREE.Line( geometry, material );
    // scene.add(this.line);

}

Connector.prototype = {

    update:function(){
      // BASIC LINE UPDATE
      // this.line.geometry.vertices[0] = this.node1.position;
      // this.line.geometry.vertices[1] = this.node2.position;
      // this.line.geometry.verticesNeedUpdate = true;

      //
      if(this.tube != null){
        this.tube.geometry.dispose()
        this.tube.material.dispose()
        //this.tube.texture.dispose()
        this.skeleton.parent.scene.remove(this.tube);
      }

      this.path.points[0] = this.node1.position;
      this.path.points[1] = this.node2.position;
      this.geom = new THREE.TubeGeometry(this.path,1, this.radius, this.resolution, false);
      this.tube = new THREE.Mesh(this.geom,this.mat);
      this.skeleton.parent.scene.add(this.tube);

    }

}
