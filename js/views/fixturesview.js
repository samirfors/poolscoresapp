define([
  'models/fixture_model'
], 
function(fixture_model){
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

      this.eventHub.on('scheduleDone', this.showFixtures, this);
    },

    showFixtures: function() {
      var self = this;
      _.each(this.collection.models, function(fixture) {
        $('#fixtures-list').append('<li class="fixture" fid="'+ fixture.cid +'"><span class="home">' + fixture.attributes.home + '</span> - <span class="away">' + fixture.attributes.away + '</span></li>');
      })
    },

    setWinner: function(e) {
      var fixture = this.collection.getByCid($(e.currentTarget).parent().attr('fid'));
      fixture.set({winner: $(e.currentTarget).text()});

      console.log(this.collection.models);
    },

    generateFixtures: function(e) {
      e.preventDefault();
      this.generateMatchSchedule(this.players.pop());
    },

    generateMatchSchedule: function(current_player) {
      for(var i=0;i<this.players.length;i++) {
        this.collection.push(new fixture_model({home:current_player.get('name'), away: this.players.at(i).get('name')}));
      }
      if(this.players.length !== 0) {
        this.generateMatchSchedule(this.players.pop());
      } else {
        this.eventHub.trigger('scheduleDone')
      }
    }
  });
  return fixturesview;
});