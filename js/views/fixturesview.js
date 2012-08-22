define([], 
function(){
  var fixturesview = Backbone.View.extend({
    el: $('#fixtures'),

    events: {
      'click .generate-fixture': 'generateFixtures'
    },

    initialize: function(options) {
      _.bindAll(this);
      this.eventHub = options.eventHub;

      this.render();
    },

    render: function(){
      this.$el.append('<p>fixturesview</p>');
    },

    getPlayerName: function(x) {
      //console.log(x);
      //if (x < 10) return ' '+x; else return x;
      return this.collection.at(x).attributes['name'];
    },

    generateFixtures: function(e) {
      e.preventDefault();
      
      var n = this.collection.length;
      // var nr = n - 1;
      // var htmlpair = '';

      for(var i=0;i<n;i++) {
        for(var j=0;j<n/2;j++) {
          if(j===i) {}
          else if(j===0) {
            console.log(this.getPlayerName(j) + ' - ' + this.getPlayerName(i));
            var fixture = this.getPlayerName(j) + ' - ' + this.getPlayerName(i) + '<br>';
            this.$el.append(fixture);
          } else {
            console.log(this.getPlayerName(j) + ' - ' + this.getPlayerName(i));
            var fixture = this.getPlayerName(j) + ' - ' + this.getPlayerName(i) + '<br>';
            this.$el.append(fixture);
          }
        }
      }

      // for (var r=1; r<n; r++) {
      //   for (i=1; i <= n/2; i++) {
      //     if (i==1) {
      //       htmlpair += ' ' + this.format ( 1 )
      //                + ' - ' + this.format ( (n-1+r-1) % (n-1) + 2 )
      //                + ' <br>'
      //       } else {
      //         htmlpair += ' ' + this.format ( (r+i-2)   % (n-1) + 2 )
      //                  + ' - ' + this.format ( (n-1+r-i) % (n-1) + 2 )
      //                  + ' <br>'
      //       } 
      //   }
      // }
      // this.$el.append(htmlpair);

      this.eventHub.trigger('generateFixtures');
    }
  });
  return fixturesview;
});