define([
  'backbone',
  'underscore'
],
function(Backbone, _){
  'use strict';
  var console = window.console,

  saveview = Backbone.View.extend({
    el: $('#save'),

    events: {
      'click .send-results'     : 'save',
      'click .cancel'           : 'cancel'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
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
  return saveview;
});