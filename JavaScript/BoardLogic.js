const SIZE = 8;

const BoardLogic = {
    createEmptyBoard() {
        return Array.from({ length: SIZE }, () =>
            Array.from({ length: SIZE }, () => null)
        );
    },
    placeInitialDiscs(boardState) {
        boardState[3][3] = 'white';
        boardState[4][4] = 'white';
        boardState[3][4] = 'black';
        boardState[4][3] = 'black';
    },
    getFlippableDiscs(boardState, x, y, player) {
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
    },
    hasLegalMove(boardState, player) {
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                if (boardState[y][x] === null) {
                    const flipped = this.getFlippableDiscs(boardState, x, y, player);
                    if (flipped.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    isBoardFull(boardState) {
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                if (boardState[y][x] === null) {
                    return false;
                }
            }
        }
        return true;
    },
    countDiscs(boardState) {
        let black = 0, white = 0;
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                if (boardState[y][x] === 'black') black++;
                if (boardState[y][x] === 'white') white++;
            }
        }
        return { black, white };
    }
};

export default BoardLogic;
