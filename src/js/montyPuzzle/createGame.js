var initializePlayer = require('../initializePlayer.js');
//var createScoring = require('../createScoring.js');

module.exports = function createGame(game) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createBackground(game);
    createPlayers(game);
//    createStars(game);
//    createScoring(game);
};

function createBackground(game) {
    //  A simple background for our game
    game.add.sprite(0, 0, 'background');

    game.blocks = game.add.group();
    game.blocks.enableBody = true;

    var boxX = 350;
    var boxY = 100;

    var blockSize = 80;

    game.blocks.create(boxX + blockSize, boxY, 'block_1');
    game.blocks.create(boxX, boxY, 'block_2');
    game.blocks.create(boxX + 3 * blockSize, boxY, 'block_3');
    game.blocks.create(boxX, boxY + 2 * blockSize, 'block_4');
    game.blocks.create(boxX + 3 * blockSize, boxY + 2 * blockSize, 'block_5');
    game.blocks.create(boxX + blockSize, boxY + 2 * blockSize, 'block_6');
    game.blocks.create(boxX, boxY + 4 * blockSize, 'block_7');
    game.blocks.create(boxX + blockSize, boxY + 3 * blockSize, 'block_8');
    game.blocks.create(boxX + 2 * blockSize, boxY + 3 * blockSize, 'block_9');
    game.blocks.create(boxX + 3 * blockSize, boxY + 4 * blockSize, 'block_10');


    //  The platforms group contains the ground and the 2 ledges we can jump on
//    game.platforms = game.add.group();
//
//    //  We will enable physics for any object that is created in this group
//    game.platforms.enableBody = true;
//
//    // Here we create the ground.
//    var ground = game.platforms.create(0, game.world.height - 64, 'ground');
//
//    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
//    ground.scale.setTo(2, 2);
//
//    //  This stops it from falling away when you jump on it
//    ground.body.immovable = true;

    //  Now let's create two ledges
//    var ledge = game.platforms.create(400, 400, 'ground');
//
//    ledge.body.immovable = true;
//
//    ledge = game.platforms.create(-150, 250, 'ground');
//
//    ledge.body.immovable = true;
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