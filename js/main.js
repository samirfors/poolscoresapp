require.config({
  paths: {
    'jquery'      : 'libs/jquery/jquery-min',
    'underscore'  : 'libs/underscore/underscore-min',
    'backbone'    : 'libs/backbone/backbone-min',
    'templates'   : '../templates'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: "Backbone"
    }
  }
});

require([
  'app',
  'js/libs/bootstrap/bootstrap.min.js'
], function(App) {
  return App.initialize();
});