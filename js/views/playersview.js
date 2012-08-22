define([], 
function(){
  var playerview = Backbone.View.extend({
    el: $('#players-list'),

    events: {
      'click'             : 'addPlayer'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.collection.each(this.add);
      this.collection.bind('add', this.add);
    },

    add: function() {
      this.$el.append('<li>'+this.collection.last().attributes['name']+'</li>');
    },

    generateFixtures: function() {
      console.log('generating fixtures');
    },

    addPlayer: function() {
      this.$el.append('<p>player again</p>');
    }
  });
  return playerview;
});