const board = document.getElementById('board');
const turnInfo = document.getElementById('turn-info');
const SIZE = 8;

let currentPlayer = 'black';

// 盤面の状態（null, 'black', 'white'）
let boardState = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => null)
);

function createBoard() {
    board.innerHTML = '';
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;

            cell.addEventListener('click', handleClick);
            board.appendChild(cell);
        }
    }
}

function placeInitialDiscs() {
    boardState[3][3] = 'white';
    boardState[4][4] = 'white';
    boardState[3][4] = 'black';
    boardState[4][3] = 'black';
    updateBoard();
}

function handleClick(e) {
    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    if (boardState[y][x] !== null) return;

    const flipped = getFlippableDiscs(x, y, currentPlayer);
    if (flipped.length === 0) return;

    boardState[y][x] = currentPlayer;
    flipped.forEach(([fx, fy]) => {
        boardState[fy][fx] = currentPlayer;
    });

    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    turnInfo.textContent = `Turn: ${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}`;
    updateBoard();
}

function updateBoard() {
    const cells = board.children;
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            const cell = cells[y * SIZE + x];
            cell.innerHTML = '';
            if (boardState[y][x]) {
                const disc = document.createElement('div');
                disc.className = `disc ${boardState[y][x]}`;
                cell.appendChild(disc);
            }
        }
    }
}

function getFlippableDiscs(x, y, player) {
    const opponent = player === 'black' ? 'white' : 'black';
    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [-1, -1], [1, -1], [-1, 1]
    ];
    const toFlip = [];

    directions.forEach(([dx, dy]) => {
        let cx = x + dx;
        let cy = y + dy;
        const discsToFlipInDir = [];

        while (cx >= 0 && cx < SIZE && cy >= 0 && cy < SIZE) {
            if (boardState[cy][cx] === opponent) {
                discsToFlipInDir.push([cx, cy]);
            } else if (boardState[cy][cx] === player) {
                toFlip.push(...discsToFlipInDir);
                break;
            } else {
                break;
            }
            cx += dx;
            cy += dy;
        }
    });

    return toFlip;
}

createBoard();
placeInitialDiscs();
