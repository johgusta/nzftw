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


    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-container');
    var mainState = {
        preload: preloadGame,
        create: createGame,
        update: updateGame
    };
    game.state.add('main', mainState);

    var winningState = {
        create: createWinning
    };
    game.state.add('win', winningState);

    game.score = 0;
    game.state.start('main');
}

function createWinning(game) {

    game.add.text(180, 200, 'The Knupps have won again!', { fontSize: '32px', fill: '#f00' });

    setTimeout(function () {
        game.add.text(220, 250, 'Press any knupp key to play again', { fontSize: '20px', fill: '#f00' });

        game.input.keyboard.onDownCallback = function () {
            game.input.keyboard.onDownCallback = undefined;
            game.state.start('main');
        };
    }, 500);
}

function updateWinning(game) {

}
module.exports = Game;