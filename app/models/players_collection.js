var Collection = require('./collection'),
    player_model = require('./player_model');


module.exports = Collection.extend({
  model: player_model,
//  localStorage: new Backbone.LocalStorage("playersCollection"),
  initialize: function() {
    if(navigator.onLine) {
      this.fetch({add:true});
    } else {

     // Get from cache








   }

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