define([], 
function() {

  var Fixture = Backbone.Model.extend({
    defaults: {
      id          : null,
      home        : null,
      away        : null,
      homepoints : null,
      awaypoints : null
    }
  });

  return Fixture;
});