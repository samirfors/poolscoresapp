var Collection = require('./collection'),
    fixture_model = require('./fixture_model');


module.exports = Collection.extend({
  model: fixture_model
});