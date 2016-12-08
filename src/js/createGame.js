var initializePlayer = require('./initializePlayer.js');

module.exports = function createGame(game) {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    game.platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    game.platforms.enableBody = true;

    // Here we create the ground.
    var ground = game.platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = game.platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = game.platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

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

    game.stars = game.add.group();

    game.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = game.stars.create(i * 70, 0, 'star');
        star.value = 10;

        //  Let gravity do its thing
        star.body.gravity.y = 8;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    var scoreText = 'Vuxenpoäng:';
    game.scoreText = game.add.text(16, 16, scoreText + 0, { fontSize: '32px', fill: '#000' });
    game.score = 0;
    game.changeScore = function changeScore(change) {
        game.score += change;
        game.scoreText.text = scoreText + game.score;
    };
    game.add.text(500, 16, 'Race of the Knupps', { fontSize: '32px', fill: '#000' });
};