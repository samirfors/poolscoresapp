require.config({
  paths: {
    'underscore': 'libs/underscore/underscore-min',
    'backbone'  : 'libs/backbone/backbone-min',
    'jquery'    : 'libs/jquery/jquery-min',
    'templates' : '../templates'
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: "Backbone"
    },
    'underscore': {
      exports: '_'
    }
  }
});

require([
  'app',
  'js/libs/bootstrap/bootstrap.min.js'
], function(App) {
  return App.initialize();
});