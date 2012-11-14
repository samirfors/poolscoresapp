var View = require('./view'),
    template = require('./templates/players');

module.exports = View.extend({
  el: $('#players'),
  template: template,

  elems: {
    ul  : $('#players-list')
  },

  subscriptions: {},

  events: {
    'click .available'          : 'addPlayerTournament',
    'click .selected'           : 'removePlayerTournament',
    'click .generate-fixtures'  : 'generateFixtures'
  },

  initialize: function(options) {
    _.bindAll(this);
    this.tournament = options.tournament;
    this.collection.bind('add', this.add);
  },

  add: function() {
    var self = this,
        player;

    this.elems.ul.html("");
    this.collection.each(function(object) {
      player = self.template({
        player_id: object.id,
        player_name: object.attributes.name
      })
      self.elems.ul.append(player);
    });
  },

  generateFixtures: function(e) {
    e.preventDefault();
    if (this.tournament.generateMatchSchedule()) {
      Backbone.Mediator.pub('scheduleDone');
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
