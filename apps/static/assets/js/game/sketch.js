let myCircle;
let gameState;
let gameMenu;
let gameScore;
let gamePlayer;
let gameMap;
let grid;
let gameCommands;
let gameData;
let gameHP;
let Gameleaderboard;
let pg;
let gameConsole;

function setup() {
  //createCanvas(windowWidth, windowHeight).parent('canvasHolder');
  createCanvas(1600, 660).parent('canvasHolder');
  background('white');
  gameLeaderboard = new GameLeaderboard();
  gameBackground = new GameBackground();
  gameMenu = new GameMenu();
  gameState = new GameState();
  gameScore = new GameScore();
  gamePlayer = new GamePlayer(475, 525);
  gameMap = new GameMap(10, 10);
  gameCommands = new GameCommands();
  gameData = new GameData();
  gameHP = new GameHP();
  gamePauseMenu = new GamePauseMenu();
  gameOver = new GameOver();
  gameConsole = new GameConsole();


  gamePlayer.setPlayerPosition(gameMap.getMapRows() - 1, gameMap.getMapColumns() - 1); //Initialise player position to be at the start

}

function draw() {

  print(mouseX, mouseY);
  //In game Menu
  if (gameState.getGameState() == 0) {
    gameBackground.display();
    gameMenu.display(); //GameMenu display

  }

  if (gameState.getGameState() == 1) {
    clear();

    gameMap.spawnMap(); // Render map
    gameScore.display(); // Render Score
    gameHP.display(); //Render Health bar
    gamePlayer.update(); //Update player movements
    gamePlayer.display(); // Renders updated player movements
    gameCommands.display(); // Renders Games queue
    gameConsole.display();
    /*
    gamePlayer.keyPressed();
    */

  }

  if (gameState.getGameState() == 2) {
    //Game paused state
    gamePauseMenu.displayPauseMenu();
    gameBackground.display();
  }

  if (gameState.getGameState() == 3) {
    //Game end state display leaderboard
    clear();
    gameLeaderboard.display();
  }

  if (gameState.getGameState() == 4) {
    //Game over state
    clear();
    gameOver.displayGameOver();
  }

}

function mouseClicked() {

  if (gameState.getGameState() == 0 && gameMenu.getOption() == 0) {
    if (mouseX < 820 && mouseX > 460) {
      if (mouseY < 100 && mouseY > 50) {
        //Start game
        gameMenu.setOption(1);
      }
      if (mouseY < 275 && mouseY > 200) {
        //Instructions
        gameMenu.setOption(2);

      }
      if (mouseY < 425 && mouseY > 350) {
        //Settings
        gameMenu.setOption(3);
      }
    }
  } // End of game state 0

  if (gameState.getGameState() == 1) {

    if (mouseY < 585 && mouseY > 560) {
      if (mouseX < 700 && mouseX > 575) {
        //Move Up
        gameCommands.addCommands(0);
      }

    }

    if (mouseY < 620 && mouseY > 585) {
      if (mouseX < 635 && mouseX > 535) {
        //Move Left button
        gameCommands.addCommands(1);
      } else if (mouseX < 735 && mouseX > 640) {
        //Move Right button
        gameCommands.addCommands(2);
      } else if (mouseX < 985 && mouseX > 735) {
        gameCommands.removeLastCommand();
      }
    }

    if (mouseY < 640 && mouseY > 620) {

      if (mouseX < 700 && mouseX > 575) {
        //Move Down button
        gameCommands.addCommands(3);
      }

    }

    if (mouseY < 640 && mouseY > 600) {
      if (mouseX < 410 && mouseX > 285) {
        if (gamePlayer.getMoving() == 0) {
          //Execute button
          if (gameCommands.getAllCommands().length == 0) {
            //If there are no commands do not execute
            gameConsole.insertLog("ERROR: THERE ARE NO COMMANDS TO EXECUTE");
          } else {
            gamePlayer.reset();
            gameScore.resetScore();
            gameHP.reset();
            gamePlayer.setPlayerPosition(gameMap.getMapColumns() - 1, gameMap.getMapRows() - 1);
            gamePlayer.movePlayerPosition(gameCommands.getAllCommands());
            gameConsole.insertLog("STARTING SIMULATION ...");
            gameConsole.insertLog("EXECUTING INSTRUCTIONS ...");
          }
        }
      }

      if (mouseX < 510 && mouseX > 420) {
        if (gamePlayer.getMoving() == 0) {
          //Reset button
          gamePlayer.reset();
          gameScore.resetScore();
          gameHP.reset();
          gamePlayer.setPlayerPosition(gameMap.getMapColumns() - 1, gameMap.getMapRows() - 1);
          gameCommands.clearAllCommands();
          gameConsole.insertLog("RESETTING...");
        } else {
          gameConsole.insertLog("GAME EXECUTING UNABLE TO RESET");
        }

      }


    }

  } //End of gamestate 1

  if (gameState.getGameState() == 2) {
    if (mouseY < 188 && mouseY > 125) {
      //Quit without saving
      clear();
    }
  } // End of gamestate 2

  if (gameState.getGameState() == 3) {      //level complete, exit to main menu
    if (mouseX < 700 && mouseX > 575) {
      if (mouseY < 588 && mouseY > 450) {
        //Exit to main menu
        
        gameLeaderboard.setCheckGetSuccess(0);
        gameState.setGameState(4);
        gameMenu.display(); //GameMenu display
      }
    }
    else if (mouseX < 930 && mouseX > 850) {
      if (mouseY < 538 && mouseY > 450)   //level complete, proceed to next level
      {
        
        gameState.setGameState(0);
      }
    }

  } // End of gamestate 3

  if (gameState.getGameState() == 4) {
    if (mouseY < 188 && mouseY > 125) {
      //Game Lost
      gameOver.insertGameOverData(gameScore.getScore(), gameHP.getHealth())
      clear();
      gameState.setGameState(0);

    }
  }
}

function keyPressed() {
  if (gameState.getGameState() == 1 && keyIsDown(ESCAPE)) {
    gameState.setGameState(2);
    clear();
  } else if (gameState.getGameState() == 2 && keyIsDown(ESCAPE)) {
    gameState.setGameState(1);
    clear();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
