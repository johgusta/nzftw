require('./game.css');

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

function Game(gameContainer) {

    var phaserDiv = document.createElement('div');
    phaserDiv.id = 'phaser-container';
    phaserDiv.classList.add('game-canvas');
    gameContainer.appendChild(phaserDiv);

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-container', { preload: preload, create: create, update: update });

    function preload() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }

    function create() {
        game.add.sprite(0, 0, 'star');
    }

    function update() {
    }
}

module.exports = Game;