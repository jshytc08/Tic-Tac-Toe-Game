document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const instructions = document.getElementById('instructions');
    const resultModal = document.getElementById('resultModal');
    const resultMessage = document.getElementById('resultMessage');
    const closeModal = document.getElementById('closeModal');
    const undoMove = document.getElementById('undoMove');
    const resetGameButton = document.getElementById('resetGame');
    const playerXNameInput = document.getElementById('playerXName');
    const playerONameInput = document.getElementById('playerOName');
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let moveHistory = [];
    let playerXScore = 0;
    let playerOScore = 0;
    let playerXName = 'Player X';
    let playerOName = 'Player O';
    let originalPlayerXName = playerXName;
    let originalPlayerOName = playerOName;

    function swapRoles() {
        [playerXName, playerOName] = [playerOName, playerXName];
        playerXNameInput.value = playerXName;
        playerONameInput.value = playerOName;
        updateScoreboard();
    }

    function updateScoreboard() {
        playerXScoreElement.textContent = `${originalPlayerXName}: ${playerXScore}`;
        playerOScoreElement.textContent = `${originalPlayerOName}: ${playerOScore}`;
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultModal.classList.remove('hidden');
    }

    function resetGame() {
        board.fill(null);
        moveHistory = [];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        instructions.textContent = `${getCurrentPlayerName()}'s turn`;
    }

    function getCurrentPlayerName() {
        return currentPlayer === 'X' ? playerXName : playerOName;
    }

    function updateScore(winner) {
        if (winner === 'X') {
            if (playerXName === originalPlayerXName) {
                playerXScore++;
            } else {
                playerOScore++;
            }
        } else {
            if (playerOName === originalPlayerOName) {
                playerOScore++;
            } else {
                playerXScore++;
            }
        }
        updateScoreboard();
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (!cell.textContent && !checkWinner()) {
                cell.textContent = currentPlayer;
                board[index] = currentPlayer;
                moveHistory.push(index);
                const winner = checkWinner();
                if (winner) {
                    updateScore(winner);
                    showResult(`${getCurrentPlayerName()} wins!`);
                    swapRoles();
                } else if (board.every(cell => cell)) {
                    showResult('It\'s a draw!');
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    instructions.textContent = `${getCurrentPlayerName()}'s turn`;
                }
            }
        });
    });

    closeModal.addEventListener('click', () => {
        resultModal.classList.add('hidden');
        resetGame();
    });

    undoMove.addEventListener('click', () => {
        if (moveHistory.length > 0) {
            const lastMove = moveHistory.pop();
            board[lastMove] = null;
            cells[lastMove].textContent = '';
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            instructions.textContent = `${getCurrentPlayerName()}'s turn`;
        }
    });

    resetGameButton.addEventListener('click', () => {
        resetGame();
    });

    playerXNameInput.addEventListener('input', () => {
        playerXName = playerXNameInput.value || 'Player X';
        originalPlayerXName = playerXName;
        updateScoreboard();
        if (currentPlayer === 'X') {
            instructions.textContent = `${getCurrentPlayerName()}'s turn`;
        }
    });

    playerONameInput.addEventListener('input', () => {
        playerOName = playerONameInput.value || 'Player O';
        originalPlayerOName = playerOName;
        updateScoreboard();
        if (currentPlayer === 'O') {
            instructions.textContent = `${getCurrentPlayerName()}'s turn`;
        }
    });
});