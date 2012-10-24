define([],
function() {
  var console = window.console,

  Fixture = Parse.Object.extend({
    className:"Fixture",
    defaults: {
      id          : null,
      home        : null,
      away        : null,
      homePoints  : 0,
      awayPoints  : 0,
      homeCunts   : 0,
      awayCunts   : 0
    },

    rotate:function(){
        console.log(this);
        var h1 = this.get("home");
        var a1 = this.get("away");

        this.set("home",a1);
        this.set("away",h1);
      }


  });

  return Fixture;
});