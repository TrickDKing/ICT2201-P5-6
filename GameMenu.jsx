import React, { Component } from "react";
import Sketch from "react-p5";
import GameState from '../Game/GameState';
let gameState;

class GameMenu extends Component {

    constructor(props) {
        super(props);
        this.gameOption = 0;
    }

    getOption() {
        return this.gameOption;
    }

    setOption(gameOption) {
        this.gameOption = gameOption;
    }

    displayGameMenu = p5 => {
        //Create Start rect
        p5.fill(0, 255, 0);
        p5.rect(50, 50, 270, 75);
        //Create Instructions
        p5.fill(255, 0, 255);
        p5.rect(50, 200, 380, 95);
        //Create Settings rectangle
        p5.fill(255, 0, 0);
        p5.rect(90, 350, 260, 75);
        //Defines text size
        p5.textSize(50)
        //Fill here defines text color
        p5.fill(255);
        //Display text and positions
        p5.text('START', 110, 106);
        p5.text('INSTRUCTIONS', 52, 268);
        p5.text('SETTINGS', 94, 406);
      };

}

export default GameMenu;
