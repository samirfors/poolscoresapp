define([
  'views/playersview',
  'views/fixturesview',
  'collections/players_collection',
  'collections/fixtures_collection'
], function(playersview, fixturesview, players_collection, fixtures_collection){

  var Bootstrapper = Backbone.View.extend({
    
    initialize: function() {
      _.bindAll(this);
      this.eventHub = {};
      _.extend(this.eventHub, Backbone.Events);

      this.players = new players_collection();
      this.fixtures = new fixtures_collection();

      playersview = new playersview({
        eventHub  : this.eventHub,
        collection: this.players
      });

      fixturesview = new fixturesview({
        eventHub  : this.eventHub,
        collection: this.fixtures,
        players   : this.players
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