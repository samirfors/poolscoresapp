define([
  'models/player_model'
],
function(player_model) {

  var Players = Backbone.Collection.extend({
    model: player_model,

    initialize: function() {

    },

    getAllPlayers: function() {
      var self = this;
     /* $.getJSON('json/players.json', function(data) {
        _.each(data.players, function(player) {
          self.push(new player_model({id:player.id, name:player.name}));
        });
      });*/
      var Player = Parse.Object.extend("Player");
      var query = new Parse.Query(Player);
    //  query.equalTo("playerName", "Dan Stemkoski");
      query.find({
        success: function(results) {
          //alert("Successfully retrieved " + results.length + " players.");

          for(var i=0; i < results.length; i++)
          {
            //console.log(results[i].get("name"));
            console.log(results[i].id);
            self.push(new player_model({id:results[i].id, name:results[i].get("name")}));

          }


        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });


    }

  });

  return Players;
});