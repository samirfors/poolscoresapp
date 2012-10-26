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
          p, player,
          html = _.template($('#standings-template').html());

      for(p in players) {
        player = players[p];
        $(html({name: player.get('name')})).appendTo(this.$el);
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