Scoreboard = new Meteor.Collection('Scoreboard');

var globalScore;

if (Meteor.isClient) {
  Meteor.startup(function () {
  });

  Meteor.subscribe("scores");

  var scoresArray = Scoreboard.find({}, { sort: { score: -1 } , limit:50} );
  console.log(scoresArray);

  Template.scoreboard.scores = function() {
    return scoresArray;
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

              globalScore = data;
              console.log(globalScore);


              Template.yourScore.score = function() {
                console.log(globalScore);
                score = globalScore;
                return score;
              };


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