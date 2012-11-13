define([
  'backbone',
  'underscore',
  'jquery',
   'models/player_model',
  'text!templates/player.html'
],
function(Backbone, _, $,player_model, playerTpl){
  var console = window.console,

  playerview = Backbone.View.extend({
    el: $('#players'),

    elems: {
      ul  : $('#players-list')
    },

    events: {
      'click .available'          : 'addPlayerTournament',
      'click .selected'           : 'removePlayerTournament',
      'click .generate-fixtures'  : 'generateFixtures'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.tournament = options.tournament;
     // this.collection.each(this.add);

      this.collection.bind('add', this.add);
      this.eventHub.on('addPlayers', this.add);


        if(!navigator.onLine && localStorage.players)
        {
        //  console.log("win" + localStorage.players)
          var loadedPlayers = JSON.parse(localStorage.players)

          for(var i = 0; i < loadedPlayers.length; i++)
          {
           // console.log(loadedPlayers[i])
            var newPlayer = new player_model({ name: loadedPlayers[i].name, id:loadedPlayers[i].id});
           // newPlayer.id = loadedPlayers[i].id;

            this.collection.add(newPlayer)
            console.log(loadedPlayers[i].name);
            }
          }
    
    },

    add: function(){ 

      var self = this,
          player,
          html = _.template(playerTpl);
      this.elems.ul.html("");
      this.collection.each(function(object) {
        if(object && object.attributes && object.attributes.name)
        {
        player = $(html({
          player_id: object.id,
          player_name: object.attributes.name
        }));
        self.elems.ul.append(player);}
      });
    },

    generateFixtures: function(e) {
      e.preventDefault();
      if (this.tournament.generateMatchSchedule()) {
        this.eventHub.trigger('scheduleDone');
      }
      this.$el.remove();
    },

    addPlayerTournament: function(e) {
      console.log(e.currentTarget)
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
  return playerview;
});