var Skeleton = function(parent){
  this.parent = parent;
  this.jonction   = 1;
  this.headSize   = 2;
  this.nodes = [];
  this.connectors = [];
  this.allMeshes  = [];
}

Skeleton.prototype = {

  build:function(){
    //components
    var thorax      = new Node(0,0,this);
    thorax.parent   = {"x":0,"y":120,"z":0};
    thorax.param    = {"radius":[0,5,0],"speed":[0,10,0], "delta":[0,0,0],"limit":null};
    this.nodes.push(thorax);

    var head        = new Node(this.headSize,0,this);
    head.parent     = thorax;
    head.angleY     = 90;
    head.param      = {"radius":[0,40,0],"speed":[0,0,0], "delta":[0,0,0],"limit":null};
    thorax.children.push(head);

    var hip         = new Node(0,0,this);
    hip.parent      = thorax;
    hip.angleY      = -90;
    hip.param       = {"radius":[0,90,0],"speed":[0,0,0], "delta":[0,0,0],"limit":null};
    thorax.children.push(hip);

    var hipRight    = new Node(this.jonction,0,this);
    hipRight.parent = hip;
    hipRight.angleY = -45;
    hipRight.param  = {"radius":[-20,20,0],"speed":[0,0,0], "delta":[0,0,0], "limit":null};
    hip.children.push(hipRight);

    var hipLeft     = new Node(this.jonction,0,this);
    hipLeft.parent  = hip;
    hipLeft.angleY  = -45;
    hipLeft.param   = {"radius":[20,20,0],"speed":[0,0,0], "delta":[0,0,0], "limit":null};
    hip.children.push(hipLeft);

    var rShoulder   = new Node(this.jonction,0,this);
    rShoulder.parent= thorax;
    rShoulder.param = {"radius":[-45,2,2],"speed":[0,5,5], "delta":[0,0,0],"limit":null};
    thorax.children.push(rShoulder);

    var relbow      = new Node(this.jonction,0,this);
    relbow.parent   = rShoulder;
    relbow.angleY   = -90;
    relbow.param    = {"radius":[0,60,30],"speed":[0,0,5], "delta":[0,0,180],"limit":null};
    rShoulder.children.push(relbow);

    var rhand       = new Node(this.jonction,0,this);
    rhand.parent    = relbow;
    rhand.angleY    = -50;
    rhand.angleZ    = -50;
    rhand.param     = {"radius":[0,60,60],"speed":[0,1,1], "delta":[0,-20,-20], "limit":[-60,-40]};
    relbow.children.push(rhand);

    var lShoulder   = new Node(this.jonction,0,this);
    lShoulder.parent= thorax;
    lShoulder.param = {"radius":[45,2,2],"speed":[0,-5,5], "delta":[0,0,180],"limit":null};
    thorax.children.push(lShoulder);

    var lelbow      = new Node(this.jonction,0,this);
    lelbow.parent   = lShoulder;
    lelbow.angleY   = -90;
    lelbow.param    = {"radius":[0,60,30],"speed":[0,0,5], "delta":[0,0,0], "limit":null};
    lShoulder.children.push(lelbow);

    var lhand       = new Node(this.jonction,0,this);
    lhand.parent    = lelbow;
    lhand.angleY    = -50;
    lhand.angleZ    = -50;
    lhand.param     = {"radius":[0,60,60],"speed":[0,1,1], "delta":[0,-20,-20], "limit":[-60,-40]};
    lelbow.children.push(lhand);

    var rKnee       = new Node(this.jonction,-30,this);
    rKnee.parent    = hipRight;
    rKnee.angleY    = -90;
    rKnee.param     = {"radius":[0,90,45],"speed":[0,0,5], "delta":[0,0,0],"limit":null};
    hipRight.children.push(rKnee);

    var rFoot       = new Node(this.jonction,0,this);
    rFoot.parent    = rKnee;
    rFoot.angleY    = -110;
    rFoot.angleZ    = -110;
    rFoot.param     = {"radius":[0,120,30],"speed":[0,1,1], "delta":[0,0,0], "limit":[-140,-100]};
    rKnee.children.push(rFoot);

    var lKnee       = new Node(this.jonction,30,this);
    lKnee.parent    = hipLeft;
    lKnee.angleY    = -90;
    lKnee.param     = {"radius":[0,90,45],"speed":[0,0,5], "delta":[0,0,180],"limit":null};
    hip.children.push(lKnee);

    var lFoot       = new Node(this.jonction,0,this);
    lFoot.parent    = lKnee;
    lFoot.angleY    = -110;
    lFoot.angleZ    = -110;
    lFoot.param     = {"radius":[0,120,30],"speed":[0,-1,-1], "delta":[0,0,0], "limit":[-140,-100]};
    lKnee.children.push(lFoot);

    this.connectors.push( new Connector(thorax.mesh,lShoulder.mesh,this) );
    this.connectors.push( new Connector(head.mesh,thorax.mesh,this) );
    this.connectors.push( new Connector(thorax.mesh,hip.mesh,this) );
    this.connectors.push( new Connector(thorax.mesh,rShoulder.mesh,this) );
    this.connectors.push( new Connector(rShoulder.mesh,relbow.mesh,this) );
    this.connectors.push( new Connector(relbow.mesh,rhand.mesh,this) );
    this.connectors.push( new Connector(lShoulder.mesh,lelbow.mesh,this) );
    this.connectors.push( new Connector(lelbow.mesh,lhand.mesh,this) );
    this.connectors.push( new Connector(hip.mesh,hipRight.mesh,this) );
    this.connectors.push( new Connector(hip.mesh,hipLeft.mesh,this) );
    this.connectors.push( new Connector(hipRight.mesh,rKnee.mesh,this) );
    this.connectors.push( new Connector(rKnee.mesh,rFoot.mesh,this) );
    this.connectors.push( new Connector(hipLeft.mesh,lKnee.mesh,this) );
    this.connectors.push( new Connector(lKnee.mesh,lFoot.mesh,this) );
  },

  render:function(){
    /*
      head connected to shoulders, thorax and hip
    */
    for(var i = 0;i<this.nodes.length;i++){
      this.nodes[i].update();
    }
    for(var i = 0;i<this.connectors.length;i++){
      this.connectors[i].update();
    }
  }
}
