define([
  'views/playersview',
  'views/fixturesview',
  'collections/players_collection',
  'models/tournament_model',
  'models/player_model',

], function(playersview, fixturesview, players_collection, tournament_model,player_model){

  var Bootstrapper = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this);
      this.eventHub = {};
      _.extend(this.eventHub, Backbone.Events);

      this.players = new players_collection();

    
      this.tournament = new tournament_model();

     // this.players.getAllPlayers();

      playersview = new playersview({
        eventHub  : this.eventHub,
        collection: this.players,
        tournament: this.tournament
      });

      fixturesview = new fixturesview({
        eventHub  : this.eventHub,
        players   : this.players,
        tournament: this.tournament
      });
    }

  });

  var initialize = function(){
    var bootstrapper = new Bootstrapper();
  };
  return {
    initialize: initialize
  };
});