var initializePlayer = require('../initializePlayer.js');
//var createScoring = require('../createScoring.js');

var blockSize = 80;

module.exports = function createGame(game) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.boxX = 350;
    game.boxY = 100;
    game.blockSize = blockSize;

    createBorders(game);

    createBackground(game);

    createBlocks(game);
    createPlayers(game);
};

function createBackground(game) {
    //  A simple background for our game
    game.add.sprite(0, 0, 'background');

    game.cursors = game.input.keyboard.createCursorKeys();

    game.controlKeys = {
        space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    };
}

function createBorders(game) {
    var borderSprite = {
        name: 'block_8',
        width: 80,
        height: 80
    };

    game.borders = game.add.group();
    game.borders.enableBody = true;

    var border = game.borders.create(game.boxX, game.boxY - borderSprite.height, borderSprite.name);
    border.scale.setTo(4 * blockSize / borderSprite.width, 1);

    border = game.borders.create(game.boxX, game.boxY + 5 * blockSize, borderSprite.name);
    border.scale.setTo(4 * blockSize / borderSprite.width, 1);

    border = game.borders.create(game.boxX - borderSprite.width, game.boxY, borderSprite.name);
    border.scale.setTo(1, 5 * blockSize / borderSprite.height);

    border = game.borders.create(game.boxX + 4 * blockSize, game.boxY, borderSprite.name);
    border.scale.setTo(1, 5 * blockSize / borderSprite.height);

    game.borders.forEach(function (border) {
        border.body.immovable = true;
    });
}

function createBlocks(game) {

    game.blocks = game.add.group();
    game.blocks.enableBody = true;
    game.blocks.selectedBlock = 6;
    game.blocks.setSelectedBlock = function (newSelectedBlockId) {
        game.blocks.selectedBlock = newSelectedBlockId;

        game.blocks.forEach(function (block) {
            block.alpha = 1;
            block.alphaChange = undefined;
        });
    };

    createBlock(game, 1, 0, 'block_1');
    createBlock(game, 0, 0, 'block_2');
    createBlock(game, 3, 0, 'block_3');
    createBlock(game, 0, 2, 'block_4');
    createBlock(game, 3, 2, 'block_5');
    createBlock(game, 1, 2, 'block_6');
    createBlock(game, 0, 4, 'block_7');
    createBlock(game, 1, 3, 'block_8');
    createBlock(game, 2, 3, 'block_9');
    createBlock(game, 3, 4, 'block_10');
}

function createBlock(game, x, y, sprite) {

    var blockId = game.blocks.children.length;
    var block = game.blocks.create(game.boxX + x * blockSize,
        game.boxY + y * blockSize, sprite);
    block.blockId = blockId;
    block.blockSize = blockSize;
    block.inputEnabled = true;
    block.events.onInputDown.add(function () {
        game.blocks.setSelectedBlock(block.blockId);
    });
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