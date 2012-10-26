define([
  'backbone',
  'underscore',
  'jquery'
], function(Backbone, _, $) {
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

      this.eventHub.on('scheduleDone', this.listPlayers, this);
    },

    listPlayers: function() {
      var players = this.tournament.get('players'),
          p, player;

      for(p in players) {
        player = players[p];
        this.$el.append(player.get('name'));
      }
    },

    writeTable: function() {

    },

    setWinner: function() {

    },

    updateStandings: function() {

    }

  });
  return standingsview;
});