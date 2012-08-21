define([
  'models/players_model'
], 
function(players_model) {

  var Players = Backbone.Collection.extend({
    model: players_model,

    initialize: function() {
      this.getPlayers();
    },

    getPlayers: function() {
      var self = this;
      $.getJSON('json/players.json', function(data) {
        _.each(data.players, function(player) {
          self.push(new players_model({id:player.id, name:player.name}));
        });
      });
    }
  });

  return Players;
});