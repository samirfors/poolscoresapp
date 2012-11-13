define([
  'backbone',
  'models/player_model'
],
function(Backbone,player_model) {

  var console = window.console,
      alert   = window.alert,

  Players = Parse.Collection.extend({
    model: player_model,
    initialize: function(options) {
      var self = this;
      self.eventHub = options.eventHub;

      if(navigator.onLine) {
        this.fetch({add:true,success:function(){
        var p = new Array();
       
      //  p.push({id:1222112,name:"test"})


         for(object in self.models)
        {

            p.push({id:self.models[object].id,name:self.models[object].get("name")}); 

        }
        localStorage.players = JSON.stringify(p);

        }});
      } else {
        
        alert("Offline mode")
      }

    },
    
    save:function(){
      //localStorage.players = [];
      //localStorage.players.push({id:1222112,name:"test"})

    },

    getAllPlayers: function() {
      var self = this,
          Player = Parse.Object.extend("Player"),
          query = new Parse.Query(Player),
          i, id;

      query.find({
        success: function(results) {
          for(i=0; i < results.length; i++)
          {
            self.add(new player_model({ name:results[i].get("name")}));
            self.last(id);
          }

        },
      
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });


    }

  });

  return Players;
});