var View = require('./view');

module.exports = View.extend({
  el: $('#save'),

  events: {
    'click .send-results'     : 'save',
    'click .cancel'           : 'cancel'
  },

  initialize: function(options) {
    _.bindAll(this);
    this.tournament = options.tournament;
  },

  save: function() {
    console.log("SAVE!!!");
    this.tournament.save(null,{
      success: function(){
        console.log("Saved to Parse!");
      }
    });
  },

  cancel: function() {
    location.reload();
  }
});