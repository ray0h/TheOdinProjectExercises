function findBestMove(board, self, opponent) {

  // check if there is a winner
  function evaluate(board) {
    let lines = [
      // row wins
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // column wins
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal wins
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (board[a] === self.getSymbol()) {
          return +10;
        } else if (board[a] === opponent.getSymbol()) {
          return -10;
        } 
      }
    }
    return 0;
  }

  // miniMax algorithm to return optimal move
  function miniMax(board, depth, isMaxPlayer) {

    let score = evaluate(board);

    // winning move; moves that result in win at deeper levels (more moves) are scored lower
    if (score === -10 || score === 10) {
      return score - depth;
    }

    // full board, tied game
    if (gameBoard.isFullBoard()) {
      return 0;
    }

    if (isMaxPlayer) {
      let best = -1000;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = self.getSymbol()
          best = Math.max(best, miniMax(board, depth + 1, !isMaxPlayer));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = opponent.getSymbol()
          best = Math.min(best, miniMax(board, depth + 1, !isMaxPlayer));
          board[i] = null;
        }
      }
      return best;
    }
  }

  // find the best move
  let moveArr = [];
  let move = {};
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = self.getSymbol();
      let moveVal = miniMax(board, 0, false)
      board[i] = null;
      
      move.index = i;
      move.value = moveVal;
      moveArr.push(move);
      move = {};
    }
  }
  // max value of scores
  let max = Math.max(...moveArr.map(ea => ea.value))
  // array of best move indices
  let bestMoves = moveArr
    .map(ea => (ea.value === max) ? ea.index : null)
    .filter(each => each !== null)
  
  // return random move
  let rand = Math.floor(Math.random() * bestMoves.length)
  return bestMoves[rand];
}