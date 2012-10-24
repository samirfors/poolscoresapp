define([
  'backbone',
  'underscore',
  'jquery'
],
function(Backbone, _, $){
  'use strict';
  var console = window.console,

  fixturesview = Backbone.View.extend({
    el: $('#fixtures'),

    events: {
      'click .generate-fixture' : 'generateFixtures',
      'click .home'             : 'setWinner',
      'click .away'             : 'setWinner',
      'click .send-results'     : 'save'

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
          fixture, i, fixt;
      for(i in fixtures) {
        fixture = fixtures[i];
        fixt = $('<li class="fixture"><span class="home">' + fixture.get('home').get('name') + '</span> - <span class="away">' + fixture.get('away').get('name') + '</span></li>');
        fixt.data('fixture',fixture);
        $('#fixtures-list').append(fixt);
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
        cuntpoints = $(e.currentTarget).siblings('input').val();
        if($(e.currentTarget).hasClass('home')) {
            fixture.set({homePoints:2,homeCunts:cuntpoints});
        } else {
            fixture.set({awayPoints:2,awayCunts:cuntpoints});
        }
        self.removeMeta();
        $(e.currentTarget).after(cuntpoints);
      })
    },

    addMeta: function(currentTarget) {
      currentTarget.parent().append('<input type="text" class="cunts"><button class="fixt-done">Done</button>');
    },

    removeMeta: function() {
      _.each($('.fixture'), function() {
        $('.cunts').remove();
        $('.fixt-done').remove();
      })
    },

    generateFixtures: function(e) {
      e.preventDefault();
      if (this.tournament.generateMatchSchedule()) {
        this.eventHub.trigger('scheduleDone');
      }
    },

    save:function(){
      console.log("SAVE!!!");
      this.tournament.save(null,{
        success:function(){
          console.log("Saved to Parse!");
        }
      });
    }

  });
  return fixturesview;
});