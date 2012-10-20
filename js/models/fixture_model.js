define([], 
function() {

  var Fixture = Backbone.Model.extend({
    defaults: {
      id          : null,
      home        : null,
      away        : null,
      winner      : null
    }
  });

  return Fixture;
});