define([
  'backbone',
  'underscore',
  'jquery',
  'text!templates/fixture.html',
  'text!templates/fixture-meta.html'
],
function(Backbone, _, $, fixtureTpl, fixtureMetaTpl){
  'use strict';
  var console = window.console,

  fixturesview = Backbone.View.extend({
    el: $('#fixtures'),

    elems: {
      ul      : $('#fixtures-list')
    },

    events: {
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
      var fixtures = this.tournament.get('fixtures'),
          fixture, i, fixt,
          html = _.template(fixtureTpl);
      for(i in fixtures) {
        fixture = fixtures[i];
        fixt = $(html({
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
        self.eventHub.trigger('updateTable');
      });

      Backbone.sync();
    },

    addMeta: function(currentTarget) {
      var html = _.template(fixtureMetaTpl);
      currentTarget.parent().append(html);
    },

    removeMeta: function() {
      _.each($('.fixture'), function() {
        $('.cunts').remove();
        $('.fixt-done').remove();
      });
    }

  });
  return fixturesview;
});