define([],
function(){
  var playerview = Backbone.View.extend({
    el: $('#players-list'),

    events: {
      'click .player'             : 'addPlayerTournament'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.tournament = options.tournament;
      this.collection.each(this.add);
      this.collection.bind('add', this.add);
    },

    add: function() {
      this.$el.append('<li class="player" id="'+this.collection.last().attributes['id']+'">'+this.collection.last().attributes['name']+'</li>');
    },

    generateFixtures: function() {
      console.log('generating fixtures');
    },

    addPlayerTournament: function(e) {
      var player = this.collection.get(e.currentTarget.id);
     $(e.currentTarget).css({color:"#ff00ff"})
      this.tournament.addPlayer(player);
      //var players =
    }
  });
  return playerview;
});