import React, { Component } from "react";

class GameState extends Component {
    
    constructor(props) {
        super(props);
        this.gameState = 0;
    }

    setGameState(gameState) {
        this.gameState = gameState;
    }

    getGameState() {
        return this.gameState;
    }

}

export default GameState
