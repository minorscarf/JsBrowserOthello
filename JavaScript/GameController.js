import BoardLogic from './BoardLogic.js';
import BoardRenderer from './BoardRenderer.js';
import UIController from './UIController.js';

const SIZE = 8;

const GameController = {
    boardState: BoardLogic.createEmptyBoard(),
    currentPlayer: 'black',
    passCount: 0,
    init() {
        this.boardState = BoardLogic.createEmptyBoard();
        BoardLogic.placeInitialDiscs(this.boardState);
        this.currentPlayer = 'black';
        this.passCount = 0;
        BoardRenderer.createBoard(this.handleClick.bind(this));
        BoardRenderer.updateBoard(this.boardState, this.currentPlayer);
        UIController.setTurnInfo(this.currentPlayer);
        UIController.showRestartButton(false);
    },
    handleClick(e) {
        const x = parseInt(e.target.dataset.x);
        const y = parseInt(e.target.dataset.y);
        if (this.boardState[y][x] !== null) return;
        const flipped = BoardLogic.getFlippableDiscs(this.boardState, x, y, this.currentPlayer);
        if (flipped.length === 0) return;
        this.boardState[y][x] = this.currentPlayer;
        flipped.forEach(([fx, fy]) => {
            this.boardState[fy][fx] = this.currentPlayer;
        });
        this.passCount = 0;
        if (BoardLogic.isBoardFull(this.boardState)) {
            BoardRenderer.updateBoard(this.boardState, this.currentPlayer);
            setTimeout(() => this.endGame(), 100);
            return;
        }
        this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
        if (BoardLogic.hasLegalMove(this.boardState, this.currentPlayer)) {
            UIController.setTurnInfo(this.currentPlayer);
            BoardRenderer.updateBoard(this.boardState, this.currentPlayer);
        } else {
            this.passCount++;
            BoardRenderer.updateBoard(this.boardState, this.currentPlayer);
            if (this.passCount >= 2) {
                setTimeout(() => this.endGame(), 100);
                return;
            } else {
                setTimeout(() => {
                    UIController.alertPass(this.currentPlayer);
                    this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
                    UIController.setTurnInfo(this.currentPlayer);
                    BoardRenderer.updateBoard(this.boardState, this.currentPlayer);
                }, 100);
            }
        }
    },
    endGame() {
        const { black, white } = BoardLogic.countDiscs(this.boardState);
        let result = `Game Over!\nBlack: ${black}  White: ${white}\n`;
        if (black > white) {
            result += 'Black wins!';
        } else if (white > black) {
            result += 'White wins!';
        } else {
            result += 'Draw!';
        }
        UIController.alertResult(result);
        UIController.showRestartButton(true);
    }
};

export default GameController;
