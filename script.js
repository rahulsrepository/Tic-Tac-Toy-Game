const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game-board');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const startGameBtn = document.getElementById('start-game');
const winnerAnnouncement = document.getElementById('winner-announcement');
const restartGameBtn = document.getElementById('restart-game');

let player1Name = '';
let player2Name = '';
let currentPlayer = 'X';
let gameActive = false;

startGameBtn.addEventListener('click', () => {
    player1Name = player1Input.value || 'Player X';
    player2Name = player2Input.value || 'Player O';
    gameActive = true;
    winnerAnnouncement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    restartGameBtn.classList.add('hidden');
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameActive || cell.classList.contains('taken')) return;

        cell.textContent = currentPlayer;
        cell.classList.add('taken');

        if (checkWinner()) {
            gameActive = false;
            winnerAnnouncement.textContent = `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
            restartGameBtn.classList.remove('hidden');
        } else if (Array.from(cells).every(cell => cell.classList.contains('taken'))) {
            gameActive = false;
            winnerAnnouncement.textContent = `It's a draw!`;
            restartGameBtn.classList.remove('hidden');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

restartGameBtn.addEventListener('click', () => {
    gameActive = true;
    currentPlayer = 'X';
    winnerAnnouncement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
    restartGameBtn.classList.add('hidden');
});

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => cells[index].textContent === currentPlayer);
    });
}
