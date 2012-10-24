define([
  'models/player_model'
],
function(player_model) {

  var console = window.console,
      alert   = window.alert,

  Players = Parse.Collection.extend({
    model: player_model,

    initialize: function() {
      this.fetch({add:true});
    },

    getAllPlayers: function() {
      var self = this,
          Player = Parse.Object.extend("Player"),
          query = new Parse.Query(Player),
          i, id;

      query.find({
        success: function(results) {
          for(i=0; i < results.length; i++)
          {
            self.add(new player_model({ name:results[i].get("name")}));
            self.last(id);
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