require('./game.css');
var createGame = require('./createGame.js');
var preloadGame = require('./preloadGame.js');
var updateGame = require('./updateGame.js');

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

function Game(gameContainer) {

    var phaserDiv = document.createElement('div');
    phaserDiv.id = 'phaser-container';
    phaserDiv.classList.add('game-canvas');
    gameContainer.appendChild(phaserDiv);

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-container', {
        preload: preloadGame,
        create: createGame,
        update: updateGame
    });
}

module.exports = Game;