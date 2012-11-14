// Application bootstrapper.
Application = {
  initialize: function() {
    var PlayersView = require('views/playersview'),
        FixturesView = require('views/fixturesview'),
        StandingsView = require('views/standingsview'),
        SaveView = require('views/saveview'),
        PlayersCollection = require('models/players_collection'),
        TournamentModel = require('models/tournament_model'),
        Router = require('lib/router');

    Parse.initialize("f8hFekRLpjqKoyrhYVPUK4Xisb6BGEpV3kDY2w1a", "bXu5LL2sj7L4HYQ66Pl4HnJBXM7crfH2L2wd9XK4");

    this.players = new PlayersCollection();
    this.tournament = new TournamentModel();
    this.playersView = new PlayersView({
      collection: this.players,
      tournament: this.tournament
    });
    this.fixturesView = new FixturesView({
      players   : this.players,
      tournament: this.tournament
    });
    this.standingsView = new StandingsView({
      tournament: this.tournament
    });
    this.saveView = new SaveView({
      tournament: this.tournament
    });
    this.router = new Router();
    if (typeof Object.freeze === 'function') Object.freeze(this);
  }
}

module.exports = Application;
