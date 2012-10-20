define([
  'models/fixture_model',
  'models/tournament_model'
],
function(fixture_model, tournament_model){
  var fixturesview = Backbone.View.extend({
    el: $('#fixtures'),

    events: {
      'click .generate-fixture' : 'generateFixtures',
      'click .home'             : 'setWinner',
      'click .away'             : 'setWinner'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.players = options.players;
      this.tournament = options.tournament;

      this.eventHub.on('scheduleDone', this.showFixtures, this);
    },

    showFixtures: function() {
      var self = this,
          fixtures = this.tournament.get('fixtures');

      _.each(fixtures.models, function(fixture) {
        var fixt = $('<li class="fixture"><span class="home">' + fixture.get('home').get('name') + '</span> - <span class="away">' + fixture.get('away').get('name') + '</span></li>');
        fixt.data('fixture',fixture);
        $('#fixtures-list').append(fixt);
      });
    },

    setWinner: function(e) {
      var fixture = $(e.currentTarget).parent().data('fixture');

      if($(e.currentTarget).hasClass('home')) {
          fixture.set({homePoints:2,homeCunts:0});
      } else {
          fixture.set({awayPoints:2,awayCunts:0});
      }

    },

    generateFixtures: function(e) {
      e.preventDefault();
      if (this.tournament.generateMatchSchedule()) {
        this.eventHub.trigger('scheduleDone');
      }

    },
  });
  return fixturesview;
});