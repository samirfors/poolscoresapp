define([
  'models/player_model'
], 
function(player_model) {

  var Players = Backbone.Collection.extend({
    model: player_model,

    initialize: function() {
      this.getPlayers();
    },

    getPlayers: function() {
      var self = this;
      $.getJSON('json/players.json', function(data) {
        _.each(data.players, function(player) {
          self.push(new player_model({id:player.id, name:player.name}));
        });
      });
    }
  });

  return Players;
});