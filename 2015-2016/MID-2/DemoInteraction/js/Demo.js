var Demo = function(connection){
  this.monCalque = document.getElementById("output");
  this.connection = connection;
  this.username = null;
  this.dicename = null;
}

Demo.prototype = {

	initDemo:function(){

      this.monCalque.innerHTML = 'JS has control';
      document.addEventListener('click',this.onClick.bind(this));
	},

  onClick:function(e){
    console.log('click');
    //communiquer avec le serveur
    if(this.username != null){
      this.connection.send(JSON.stringify({username:this.username,type:'click'}));
    }
  },

  displayData:function(diceName,userName){
      this.username = userName;
      this.dicename = diceName;
      this.monCalque.innerHTML = "Dice name : " + diceName + " / userName : " + userName;
  },

  afficherQuiAClicke:function(username){
        this.monCalque.innerHTML += '<br/><br/>';
        var identite;
        if(username == this.username){
          identite = "moi";
        }else{
          identite = "pas moi";
        }

          this.monCalque.innerHTML += "Quelqu'un a cliqué, c'est " + identite + ", avec le nom d'utilisateur : " + username;

  }


}
