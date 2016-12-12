//var initializePlayer = require('../initializePlayer.js');
//var createScoring = require('../createScoring.js');

module.exports = function createGame(game) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createBackground(game);
//    createPlayers(game);
//    createStars(game);
//    createScoring(game);
};

function createBackground(game) {
    //  A simple background for our game
    game.add.sprite(0, 0, 'background');

    game.blocks = game.add.group();
    game.blocks.enableBody = true;
    game.blocks.create(200, 420, 'block_7');

    game.add.sprite(20, 20, 'block_1');
    game.add.sprite(80, 80, 'block_2');
    game.add.sprite(120, 120, 'block_3');
    game.add.sprite(180, 180, 'block_4');
    game.add.sprite(220, 220, 'block_5');
    game.add.sprite(280, 280, 'block_6');
    game.add.sprite(380, 380, 'block_8');
    game.add.sprite(420, 420, 'block_9');
    game.add.sprite(480, 480, 'block_10');

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

//function createPlayers(game) {
//    // The player and its settings
//    var jessica = initializePlayer(game, 128, game.world.height - 150, 'jessica',
//        game.input.keyboard.createCursorKeys());
//    var johan = initializePlayer(game, 32, game.world.height - 150, 'johan', {
//        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
//        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
//        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
//        right: game.input.keyboard.addKey(Phaser.Keyboard.D)
//    });
//
//    game.players = [jessica, johan];
//}