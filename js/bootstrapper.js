define([
  'backbone',
  'underscore',
  'views/playersview',
  'views/fixturesview',
  'views/standingsview',
  'views/saveview',
  'collections/players_collection',
  'models/tournament_model'

], function(Backbone, _, playersview, fixturesview, standingsview, saveview, players_collection, tournament_model){
  var console = window.console,

  Bootstrapper = Backbone.View.extend({

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

      standingsview = new standingsview({
        eventHub  : this.eventHub,
        tournament: this.tournament
      });

      saveview = new saveview({
        eventHub  : this.eventHub,
        tournament: this.tournament
      });
    }

  });

  var initialize = function(){
    var bootstrapper = new Bootstrapper();
    return bootstrapper;
  };
  return {
    initialize: initialize
  };
});