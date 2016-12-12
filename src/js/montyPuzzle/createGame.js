var initializePlayer = require('../initializePlayer.js');
//var createScoring = require('../createScoring.js');

var boxX = 350;
var boxY = 100;

var blockSize = 80;

module.exports = function createGame(game) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createBackground(game);

    createBorders(game);

    createBlocks(game);


//    createPlayers(game);
//    createStars(game);
//    createScoring(game);
};

function createBackground(game) {
    //  A simple background for our game
    game.add.sprite(0, 0, 'background');

    game.cursors = game.input.keyboard.createCursorKeys();

}

function createBorders(game) {
    var borderSprite = {
        name: 'block_8',
        width: 80,
        height: 80
    };

    game.borders = game.add.group();
    game.borders.enableBody = true;

    var border = game.borders.create(boxX, boxY - borderSprite.height, borderSprite.name);
    border.scale.setTo(4 * blockSize / borderSprite.width, 1);

    border = game.borders.create(boxX, boxY + 5 * blockSize, borderSprite.name);
    border.scale.setTo(4 * blockSize / borderSprite.width, 1);

    border = game.borders.create(boxX - borderSprite.width, boxY, borderSprite.name);
    border.scale.setTo(1, 5 * blockSize / borderSprite.height);

    border = game.borders.create(boxX + 4 * blockSize, boxY, borderSprite.name);
    border.scale.setTo(1, 5 * blockSize / borderSprite.height);

    game.borders.forEach(function (border) {
        border.body.immovable = true;
    });
}

function createBlocks(game) {

    game.blocks = game.add.group();
    game.blocks.enableBody = true;

    createBlock(game, 1, 0, 2, 2, 'block_1');
    createBlock(game, 0, 0, 1, 2, 'block_2');
    createBlock(game, 3, 0, 1, 2, 'block_3');
    createBlock(game, 0, 2, 1, 2, 'block_4');
    createBlock(game, 3, 2, 1, 2, 'block_5');
    createBlock(game, 1, 2, 2, 1, 'block_6');
    createBlock(game, 0, 4, 1, 1, 'block_7', [], true);
    createBlock(game, 1, 3, 1, 1, 'block_8');
    createBlock(game, 2, 3, 1, 1, 'block_9');
    createBlock(game, 3, 4, 1, 1, 'block_10');
}

function createBlock(game, x, y, width, height, sprite, size, isSelected) {

    var block = game.blocks.create(boxX + x * blockSize, boxY + y * blockSize, sprite);
//    block.scale.setTo((block.width - 1) / block.width, (block.height - 1) / block.height);
//    block.width -= 1;
//    block.height -= 1;
    block.blockSize = blockSize;
    block.isSelected = isSelected;
    block.body.friction.x = 0;
    block.body.friction.y = 0;
//    block.body.immovable = true;
}

function createPlayers(game) {
    // The player and its settings
    var jessica = initializePlayer(game, 128, game.world.height - 150, 'jessica',
        game.input.keyboard.createCursorKeys());
    var johan = initializePlayer(game, 32, game.world.height - 150, 'johan', {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    });

    game.players = [jessica, johan];
}