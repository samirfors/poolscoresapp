define([
  'views/playersview',
  'views/fixturesview',
  'collections/players_collection'
], function(playersview, fixturesview, players_collection){

  var Bootstrapper = Backbone.View.extend({
    
    initialize: function() {
      _.bindAll(this);
      this.eventHub = {};
      _.extend(this.eventHub, Backbone.Events);

      this.players = new players_collection();

      playersview = new playersview({
        eventHub: this.eventHub,
        collection: this.players
      });

      fixturesview = new fixturesview({
        eventHub: this.eventHub
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