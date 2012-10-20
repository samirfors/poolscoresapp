define([
  'collections/fixtures_collection',
  'models/fixture_model'
],
function(fixtures_collection,fixture_model) {

  var Tournament = Backbone.Model.extend({
    defaults: {
      id: null,
      date: null,
      fixtures: new fixtures_collection(),
      players: []
    },

    initialize: function() {
    },

    addPlayer: function(player) {
      var players = this.get('players');
      players.push(player);
    },

    removePlayer: function() {
    },

    generateMatchSchedule: function() {
      var players = this.get('players'),
          fixtures = this.get('fixtures'),
          i,
          rounds = 2,
          p1,
          p2;

      for (i=0; i < players.length * rounds;i++) {
        p1 = players[Math.floor(Math.random()*players.length)];
        p2 = p1;
        while(p1 === p2) {
          p2 = players[Math.floor(Math.random()*players.length)];
        }
        fixtures.push(new fixture_model({home:p1, away:p2}));
      }

      return true;

    }

  });

  return Tournament;
});