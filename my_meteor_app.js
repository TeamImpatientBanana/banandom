Scoreboard = new Meteor.Collection('Scoreboard');
if (Meteor.isClient) {
  Meteor.subscribe("scores");
  Template.scoreboard.scores = function(){
    return Scoreboard.find({}, { sort: { score: -1 } } );
  }

  Template.entryfield.events = {
    "click #submitData": function(event){
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
        //score.value = '';
      }
    }
  }
}

if (Meteor.isServer) {
  Meteor.publish("scores", function() {
    return Scoreboard.find({}, { sort: { score: -1 } } );
  });
}