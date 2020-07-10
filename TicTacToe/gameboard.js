// module to control the game board
const gameBoard = (function () {

  // tic tac toe board represented by array; empty space = null
  let _board = new Array(9);
  _board.fill(null)

  // clear out board array
  function clearBoard() {
    _board.fill(null);
    let squares = Array.from(document.getElementsByClassName("square win"));
    squares.forEach(square => {
      square.classList.remove("win");
    })
  }

  function isFullBoard() {
    return !_board.includes(null)
  }

  function isEmptyBoard() {
    return _board.every(null);
  }

  // validate space is empty and available for move
  function validMove(index) {
    if (_board[index] === null) {
      return true;
    }
    return false;
  }

  function addMove(symbol, index) {
      _board[index] = symbol; 
  }

  // render board data into html
  function renderBoard(playerOne, playerTwo) {
    for (i = 0; i < _board.length; i++) {
      let square = document.getElementById(String(i));
      square.textContent = _board[i];
    }
    let p1 = document.getElementById("player1id")
    let p2 = document.getElementById("player2id")
    p1.textContent = `${playerOne.getName()}: ${playerOne.getSymbol()}`;
    p2.textContent = `${playerTwo.getName()}: ${playerTwo.getSymbol()}`
  }

  // check if there is a win on the board
  function checkWin() {
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
      // highlight winning marks
      if (_board[a] && _board[a] === _board[b] && _board[a] === _board[c]) {
        let sq1 = document.getElementById(String(a));
        let sq2 = document.getElementById(String(b));
        let sq3 = document.getElementById(String(c));
        sq1.classList.add("win");
        sq2.classList.add("win");
        sq3.classList.add("win");
        return _board[a];
      }
    }
    return false;
  }

  function getBoard() {
    return _board;
  }

  return {
    clearBoard,
    isFullBoard,
    isEmptyBoard,
    validMove,
    addMove,
    renderBoard,
    checkWin, 
    getBoard
  }
})();