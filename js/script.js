'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const statusMessage = document.getElementById('status-message');
  const resetButton = document.getElementById('reset-button');
  const cells = document.querySelectorAll('.cell');
  const gameBoard = document.querySelector('.game-board');

  let currentPlayer = 'X';
  let gameActive = true;
  let boardState = ['', '', '', '', '', '', '', '', ''];
  // let gameBoard = new Array(9).fill('');

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
});
