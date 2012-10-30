define([
  'backbone',
  'underscore',
  'jquery',
  'text!templates/player.html'
],
function(Backbone, _, $, playerTpl){
  var console = window.console,

  playerview = Backbone.View.extend({
    el: $('#players'),

    elems: {
      ul  : $('#players-list')
    },

    events: {
      'click .available'          : 'addPlayerTournament',
      'click .selected'           : 'removePlayerTournament',
      'click .generate-fixtures'  : 'generateFixtures'
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
          player,
          html = _.template(playerTpl);

      this.elems.ul.html("");
      this.collection.each(function(object) {
        player = $(html({
          player_id: object.id,
          player_name: object.attributes.name
        }));
        self.elems.ul.append(player);
      });
    },

    generateFixtures: function(e) {
      e.preventDefault();
      if (this.tournament.generateMatchSchedule()) {
        this.eventHub.trigger('scheduleDone');
      }
      this.$el.remove();
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