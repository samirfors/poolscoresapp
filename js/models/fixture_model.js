define([],
function() {

  var Fixture = Backbone.Model.extend({
    defaults: {
      id          : null,
      home        : null,
      away        : null,
      homePoints  : 0,
      awayPoints  : 0,
      homeCunts   : 0,
      awayCunts   : 0
    }
  });

  return Fixture;
});