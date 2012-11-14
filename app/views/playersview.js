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
    'click .load-saved'         : 'loadSaved',
    'click .generate-fixtures'  : 'generateFixtures'
  },

  initialize: function(options) {
    _.bindAll(this);
    this.tournament = options.tournament;
    this.collection.bind('add', this.add);

    $(".load-saved").hide();
    if(localStorage.tournament != "null" && localStorage.tournament != "" && localStorage != null) {
      $(".load-saved").show();
    }
    if(!navigator.onLine && localStorage.players) {
    //  console.log("win" + localStorage.players)
      console.log(localStorage.player);
      var loadedPlayers = JSON.parse(localStorage.players)

      for(var i = 0; i < loadedPlayers.length; i++) {
        // console.log(loadedPlayers[i])
        var newPlayer = new player_model({ name: loadedPlayers[i].name, id:loadedPlayers[i].id});
        // newPlayer.id = loadedPlayers[i].id;

        this.collection.add(newPlayer)
        console.log(loadedPlayers[i].name);
      }
    }
  },

  add: function() {
    var self = this,
        player;

    this.elems.ul.html("");
    this.collection.each(function(object) {
      if(object && object.attributes && object.attributes.name) {
        player = self.template({
          player_id: object.id,
          player_name: object.attributes.name
        })
        self.elems.ul.append(player);
      }
    });
  },

  loadSaved:function(e){
    e.preventDefault();

    if(localStorage.tournament) {
      var localFixtures = JSON.parse(localStorage.tournament),
          fixtures = new Array(),
          playersAdded = {};

      for(var i = 0; i < localFixtures.length; i++) {
        var localFix = localFixtures[i],
            f = new fixture_model();

        f.set("home",this.collection.get(localFix.home.objectId));
        f.set("away",this.collection.get(localFix.away.objectId));
        f.set("homePoints",localFix.homePoints);
        f.set("awayPoints",localFix.awayPoints);
        f.set("homeCunts",localFix.homeCunts);
        f.set("awayCunts",localFix.awayCunts);

        this.tournament.players = [];
        if(!playersAdded[localFix.home.objectId]) {
          playersAdded[localFix.home.objectId] = 1;
          this.tournament.get("players").push(this.collection.get(localFix.home.objectId))
        }

        if(!playersAdded[localFix.away.objectId]) {
          playersAdded[localFix.away.objectId] = 1;
          this.tournament.get("players").push(this.collection.get(localFix.away.objectId))
        }

        fixtures.push(f);
      }

      this.tournament.set("fixtures", fixtures);
      Backbone.Mediator.pub('scheduleDone');
      Backbone.Mediator.pub('updateTable');

      this.$el.remove();

    }
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