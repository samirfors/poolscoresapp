define([
  'backbone',
  'underscore',
  'jquery'
],
function(Backbone, _, $){
  var console = window.console,

  playerview = Backbone.View.extend({
    el: $('#players-list'),

    events: {
      'click .available'          : 'addPlayerTournament',
      'click .selected'           : 'removePlayerTournament'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.tournament = options.tournament;
     // this.collection.each(this.add);
      this.collection.bind('add', this.add);
    },

    add: function() {
      var self = this,
          html = _.template($('#player-template').html());
      self.$el.html("");
      this.collection.each(function(object) {
        $(html({player_id: object.id, player_name: object.attributes.name})).appendTo(self.$el);
    });
    },

    generateFixtures: function() {
      console.log('generating fixtures');
    },

    addPlayerTournament: function(e) {
      var player = this.collection.get(e.currentTarget.id);
      $(e.currentTarget).addClass('selected').removeClass('available');
      this.tournament.addPlayer(player);
    },

    removePlayerTournament: function(e) {
      var player = this.collection.get(e.currentTarget.id);
      $(e.currentTarget).removeClass('selected').addClass('available');
      this.tournament.removePlayer(player);
    }
  });
  return playerview;
});