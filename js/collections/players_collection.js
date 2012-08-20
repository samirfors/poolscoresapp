define([
  'models/players_model'
], 
function(players_model) {

  var Players = Backbone.Collection.extend({
    model: players_model,
    url: 'json/players.json'
  });

  return Players;
});