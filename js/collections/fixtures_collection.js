define([
  'models/fixture_model'
],
function(fixture_model) {

  var Fixtures = Parse.Collection.extend({
    model: fixture_model
  });

  return Fixtures;
});