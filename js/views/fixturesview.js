define([
  'models/fixture_model'
], 
function(fixture_model){
  var fixturesview = Backbone.View.extend({
    el: $('#fixtures'),

    events: {
      'click .generate-fixture': 'generateFixtures'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.players = options.players;

      this.eventHub.on('scheduleDone', this.showFixtures, this);

      this.render();
    },

    render: function(){
      this.$el.append('<p>fixturesview</p>');
    },

    showFixtures: function() {
      var self = this;
      _.each(this.collection.models, function(fixture) {
        self.$el.append(fixture.attributes.home + ' - ' + fixture.attributes.away + '<br>');
      })
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