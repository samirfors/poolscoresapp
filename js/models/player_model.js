define([],
function() {

  var Player = Parse.Object.extend({
    className: "Player",
    defaults: {
      id: null,
      name: null,
      cid:null
    }
  });

  return Player;
});