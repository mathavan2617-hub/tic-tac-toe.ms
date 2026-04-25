const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal 1
    [2, 4, 6]  // diagonal 2
];

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    updateStatus();
}

function cellClicked(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Prevent overwriting or clicking if game is over
    if (board[index] !== '' || !gameActive) {
        return;
    }

    updateCell(cell, index);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    // Add a subtle pop animation when a cell is clicked
    cell.style.animation = 'none';
    cell.offsetHeight; /* trigger reflow */
    cell.style.animation = 'pop 0.2s ease-out';
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function updateStatus() {
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    statusText.style.color = currentPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
    
    // Add animation to status text
    statusText.style.transform = 'scale(1.05)';
    setTimeout(() => {
        statusText.style.transform = 'scale(1)';
    }, 200);
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        statusText.style.color = 'var(--win-color)';
        gameActive = false;
        highlightWinningCells(winningCells);
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = 'It\'s a Draw! 🤝';
        statusText.style.color = 'var(--text-color)';
        gameActive = false;
        return;
    }

    changePlayer();
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add('win');
    });
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'win');
        cell.style.animation = 'none';
    });
    
    updateStatus();
}

// Start the game
initializeGame();
