define([], 
function(){
  var playerview = Backbone.View.extend({
    el: $('#players'),

    events: {
      'click': 'addPlayer'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;

      console.log(this.collection);
      //this.eventHub.on('trigger', this.changeText, this);

      this.render();
    },

    addPlayer: function() {
      this.$el.append('<p>player again</p>');
    },

    render: function(){
      this.$el.append('<p>player</p>');
    }
  });
  return playerview;
});