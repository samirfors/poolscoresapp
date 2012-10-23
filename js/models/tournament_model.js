define([
  'collections/fixtures_collection',
  'models/fixture_model'
],
function(fixtures_collection,fixture_model) {

  var Tournament = Parse.Object.extend({
    className:"Tournament",
    defaults: {
      id: null,
      date: null,
      fixtures: [],
      players: []
    },


    initialize: function() {

      // TODO: break out in separate module/helper to easily switch
      this.templateProcessor = {
        process:function(players,rounds){
          var baseRound = [];
          var fixtures = [];
          if(players.length == 2)
          {
            add(players[0],players[1]);
          } 

          var p1,p2,p3,p4;
          if(players.length == 3)
          {
            p1 = players[1];
            p2 = players[2];
            p3 = players[0];

            add(p1,p2);
            add(p2,p3);
            add(p3,p1);
          } 


          if(players.length == 4)
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


          if(players.length == 5)
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

          function add(a,b){
            var f = new fixture_model();
            f.set("home",a);
            f.set("away",b);
            baseRound.push(f)
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
      console.log(players)
      if(players.length < 2) return false;
      else if(players.length == 2) rounds = 6;
      else if(players.length == 3) rounds = 3;
      else rounds = 2;

     // this.set("fixtures", this.scheduleProcessor.process(this.get('players'),rounds));

     this.set("fixtures", this.templateProcessor.process(players,rounds));
      // return false if it failed
     
      return true;

    }

  });

  return Tournament;
});