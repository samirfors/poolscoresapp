define([
  'models/fixture_model',
  'models/tournament_model'
],
function(fixture_model, tournament_model){
  var fixturesview = Backbone.View.extend({
    el: $('#fixtures'),

    events: {
      'click .generate-fixture' : 'generateFixtures',
      'click .save-tournament' : 'save',
      'click .home'             : 'setWinner',
      'click .away'             : 'setWinner'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.players = options.players;
      this.tournament = options.tournament;
       $(".save-tournament").hide();
      this.eventHub.on('scheduleDone', this.showFixtures, this);
    },

    showFixtures: function() {
      var self = this,
          fixtures = this.tournament.get('fixtures');

      for(var i in fixtures)
       { //alert(fixture.get('home'))
        fixture = fixtures[i];
        var fixt = $('<li class="fixture"><span class="home">' + fixture.get('home').get('name') + '</span> - <span class="away">' + fixture.get('away').get('name') + '</span></li>');
        fixt.data('fixture',fixture);
        $('#fixtures-list').append(fixt);
      }
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
          $(".save-tournament").show();
      }
    },

    save:function(e){
      this.tournament.save(null,{success:function(){

          alert("Saved to Parse!")
      }

      });
    }

  });
  return fixturesview;
});