const GameState = require('./GameState');

class GameMenu {
  //Class to render Game Menu
  constructor() {
    
    this.gameMenu = 0;
  }

  getOption() {
    return this.gameMenu;
  }

  setOption(gameMenu) {
    this.gameMenu = gameMenu;
  }

  displayGameMenu() {
    
    //Create Start rect
    //rect(windowWidth/2, windowHeight/2,0,0);
    fill(255, 0, 0);
    //rect(550, 50, 270, 75);
    //Create Instructions
    fill(255, 0, 0);
    //rect(500, 200, 380, 95);
    //Create Settings rectangle
    fill(255, 0, 0);
    //rect(550, 350, 260, 75);
    //Defines text size
    textSize(50)
    //Fill here defines text color
    fill(0);
    //Display text and positions
    text('START', (windowWidth / 3) - 50, 100);
    text('INSTRUCTIONS',(windowWidth / 3) - 150, 250);
    text('ABOUT US', (windowWidth / 3) - 100, 400);
  }


  displayHelpManual() {
    clear();
    textSize(20);
    text('Press BACKSPACE to return to MENU!', 50, 600);
    textSize(50);
    text('Objectives', 50, 70);
    textSize(30)
    text('1. Use commands to bring your character to the end point!', 50, 150)
    text('2. Move your character based on directional instructions', 50, 200)
    text('3. Buffs and traps are laid along the way to help or prevent you from reaching the end point!', 50, 250)
    text('4. The game is over when your HP Bar is zero!', 50, 300)
    if (keyIsDown(BACKSPACE)) {
      this.gameMenu = 0;
      clear();
    }
  }

  displaySettings() {
    clear();
    textSize(75)
    text('ABOUT US', 550, 70);
    textSize(30)
    text("CREATORS", 650, 150);
    textSize(20);
    text('Press BACKSPACE to return to MENU!', 50, 600);
    text("Xavier", 700, 200);
    text("Johanna", 690, 250);
    text("Carlton", 700, 300);
    text("En Ding", 700, 350);
    text("Xian Fu", 700, 400);
    if (keyIsDown(BACKSPACE)) {
      this.gameMenu = 0;
      clear();
    }
  }

  display() {

    if (this.unittest = 0) {
        
      if (gameState.getGameState() == 0 && this.getOption() == 0) {
        this.displayGameMenu();
      } else if (this.getOption() == 1) {
        gameState.setGameState(1);
        if (keyIsDown(BACKSPACE)) {
          this.gameMenu = 0;
        }
      } else if (this.getOption() == 2) {
        this.displayHelpManual();
      }
      else if (this.getOption() == 3) {
        this.displaySettings();
      }
    } else {

      if (this.gameState.getGameState() == 0 && this.getOption() == 0) {
        this.displayGameMenu();
      } else if (this.getOption() == 1) {
        this.gameState.setGameState(1);
        // if (keyIsDown(BACKSPACE)) {
        //   this.gameMenu = 0;
        // }
      } else if (this.getOption() == 2) {
        this.displayHelpManual();
      }
      else if (this.getOption() == 3) {
        this.displaySettings();
      }
    }

  }

}

module.exports = GameMenu;