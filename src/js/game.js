require('./game.css');

function Game(gameContainer) {

    var canvas = document.createElement('canvas');
    canvas.classList.add('game-canvas');
    canvas.width = 800;
    canvas.height = 600;
    gameContainer.appendChild(canvas);

    var context = canvas.getContext('2d');
    context.fillText('Hello world', 10, 10);
}

module.exports = Game;