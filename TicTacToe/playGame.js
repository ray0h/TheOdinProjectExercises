const playGame = (function () {
  let _player1, _player2, _activePlayer, _nextPlayer, _currentPlayer, _startingPlayer, _startedGame;

  // set up DOM elements to manipulate
  let _playingBoard = document.getElementById("board");
  let _msg = document.getElementById("message");
  let _p1 = document.getElementById("player1");
  let _p2 = document.getElementById("player2");
  let _replay = document.getElementById("replay");

  // Buttons - AI control/difficulty
  let _hum1Btn = document.getElementById("human1");
  let _easyC1Btn = document.getElementById("easyC1");
  let _hardC1Btn = document.getElementById("hardC1");
  let _hum2Btn = document.getElementById("human2");
  let _easyC2Btn = document.getElementById("easyC2");
  let _hardC2Btn = document.getElementById("hardC2");

  // Buttons - game control
  let _newGame = document.getElementById("replay");
  let _renamePlayers = document.getElementById("players");

  // button event handlers
  _hum1Btn.onclick = toggleHuman;
  _hum2Btn.onclick = toggleHuman;
  _easyC1Btn.onclick = toggleEasyAI;
  _easyC2Btn.onclick = toggleEasyAI;
  _hardC1Btn.onclick = toggleHardAI;
  _hardC2Btn.onclick = toggleHardAI;
  _newGame.onclick = resetBoard;
  _renamePlayers.onclick = changePlayerIds;

  // set up default players/turn/moves
  function setPlayers (player1, player2) {
    _player1 = player1;
    _player2 = player2;
    _activePlayer = _player1;
    _nextPlayer = _player2;
  }

  // spin up the game and start
  function gameOn () {
    _msg.textContent = "";
    _p1.classList.add("turn");
    _startingPlayer = "player1";
    _currentPlayer = "player1";
    gameBoard.clearBoard();
    gameBoard.renderBoard(_player1, _player2);
    _msg.textContent=`${_activePlayer.getName()}'s turn`;
    if(!_activePlayer.isHuman()) {
      disableBoardClick();
      aiMove(_activePlayer, _nextPlayer);
    }
    else {
      enableBoardClick();
    }
  }
    
  // Button event Handlers
  function toggleEasyAI (event) {
    if (!_startedGame) {
      if (!event.target.classList.contains("active")) {
        if (event.target.classList.contains("p1")) {
          player = _player1;
          _hum1Btn.classList.remove("active");
          _hardC1Btn.classList.remove("active");
        }
        else if (event.target.classList.contains("p2")) {
          player = _player2;
          _hum2Btn.classList.remove("active");
          _hardC2Btn.classList.remove("active");
        }
        player.setEasyAI();
        event.target.classList.toggle("active");
        if (_activePlayer === player) {
          resetBoard();
        }
      }
    }
  }

  function toggleHardAI (event) {
    if (!_startedGame) {
      if (!event.target.classList.contains("active")) {
        if (event.target.classList.contains("p1")) {
          player = _player1;
          _hum1Btn.classList.remove("active");
          _easyC1Btn.classList.remove("active");
        }
        else if (event.target.classList.contains("p2")) {
          player = _player2;
          _hum2Btn.classList.remove("active");
          _easyC2Btn.classList.remove("active");
        }
        player.setHardAI();
        event.target.classList.toggle("active");
        if (_activePlayer === player) {
          resetBoard();
        }
      }
    }
  }

  function toggleHuman (event) {
    if (!_startedGame) {
      if (!event.target.classList.contains("active")) {
        if (event.target.classList.contains("p1")) {
          player = _player1;
          _hardC1Btn.classList.remove("active");
          _easyC1Btn.classList.remove("active");
        }
        else if (event.target.classList.contains("p2")) {
          player = _player2;
          _hardC2Btn.classList.remove("active");
          _easyC2Btn.classList.remove("active");
        }
        event.target.classList.toggle("active");
        player.setHuman();
        if (_activePlayer === player) {
          enableBoardClick();
        }
      }
    }
  }

  function changePlayerIds() {
    play1 = prompt("Enter new name for player 1:", "Player1");
    play2 = prompt("Enter new name for player 2:", "Player2");
    _player1.setName(play1);
    _player2.setName(play2);
    gameBoard.renderBoard(_player1, _player2);
    if (_activePlayer.isHuman()) {
      _msg.textContent=`${_activePlayer.getName()}'s turn`;
    }
  }

  function resetBoard() {
    if (!gameBoard.isFullBoard() && !gameBoard.checkWin()) {
      ans = confirm("Restart game?")
      if (!ans) {
        return;
      } else if (_currentPlayer !== _startingPlayer) {
        changeTurn();
        _msg.textContent=`${_activePlayer.getName()}'s turn`;
      }
    }
    if (_replay.classList.contains("red-btn")) {
      _replay.classList.remove("red-btn");
      _replay.textContent="Restart Game";
    }
    _msg.textContent = "";
    _startedGame = false;
    gameBoard.clearBoard();
    gameBoard.renderBoard(_player1, _player2);
    if (!_activePlayer.isHuman()) {
      disableBoardClick();
      aiMove(_activePlayer, _nextPlayer);
    } else {
      enableBoardClick();
      _msg.textContent=`${_activePlayer.getName()}'s turn`;
    }
  }

  // Game logic control functions
  function enableBoardClick() {
    _playingBoard.onclick = humanMove;
  }

  function disableBoardClick() {
    _playingBoard.onclick = () => {};
  }

  function toggleStarter() {
    if (_startingPlayer === "player1") {
      _startingPlayer = "player2";
    } else {
      _startingPlayer = "player1";
    }
  }

  function changeTurn() {
    if (_activePlayer === _player1) {
      _activePlayer = _player2;
      _nextPlayer = _player1;
      _currentPlayer = "player2";
    } else {
      _activePlayer = _player1;
      _nextPlayer = _player2;
      _currentPlayer = "player1";
    }
    _p1.classList.toggle("turn");
    _p2.classList.toggle("turn");
  }

  function incGames() {
    let games = document.getElementById("games")
    let count = parseInt(games.textContent);
    count += 1;
    games.textContent = count;
  }

  function incWins() {
    let score = document.getElementById(`${_currentPlayer}score`);
    let count = parseInt(score.textContent);
    count += 1;
    score.textContent = count;
  }

  function declareEnd(result, name="") {
    _replay.textContent="NewGame";
    _replay.classList.add("red-btn");
    _startedGame = false;
    incGames();
    toggleStarter();
    changeTurn();
    disableBoardClick();
    if (result === "win") {
      _msg.textContent=`${name} won the game!`;
      incWins();
    } else if (result === "tie") {
      _msg.textContent="Tied Game";
    }
  }

  // functions to handle AI / human player moves
  function move(index) {
    _startedGame = true;
    // while loop to account for invalid human clicks 
    if (_activePlayer.isHuman()) {
      while(!gameBoard.validMove(index)) {
        if (gameBoard.validMove(index)) {
          break;
        }
      }
    }
    // make move
    gameBoard.addMove(_activePlayer.getSymbol(), index)
    gameBoard.renderBoard(_player1, _player2);
    
    // check for win, tie, or continue playing
    if (gameBoard.checkWin()) {
      declareEnd("win", _activePlayer.getName());
    } else if (gameBoard.isFullBoard()) {
      declareEnd("tie");
    } else {
      changeTurn();
      if (!_activePlayer.isHuman()) {
        disableBoardClick();
        aiMove(_activePlayer, _nextPlayer);
      } else {
        enableBoardClick();
        _msg.textContent=`${_activePlayer.getName()}'s turn`;
      }
    }
  }

  function humanMove(event) {
    move(parseInt(event.target.id));
  }

  function aiMove(self, opponent) {
    let board = gameBoard.getBoard();
    _msg.textContent = `${self.getName()}  ...thinking...`;
    let index;

    // easy AI picks random available square
    if (self.getAIdiff() === "easy") {
      let possibles = board.map((square,ind) => (square === null) ? ind : "").filter(each => each !== "")
      index = possibles[Math.floor(Math.random() * possibles.length)]
    } 
    // hard AI uses the miniMax algorithm
    else {
      index = findBestMove(board, self, opponent);
    }
    setTimeout(() => {
      _msg.textContent = "";
      move(parseInt(index));
    }, 1000);
  }

  return {
    setPlayers,
    gameOn
  }

})();
