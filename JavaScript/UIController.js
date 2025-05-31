const UIController = {
    setTurnInfo(player) {
        const turnInfo = document.getElementById('turn-info');
        turnInfo.textContent = `Turn: ${player.charAt(0).toUpperCase() + player.slice(1)}`;
    },
    showRestartButton(show) {
        document.getElementById('restart-btn').style.display = show ? 'inline-block' : 'none';
    },
    alertPass(player) {
        alert(`${player} パスします`);
    },
    alertResult(result) {
        alert(result);
    }
};

export default UIController;
