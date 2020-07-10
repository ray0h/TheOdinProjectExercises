// factory for player

const Player = function (name, symbol) {
  let _name = name;
  let _symbol = symbol;
  let _isHuman = true;
  let _aiDifficulty = "";

  // getters
  const getName = () => _name;
  const getSymbol = () => _symbol;
  const isHuman = () => _isHuman;
  const getAIdiff = () => _aiDifficulty;
  
  // setters
  const setName = (newName) => _name = newName;
  const setHuman = function() {
    _isHuman = true;
    _aiDifficulty = "";
  };
  const setEasyAI = function () {
    _isHuman = false;
    _aiDifficulty = "easy";
  }  
  const setHardAI = function () {
    _isHuman = false;
    _aiDifficulty = "hard";
  }  

  return {
    getName,
    getSymbol,
    isHuman,
    getAIdiff,
    setName,
    setHuman,
    setEasyAI,
    setHardAI
  }
}