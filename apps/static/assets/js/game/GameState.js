class GameState {
    //Checks game state to determine if in initialised to in game
    constructor() {
      this.gameState = 0;
    }
  
    setGameState(newgameState) {
      this.gameState = newgameState;
    }
  
    getGameState() {
      return this.gameState;
    }
  
  }

  module.exports = GameState;