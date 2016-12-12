//var updatePlayer = require('./updatePlayer.js');

module.exports = function updateGame(game) {
    //  Collide the stars with the platforms
    var hitBox = game.physics.arcade.collide(game.blocks);
    var hitBorder = game.physics.arcade.collide(game.blocks, game.borders);

    var alphaChange = 0.02;
    var blockSpeed = 100;

    var selected = game.blocks.filter(function (block) {
        return block.isSelected;
    }).list[0];
    if (!selected) {
        return;
    }

    blinkBlock(selected, alphaChange);
    var cursors = game.cursors;
    if (hitBorder || hitBox) {
        selected.body.velocity.x = 0;
        selected.body.velocity.y = 0;
        blinkBlock(selected, alphaChange * 4);
    }

    if (selected.body.touching.up) {
        console.log('touching up');
    }
    if (selected.body.touching.down) {
        console.log('touching down');
    }
    if (selected.body.touching.right) {
        console.log('touching right');
    }
    if (selected.body.touching.left) {
        console.log('touching left');
    }
    if (cursors.up.isDown && !selected.body.touching.up) {
        selected.body.velocity.y = -blockSpeed;
//        blinkBlock(selected, alphaChange * 2);
    } else if (cursors.down.isDown && !selected.body.touching.down) {
        selected.body.velocity.y = blockSpeed;
//        blinkBlock(selected, alphaChange * 2);
    } else if (cursors.right.isDown && !selected.body.touching.right) {
        selected.body.velocity.x = blockSpeed;
//        blinkBlock(selected, alphaChange * 2);
    } else if (cursors.left.isDown && !selected.body.touching.left) {
        selected.body.velocity.x = -blockSpeed;
//        blinkBlock(selected, alphaChange * 2);
    }
//    game.players.forEach(function (player) {
//        updatePlayer(player);
//    });
//
//    if (game.stars.children.filter(function (star) {
//        return star.alive;
//    }).length === 0) {
//        console.log('game over!');
//        game.state.start('win', false);
//
//    }
};

function blinkBlock(block, alphaChange) {
    if (block.alphaChange === undefined) {
        block.alphaChange = alphaChange;
    }
    if (block.alpha >= 1) {
        block.alphaChange = -block.alphaChange;
    }
    if (block.alpha < 0.5) {
        block.alphaChange = -block.alphaChange;
    }
    block.alpha += block.alphaChange;
}