define([
  'collections/fixtures_collection',
  'models/fixture_model'
],
function(fixtures_collection,fixture_model) {

  var Tournament = Backbone.Model.extend({
    defaults: {
      id: null,
      date: null,
      fixtures: new fixtures_collection(),
      players: []
    },


    initialize: function() {

      // TODO: break out in separate module/helper to easily switch

      this.scheduleProcessor = {
        process:function(players,rounds){
            console.log("process")
            var prio = {};
            var fixtures = new fixtures_collection();

            for (var i in players)
            {
              players[i].prio = 0;
            }

            // Create first round that then gets rotated for the remaining rounds
            var baseRound = [];

            var gamesPerRound = (players.length-1) * ((players.length) / 2)
            //alert(gamesPerRound);
            

            for(var i = 0; i < gamesPerRound; i++)
            {
              var p1 = players[0];
              var p2;
              // FIND A PLAYER p1 hasn't played
              for(var j=1; j<players.length; j++)
              {
                  var otherPlayer = players[j]
                  var hasPlayed = false;
                  for(var f in baseRound)
                  {

                    if(baseRound[f].get("home") == p1 && baseRound[f].get("away") == otherPlayer) hasPlayed = true;
                    if(baseRound[f].get("away") == p1 && baseRound[f].get("home")  == otherPlayer) hasPlayed = true;
                  }

                  if(hasPlayed == false)
                  {
                    if(!p2)
                    p2 = otherPlayer;
                    else if(otherPlayer.prio > p2.prio) p2 = otherPlayer
                  }
              }

              var newFixture = new fixture_model({home:p1,away:p2})
              baseRound.push(newFixture);
             
              

              p1.prio-=1.5;
              p2.prio-=1;
              players.sort(sortOnPrio)
            }

            // Reverse baserRund to make sure player[0] plays last game and add it to the fixtures
            baseRound = baseRound.reverse();
           for(var i in baseRound)
            {
               fixtures.push(baseRound[i])
            }

            // REPEAT FOR REMAINING ROUNDS
            for(var i = 1; i < rounds; i++)
            {
              for(var fixt in baseRound)
              {
                var newFixt = baseRound[fixt].clone()
                if(i%2 != 0) newFixt.rotate();

                fixtures.push(newFixt)
              }
            }

          function sortOnPrio(a, b){
            if(a.prio > b.prio) return -1;

            return 1;
          }

          return fixtures;

        }
      }
    },



    addPlayer: function(player) {
      var players = this.get('players');
      players.push(player);
    },

    removePlayer: function() {
    },

    generateMatchSchedule: function() {
      var rounds = 2;
      var players = this.get('players');
      
      if(players.length < 2) return false;
      else if(players.length == 2) rounds = 6;
      else if(players.length == 3) rounds = 3;
      else rounds = 2;

      this.set("fixtures", this.scheduleProcessor.process(this.get('players'),rounds));
      // return false if it failed
      return true;

    },

    saveTournament:function(){
      //Using parse 


    }

  });

  return Tournament;
});