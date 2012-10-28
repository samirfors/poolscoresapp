define([
  'backbone',
  'underscore',
  'jquery',
  'text!templates/standings.html'
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
        $(html({name: player.get('name'),points:0,cuntPoints:0})).appendTo(this.$el.children('table'));
      }
    },

    updateTable: function() {
      var p, standings = this.tournament.getStandings(),
          html = _.template(standingsTpl);

      $(this.$el.children('table')).html("");

      for(p in standings){
        $(html({
          name: standings[p].name,
          points: standings[p].points,
          cuntPoints: standings[p].cuntPoints
        })).appendTo(this.$el.children('table'));
      }
    }

  });
  return standingsview;
});