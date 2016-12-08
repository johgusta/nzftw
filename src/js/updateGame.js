var updatePlayer = require('./updatePlayer.js');

module.exports = function updateGame(game) {
    //  Collide the stars with the platforms
    game.physics.arcade.collide(game.stars, game.platforms);

    game.players.forEach(function (player) {
        updatePlayer(player);
    });
};