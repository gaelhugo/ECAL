var MIDI_CONNECTION = function(app){
  this.app = app;
  this.setup();
}

MIDI_CONNECTION.prototype = {
  setup:function(){
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({
            sysex: false
        }).then(this.onMIDISuccess.bind(this), this.onMIDIFailure.bind(this));
    } else {
        alert("No MIDI support in your browser.");
    }
  },
  // midi functions
  onMIDISuccess:function(midiAccess) {
      var midi = midiAccess;
      var inputs = midi.inputs.values();
      // loop through all inputs
      for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
          // listen for midi messages
          input.value.onmidimessage = this.onMIDIMessage.bind(this);
          // this just lists our inputs in the console
          this.listInputs(input);
      }
      // listen for connect/disconnect message
      midi.onstatechange = this.onStateChange;
  },
  onMIDIMessage:function(event) {
      var data = event.data,
      cmd = data[0] >> 4,
      channel = data[0] & 0xf,
      _type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
      note = data[1],
      velocity = data[2];
      infos = [cmd,channel,_type,note,velocity];
      this.app.midiControl(infos);
      //console.log(this.cmd,this.channel,this._type,this.note,this.velocity);
  },
  onStateChange:function(event) {
      var port = event.port,
          state = port.state,
          name = port.name,
          type = port.type;
      if (type == "input") console.log("name", name, "port", port, "state", state);
  },
  listInputs:function(inputs) {
      var input = inputs.value;
      console.log("Input port : [ type:'" + input.type + "' id: '" + input.id +
          "' manufacturer: '" + input.manufacturer + "' name: '" + input.name +
          "' version: '" + input.version + "']");
  },
  onMIDIFailure:function(e) {
      console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
  }
}
