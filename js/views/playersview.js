define([], 
function(){
  var playerview = Backbone.View.extend({
    el: $('#players'),

    events: {
      'click #genFixtures': 'generateFixtures',
      'click': 'addPlayer'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;
      this.collection.each(this.add);
      this.collection.bind('add', this.add);
    },

    add: function() {
      this.$el.append('<p>'+this.collection.last().attributes['name']+'</a>');
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