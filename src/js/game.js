require('./game.css');

window.PIXI = require('phaser/build/custom/pixi');
window.p2 = require('phaser/build/custom/p2');
window.Phaser = require('phaser/build/custom/phaser-split');

var game;

function Game(gameContainer) {

    var phaserDiv = document.createElement('div');
    phaserDiv.id = 'phaser-container';
    phaserDiv.classList.add('game-canvas');
    gameContainer.appendChild(phaserDiv);

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-container', { preload: preload, create: create, update: update });
}

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('jessica', 'assets/jessica.png', 64, 64);
    game.load.spritesheet('johan', 'assets/johan.png', 64, 64);
}

var platforms;
var jessica;
var johan;
var players = [];

var cursors;
var wasd;
var stars;

var score = 0;
var scoreText;

function create() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    // The player and its settings
    jessica = game.add.sprite(128, game.world.height - 150, 'jessica');
    johan = game.add.sprite(32, game.world.height - 150, 'johan');

    players.push(jessica);
    players.push(johan);

    players.forEach(function (player) {
        //  Our two animations, walking left and right.
        setUpAnimations(player);

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        player.enableBody = true;

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;
        player.body.mass = 100;
        player.body.maxVelocity.x = 180;
    });

    jessica.cursors = game.input.keyboard.createCursorKeys();

    johan.cursors = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };

    stars = game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 8;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'Vuxenpoäng: 0', { fontSize: '32px', fill: '#000' });
    game.add.text(500, 16, 'Race of the Knupps', { fontSize: '32px', fill: '#000' });
}

function setUpAnimations(character) {
    character.animations.add('left', [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (index) {
        return 9 * 13 + index;
    }), 15, true);
    character.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (index) {
        return 11 * 13 + index;
    }), 15, true);
}

function update() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(stars, platforms);

    //  Reset the players velocity (movement)
    players.forEach(function (player) {
        controlPlayer(player);
    });
}

function controlPlayer(player) {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    var isTouchingPlatform = player.body.touching.down && hitPlatform;
    var speed = 350;

    if (isTouchingPlatform) {
        player.body.drag.x = speed - 1;
    } else {
        player.body.drag.x = 0;
    }

    player.body.acceleration.x = 0;
    var playerCursors = player.cursors;
    if (playerCursors.left.isDown) {
        //  Move to the left
        player.body.acceleration.x = -speed;

        player.animations.play('left');
    }
    else if (playerCursors.right.isDown) {
        //  Move to the right
        player.body.acceleration.x = speed;

        player.animations.play('right');
    }
    else {
        //  Stand still
        player.animations.stop();

        player.frame = (13 * 2);
    }

    //  Allow the player to jump if they are touching the ground.
    if (playerCursors.up.isDown && isTouchingPlatform) {
        player.body.velocity.y = -450;
    }
}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}

module.exports = Game;