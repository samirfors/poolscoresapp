define([], 
function(){
  var playlistview = Backbone.View.extend({
    el: $('#fixtures'),

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;

      this.render();
    },

    render: function(){
      this.$el.append('<p>fixturesview</p>');
    }
  });
  return playlistview;
});