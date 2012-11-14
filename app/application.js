// Application bootstrapper.
Application = {
  initialize: function() {
    var PlayersView = require('views/playersview'),
        PlayersCollection = require('models/players_collection'),
        Router = require('lib/router');

    Parse.initialize("f8hFekRLpjqKoyrhYVPUK4Xisb6BGEpV3kDY2w1a", "bXu5LL2sj7L4HYQ66Pl4HnJBXM7crfH2L2wd9XK4");

    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin

    this.players = new PlayersCollection();
    this.playersView = new PlayersView({
        collection: this.players
    });
    this.router = new Router();
    if (typeof Object.freeze === 'function') Object.freeze(this);
  }
}

module.exports = Application;
