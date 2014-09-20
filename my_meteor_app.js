Scoreboard = new Meteor.Collection('Scoreboard');
if (Meteor.isClient) {
  var scores = Meteor.subscribe("scores");
  //Template.scoreboard.scores = function(){
  //  return Scoreboard.find({}, { sort: { score: -1 } } ).limit(50);
  //}
  Template.entryfield.events = {
    "click button.entryfield": function(event){
      // Submit the form
      var name = document.getElementById('name');
      var seedWord = document.getElementById('seedWord');

      debugger;

      if(name.value != '' && seedWord.value != ''){
        Scoreboard.insert({
          name: name.value,
          score: seedWord.value,
          time: Date.now()
        });

        name.value = '';
        message.value = '';
      }
    }
  }
}

if (Meteor.isServer) {
  Meteor.publish("scores", function() {
    return Scoreboard.find({}, { sort: { score: -1 } } );
  });
}