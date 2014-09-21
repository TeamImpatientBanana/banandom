Scoreboard = new Meteor.Collection('Scoreboard');

if (Meteor.isClient) {

  Meteor.subscribe("scores");
  
  Template.scoreboard.scores = function(){
    return Scoreboard.find({}, { sort: { score: -1 } } );
  };

  Template.entryfield.events = {
    "keydown #handle": function(event){
      if (event.which === 13) {

        // Submit the form
        var seedWord = document.getElementById('seed').value;
        var handle = document.getElementById('handle').value;
        console.log(seedWord);
        console.log(handle);

        if (seedWord !== '') {
          Meteor.call('calculatedScoreMethod', seedWord, function (err, data) {
            if (!err) {

              console.log(data);
              Template.yourScore.score = data;

              if(handle !== ''){

                Scoreboard.insert({
                  name: handle,
                  score: data,
                  time: Date.now()
                });

                seedWord = document.getElementById('seed');
                handle = document.getElementById('handle');
                seedWord.value = '';
                handle.value = '';
              }
            }
            else {
              console.log(err);
            }
          });
        }
      }
    }
  };
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
      var hash = CryptoJS.SHA256(seedWord).toString();
      console.log(hash);
      var calculatedScore = newSeed(hash);
      //var calculatedScore = 5;
      console.log(calculatedScore);
      return calculatedScore;
    }
  });
}