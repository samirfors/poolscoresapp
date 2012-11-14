var View = require('./view'),
    template = require('./templates/fixture'),
    template_meta = require('./templates/fixture-meta');

module.exports = View.extend({
  el: $('#fixtures'),
  template: template,

  elems: {
    ul      : $('#fixtures-list')
  },

  subscriptions: {
    'scheduleDone': 'showFixtures'
  },

  events: {
    'click .home'             : 'setWinner',
    'click .away'             : 'setWinner'
  },

  initialize: function(options) {
    _.bindAll(this);
    this.players = options.players;
    this.tournament = options.tournament;

  },

  showFixtures: function() {
    var fixtures = this.tournament.get('fixtures'),
        fixture, i, fixt;
    for(i in fixtures) {
      fixture = fixtures[i];
      fixt = $(this.template({
              player_home: fixture.get('home').get('name'),
              player_away: fixture.get('away').get('name')
            }));
      fixt.data('fixture',fixture);
      this.elems.ul.append(fixt);
    }
  },

  setWinner: function(e) {
    var fixture = $(e.currentTarget).parent().data('fixture'),
        cuntpoints,
        self = this;

    this.removeMeta();
    $(e.currentTarget).siblings().removeClass('winner');
    $(e.currentTarget).addClass('winner');
    this.addMeta($(e.currentTarget));

    $('.fixt-done').click(function() {
      cuntpoints = Number($(e.currentTarget).siblings('input').val());
      if($(e.currentTarget).hasClass('home')) {
          fixture.set({homePoints:2,homeCunts:cuntpoints});
      } else {
          fixture.set({awayPoints:2,awayCunts:cuntpoints});
      }
      self.removeMeta();
      //$(e.currentTarget).after(cuntpoints);
      Backbone.Mediator.pub('updateTable');
    });

    //Backbone.sync();
  },

  addMeta: function(currentTarget) {
    currentTarget.parent().append(template_meta);
  },

  removeMeta: function() {
    _.each($('.fixture'), function() {
      $('.cunts').remove();
      $('.fixt-done').remove();
    });
  }
});