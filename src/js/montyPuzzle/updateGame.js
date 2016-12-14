//var updatePlayer = require('./updatePlayer.js');

module.exports = function updateGame(game) {
    //  Collide the stars with the platforms
    game.blocks.forEach(function (block) {
        if (block.body.overlapX > 0) {
            block.body.overlapX = 0;
        }
        if (block.body.overlapY > 0) {
            block.body.overlapY = 0;
        }
        if (Math.abs(block.body.velocity.x) < 0.001) {
            block.body.velocity.x = 0;
            snapBlockToGridX(block);
        }
        if (Math.abs(block.body.velocity.y) < 0.001) {
            block.body.velocity.y = 0;
            snapBlockToGridY(block);
        }
    });
    var hitBox = game.physics.arcade.collide(game.blocks, undefined, function blocksCollide(block1, block2) {
        console.log('blocks collide!');
        block1.body.touching.none = true;
        block2.body.touching.none = true;

        if (block2.body.overlapX > 0) {
            block2.body.overlapX = 0;
        }
        if (block2.body.overlapY > 0) {
            block2.body.overlapY = 0;
        }
        //block2.body.velocity.x = 0;
        //block1.body.velocity.y = 0;
        //block2.body.velocity.y = 0;
    });
    var hitBorder = game.physics.arcade.collide(game.blocks, game.borders, function blockCollideBorders(block1, border) {
        console.log('blocks and border collide!');
        block1.body.touching.none = true;
    });

    var alphaChange = 0.02;
    var blockSpeed = 100;

    var controlKeys = game.controlKeys;
    if (controlKeys.space.isDown && controlKeys.space.repeats === 0) {
        game.blocks.setSelectedBlock((game.blocks.selectedBlock + 1) % (game.blocks.children.length));
    }
    var selected = game.blocks.children[game.blocks.selectedBlock];

    blinkBlock(selected, alphaChange);
    var cursors = game.cursors;
    if (hitBorder) {
        console.log('hit border: ' + hitBorder + ', hit box: ' + hitBox);
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

function snapBlockToGridX(block) {
    var game = block.game;
    var xIndex = Math.round((block.body.x - game.boxX) / game.blockSize);
    block.body.x = game.boxX + xIndex * game.blockSize;
}

function snapBlockToGridY(block) {
    var game = block.game;
    var yIndex = Math.round((block.body.y - game.boxY) / game.blockSize);
    block.body.y = game.boxY + yIndex * game.blockSize;
}

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