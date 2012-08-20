define([], 
function() {

  var Player = Backbone.Model.extend({
    defaults: {
      id: null,
      name: null
    }
  });

  return Player;
});