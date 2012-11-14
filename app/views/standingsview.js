var View = require('./view'),
    template = require('./templates/standings');

module.exports = View.extend({
  el: $('#standings'),
  template: template,

  elems: {
    table : $('#standings-table')
  },

  subscriptions: {
    'scheduleDone': 'writeTable',
    'updateTable' : 'updateTable'
  },

  events: {},

  initialize: function(options) {
    _.bindAll(this);
    this.tournament = options.tournament;
  },

  writeTable: function() {
    var players = this.tournament.getPlayers();
    this.drawTable(players);
  },

  updateTable: function() {
    var standings = this.tournament.getStandings();
    this.elems.table.html("");
    this.drawTable(standings);
  },

  drawTable: function(players) {
    _.each(players, function(player) {
      this.elems.table.append(this.template({
        name: player.name,
        points: player.points,
        cuntPoints: player.cuntPoints
      }));
    }, this);
  }
});