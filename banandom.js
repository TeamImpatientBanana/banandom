Scoreboard = new Meteor.Collection('Scoreboard');

if (Meteor.isClient) {

  Meteor.subscribe("scores");
  
  Template.scoreboard.scores = function(){
    return Scoreboard.find({}, { sort: { score: -1 } } );
  }

  Template.entryfield.events = {
    "click #submitData": function(event){

      // Submit the form
      var name = document.getElementById('name').value;
      var seedWord = document.getElementById('seedWord').value;

      Meteor.call('calculatedScoreMethod', seedWord, function (err, data) {
        if (!err) {
          console.log(data);

          if(name.value != '' && seedWord.value != ''){
            Scoreboard.insert({
              name: name.value,
              score: data,
              time: Date.now()
            });

          name.value = '';
          seedWord.value = '';
          }
        }
        else {
          console.log(err);
        }
      });
    }
  }
}

if (Meteor.isServer) {

  Scoreboard.allow({
    'insert': function(userId, doc) {
      return true;
    }
  });

  Meteor.publish("scores", function() {
    return Scoreboard.find({}, { sort: { score: -1 } } );
  });
  Meteor.methods({
    calculatedScoreMethod: function(seedWord) {
      //var calculatedScore = newSeed(seedWord);
      var calculatedScore = 5;
      console.log("calculatedScore");
      return calculatedScore;
    }
  });
}