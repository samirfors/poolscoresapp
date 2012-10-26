define([
  'backbone',
  'underscore',
  'jquery',
  'text!../../templates/standings.html'
], function(Backbone, _, $, standingsTpl) {
  'use strict';
  var console = window.console,

  standingsview = Backbone.View.extend({
    el: $('#standings'),

    events: {},

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.players = options.players;
      this.tournament = options.tournament;

      this.eventHub.on('scheduleDone', this.writeTable, this);
      this.eventHub.on('updateTable', this.updateTable, this);
    },

    writeTable: function() {
      var players = this.tournament.get('players'),
          p, player,
          html = _.template(standingsTpl);

      for(p in players) {
        player = players[p];
        $(html({name: player.get('name')})).appendTo(this.$el.children('table'));
      }
    },

    setWinner: function() {

    },

    updateTable: function() {
      console.log('updateTable');
    }

  });
  return standingsview;
});