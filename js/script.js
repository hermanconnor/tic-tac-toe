'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const statusMessage = document.getElementById('status-message');
  const resetButton = document.getElementById('reset-button');
  const cells = document.querySelectorAll('.cell');
  const gameBoard = document.querySelector('.game-board');

  let currentPlayer = 'X';
  let gameActive = true;
  let boardState = ['', '', '', '', '', '', '', '', ''];
  let winningCombo = null;

  const winningCombinations = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  function checkWin() {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;

      if (
        boardState[a] === currentPlayer &&
        boardState[b] === currentPlayer &&
        boardState[c] === currentPlayer
      ) {
        winningCombo = combo;
        return true;
      }
    }

    return false;
  }

  function checkDraw() {
    return boardState.every((cell) => cell !== '');
  }

  function highlightWinningCells() {
    if (winningCombo) {
      winningCombo.forEach((index) => {
        document
          .querySelector(`[data-index="${index}"]`)
          .classList.add('winner');
      });
    }
  }

  function updateStatusMessage(message) {
    statusMessage.textContent = message || `Player ${currentPlayer}'s turn`;
  }

  function handleCellClick(cell, index) {
    // Check if cell is already filled or game is not active
    if (boardState[index] !== '' || !gameActive) return;

    // Update the board state and UI
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Check for win or draw
    if (checkWin()) {
      gameActive = false;
      highlightWinningCells();
      updateStatusMessage(`Player ${currentPlayer} wins!`);

      return;
    }

    if (checkDraw()) {
      gameActive = false;
      updateStatusMessage("It's a draw!");

      return;
    }

    // Switch Player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Update Status
    updateStatusMessage();
  }

  function handleBoardClick(e) {
    if (e.target.classList.contains('cell')) {
      const cell = e.target;
      const index = parseInt(cell.getAttribute('data-index'));

      handleCellClick(cell, index);
    }
  }

  function initGame() {
    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('x', 'o', 'winner');
    });

    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateStatusMessage();
  }

  // EVENT LISTENERS
  gameBoard.addEventListener('click', handleBoardClick);
  resetButton.addEventListener('click', initGame);

  // INITIALIZE THE GAME
  initGame();
});
