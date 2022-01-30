Demo = function () {

  var output = document.getElementById('output'),
    demo = document.getElementById('demo'),
    count = 0;

  var log = function (msg, separate) {
    count = count + (separate ? 1 : 0);
    output.value = count + ": " + msg + "\n" + (separate ? "\n" : "") + output.value;
    demo.className = fsm.current;
  };

  var fsm = StateMachine.create({

    events: [
      { name: 'start', from: 'genesis', to: 'state0' },
      { name: 'ingest', from: 'state0', to: 'state1' },
      { name: 'deidentify', from: 'state1', to: 'state2' },
      { name: 'deduplicate', from: 'state2', to: 'state3' },
      { name: 'dataintegrity', from: 'state3', to: 'state4' },
      { name: 'prefordistribution', from: 'state4', to: 'state5' },
      { name: 'distribute', from: 'state5', to: 'state6' },
    ],

    callbacks: {
      onbeforestart: function (event, from, to) { log("STARTING UP"); },
      onstart: function (event, from, to) { log("READY"); },

      onbeforeingest: function (event, from, to) { log("START   EVENT: ingest!", true); },
      onbeforedeidentify: function(event, from, to) {log("START EVENT: deidentify", true)},
      onbeforededuplicate: function(event, from, to) {log("START EVENT: deduplicate", true)},
      onbeforededataintegrity: function(event, from, to) {log("START EVENT: dataintegrity", true)},
      onbeforedeprefordistribution: function(event, from, to) {log("START EVENT: prefordistribution", true)},
      onbeforededistribute: function(event, from, to) {log("START EVENT: distribute", true)},

      oningest: function (event, from, to) { log("FINISH  EVENT: ingest!"); },
      ondeidentify: function (event, from, to) { log("FINISH  EVENT: DeIdentify!"); },
      ondeduplicate: function (event, from, to) { log("FINISH EVENT: DeDuplicate!"); },
      ondataintegrity: function(event, from, to) { log("FINISH EVENT: Data Integrity"); },
      onprefordistribution: function(event, from, to) { log("FINISH Event: Pre for Distribution"); },
      ondistribute: function(event, from, to) { log("FINISH EVENT: Distribute"); },

      onleavestate0: function (event, from, to) { log("LEAVE   STATE: state0"); },
      onleavestate1: function (event, from, to) { log("LEAVE   STATE: state1"); },
      onleavestate2: function (event, from, to) { log("LEAVE   STATE: state2"); async(to); return false; },
      onleavestate3: function (event, from, to) { log("LEAVE   STATE: state3",1); async(to); return false; },
      onleavestate4: function (event, from, to) { log("LEAVE   STATE: state4",1); async(to); return false; },
      onleavestate5: function (event, from, to) { log("LEAVE   STATE: state5",1); async(to); return false; },
      onleavestate6: function (event, from, to) { log("LEAVE   STATE: state6"); async(to); return false; },

      onstate0: function (event, from, to) { log("ENTER   STATE: state0"); },
      onstate1: function (event, from, to) { log("ENTER   STATE: state1"); },
      onstate2: function (event, from, to) { log("ENTER   STATE: state2"); },
      onstate3: function (event, from, to) { log("ENTER   STATE: state3"); },
      onstate4: function (event, from, to) { log("ENTER   STATE: state4"); },
      onstate5: function (event, from, to) { log("ENTER   STATE: state5"); },
      onstate6: function (event, from, to) { log("ENTER   STATE: state6"); },

      onchangestate: function (event, from, to) { log("CHANGED STATE: " + from + " to " + to); }
    }
  });

  var async = function (to) {
    pending(to, 3);
    setTimeout(function () {
      pending(to, 2);
      setTimeout(function () {
        pending(to, 1);
        setTimeout(function () {
          fsm.transition(); // trigger deferstate2 state transition
        }, 1000);
      }, 1000);
    }, 1000);
  };

  var pending = function (to, n) { log("PENDING STATE: " + to + " in ..." + n); };

  fsm.start();
  return fsm;

}();


