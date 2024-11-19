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

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (!cell.textContent && !checkWinner()) {
                cell.textContent = currentPlayer;
                board[index] = currentPlayer;
                moveHistory.push(index);
                if (checkWinner()) {
                    updateScore();
                    showResult(`${getCurrentPlayerName()} wins!`);
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
        playerXScoreElement.textContent = `${playerXNameInput.value || 'Player X'}: ${playerXScore}`;
        if (currentPlayer === 'X') {
            instructions.textContent = `${getCurrentPlayerName()}'s turn`;
        }
    });

    playerONameInput.addEventListener('input', () => {
        playerOScoreElement.textContent = `${playerONameInput.value || 'Player O'}: ${playerOScore}`;
        if (currentPlayer === 'O') {
            instructions.textContent = `${getCurrentPlayerName()}'s turn`;
        }
    });

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
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
        return currentPlayer === 'X' ? (playerXNameInput.value || 'Player X') : (playerONameInput.value || 'Player O');
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore++;
            playerXScoreElement.textContent = `${playerXNameInput.value || 'Player X'}: ${playerXScore}`;
        } else {
            playerOScore++;
            playerOScoreElement.textContent = `${playerONameInput.value || 'Player O'}: ${playerOScore}`;
        }
    }
});