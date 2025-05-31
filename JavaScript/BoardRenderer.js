import BoardLogic from './BoardLogic.js';

const SIZE = 8;

const BoardRenderer = {
    createBoard(onCellClick) {
        const board = document.getElementById('board');
        board.innerHTML = '';
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', onCellClick);
                board.appendChild(cell);
            }
        }
    },
    updateBoard(boardState, player) {
        const board = document.getElementById('board');
        const cells = board.children;
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                const cell = cells[y * SIZE + x];
                cell.innerHTML = '';
                if (boardState[y][x]) {
                    const disc = document.createElement('div');
                    disc.className = `disc ${boardState[y][x]}`;
                    cell.appendChild(disc);
                    cell.classList.remove('legal');
                } else {
                    const flipped = BoardLogic.getFlippableDiscs(boardState, x, y, player);
                    if (flipped.length > 0) {
                        cell.classList.add('legal');
                    } else {
                        cell.classList.remove('legal');
                    }
                }
            }
        }
    }
};

export default BoardRenderer;
