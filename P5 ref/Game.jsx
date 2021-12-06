import React, { Component } from "react";
import Sketch from "react-p5";
import GameState from '../Game/GameState';
import GameMenu from '../Game/GameMenu';

let gameState;
let gameMenu;

class Game extends Component {

    gameState = new GameState();
    gameMenu = new GameMenu();
    setup = (p5, canvasParentRef) => {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(
          canvasParentRef
        );
        // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
        p5.frameRate(this.fr);
        
        

      };

  draw = p5 => {
    gameState.setGameState(1);
    //gameMenu.displayGameMenu();
    p5.clear();
    p5.background('white');
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

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
  
}

export default Game;
