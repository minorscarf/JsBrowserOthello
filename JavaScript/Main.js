import GameController from './GameController.js';

document.getElementById('restart-btn').addEventListener('click', () => {
    GameController.init();
});

GameController.init();
