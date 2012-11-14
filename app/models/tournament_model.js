var fixture_model = require('./fixture_model');

module.exports = Parse.Object.extend({
  className: "Tournament",

  defaults: {
    id: null,
    date: null,
    fixtures: [],
    players: []
  },

  initialize: function() {

    // TODO: break out in separate module/helper to easily switch
    this.templateProcessor = {
      process: function(players,rounds){

        function add(a,b) {
          var f = new fixture_model();
          f.set("home",a);
          f.set("away",b);
          baseRound.push(f);
        }

        var baseRound = [],
            fixtures = [],
            p1,p2,p3,p4,p5,i,
            fixt, newFixt;

        if(players.length === 2)
        {
          add(players[0],players[1]);
        }

        if(players.length === 3)
        {
          p1 = players[1];
          p2 = players[2];
          p3 = players[0];

          add(p1,p2);
          add(p2,p3);
          add(p3,p1);
        }


        if(players.length === 4)
        {
          p1 = players[3];
          p2 = players[1];
          p3 = players[2];
          p4 = players[0];

          add(p1,p2);
          add(p3,p4);
          add(p2,p3);
          add(p4,p1);
          add(p1,p3);
          add(p2,p4);

        }


        if(players.length === 5)
        {
          p1 = players[2];
          p2 = players[1];
          p3 = players[4];
          p4 = players[3];
          p5 = players[0];

          add(p1,p2);
          add(p3,p4);
          add(p5,p1);
          add(p3,p2);
          add(p4,p5);
          add(p1,p3);
          add(p2,p4);
          add(p5,p3);
          add(p4,p1);
          add(p2,p5);
        }


          for(i in baseRound) {
             fixtures.push(baseRound[i]);
          }

          // REPEAT FOR REMAINING ROUNDS
          for(i = 1; i < rounds; i++) {
            for(fixt in baseRound) {
              newFixt = baseRound[fixt].clone();
              if(i%2 !== 0) {
                newFixt.rotate();
              }
              fixtures.push(newFixt);
            }
          }
        return fixtures;
      }
    };
  },

  addPlayer: function(player) {
    var players = this.get('players');
    players.push(player);
  },

  removePlayer: function(player) {
    var p,
        players = this.get('players');

    for(p in players) {
      if (player.id === players[p].id) {
        players.splice(p, 1);
      }
    }
  },

  generateMatchSchedule: function() {
    var rounds = 2,
        players = this.get('players');

    if(players.length < 2) { return false; }
    else if(players.length === 2) { rounds = 6; }
    else if(players.length === 3) { rounds = 3; }
    else { rounds = 2; }

    this.set("fixtures", this.templateProcessor.process(players,rounds));
    // return false if it failed

    return true;
  },

  getPlayers: function() {
    var standings = [],
        players = this.get('players');

    _.each(players, function(player) {
      var standing = {
        name: player.get('name'),
        points: 0,
        cuntPoints: 0
      }
      standings.push(standing);
    }, this);

    return standings;
  },

  getStandings: function() {
    var standings = [],
        players = this.get('players'),
        fixtures = this.get('fixtures');

    function calculateScoreForPlayer(player,fixtures) {
      var standing = {
            name: player.get("name"),
            points: 0,
            cuntPoints: 0,
            id: player.get("id")
          }, i;

      for(i = 0; i < fixtures.length; i++)
      {
        if(fixtures[i].get("home").get("name") === standing.name ) {
          standing.points += fixtures[i].get("homePoints");
          standing.cuntPoints += fixtures[i].get("homeCunts");
        } else if(fixtures[i].get("away").get("name") === standing.name) {
           standing.points += fixtures[i].get("awayPoints");
          standing.cuntPoints += fixtures[i].get("awayCunts");
        }
      }
      return standing;
    }

    function sortOnScore(a,b) {
      if(a.points > b.points) { return -1; }

      if(a.points === b.points) {
        if(a.cuntPoints > b.cuntPoints) { return -1; }
      }
      return 1;
    }

    for(var i = 0; i < players.length; i++) {
      standings.push(calculateScoreForPlayer(players[i],fixtures));
    }

    standings.sort(sortOnScore);

    return standings;
  }
});