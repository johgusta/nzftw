//var updatePlayer = require('./updatePlayer.js');

module.exports = function updateGame(game) {
    snapBlocksToGrid(game.blocks);

    var hitBox = game.physics.arcade.collide(game.blocks);
    var hitBorder = game.physics.arcade.collide(game.blocks, game.borders);

    var alphaChange = 0.02;
    var blockSpeed = 100;

    var controlKeys = game.controlKeys;
    if (controlKeys.space.isDown && controlKeys.space.repeats === 0) {
        game.blocks.setSelectedBlock(
            (game.blocks.selectedBlock + 1) % (game.blocks.children.length));
    }
    var selected = game.blocks.children[game.blocks.selectedBlock];

    var cursors = game.cursors;
    if (hitBorder || hitBox) {
        blinkBlock(selected, alphaChange * 4);
    } else {
        blinkBlock(selected, alphaChange);
    }

    if (cursors.up.isDown && !selected.body.touching.up) {
        selected.body.velocity.y = -blockSpeed;
    } else if (cursors.down.isDown && !selected.body.touching.down) {
        selected.body.velocity.y = blockSpeed;
    } else if (cursors.right.isDown && !selected.body.touching.right) {
        selected.body.velocity.x = blockSpeed;
    } else if (cursors.left.isDown && !selected.body.touching.left) {
        selected.body.velocity.x = -blockSpeed;
    }
};

function snapBlocksToGrid(blocks) {
    //Reset overlap and snap to grid if speed is below threshold value
    var minimumSpeed = 0.001;
    blocks.forEach(function (block) {
        if (block.body.overlapX > 0) {
            block.body.overlapX = 0;
        }
        if (block.body.overlapY > 0) {
            block.body.overlapY = 0;
        }
        if (Math.abs(block.body.velocity.x) < minimumSpeed) {
            block.body.velocity.x = 0;
            snapBlockToGridX(block);
        }
        if (Math.abs(block.body.velocity.y) < minimumSpeed) {
            block.body.velocity.y = 0;
            snapBlockToGridY(block);
        }
    });
}

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