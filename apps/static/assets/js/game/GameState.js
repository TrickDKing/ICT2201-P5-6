class GameState {
    //Checks game state to determine if in initialised to in game
    constructor() {
      this.gameState = 0;
    }
  
    setGameState(gameState) {
      this.gameState = gameState;
    }
  
    getGameState() {
      return this.gameState;
    }
  
  }

  module.exports = GameState;