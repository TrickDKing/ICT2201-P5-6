let myCircle;
let gameState;
let gameMenu;
let gameScore;
let gamePlayer;
let gameMap;
let grid;
let shape1;
let gameCommands;
let gameData;
let gameHP;
let Gameleaderboard;
let pg;

function setup() {
  //createCanvas(windowWidth, windowHeight).parent('canvasHolder');
  createCanvas(1600, 660).parent('canvasHolder');
  background('orange');
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
  gameMap.getMapData(1);
  gamePlayer.setPlayerPosition(gameMap.getMapRows(), gameMap.getMapColumns()); //Initialise player position to be at the start

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {

  print(mouseX, mouseY);
  //In game Menu
  if (gameState.getGameState() == 0) {
    //gameBackground.display();
    gameMenu.display(); //GameMenu display

  }

  if (gameState.getGameState() == 1) {
    clear();
    background('orange');
    gameMap.spawnMap(); // Render map
    gameScore.display(); // Render Score
    gameHP.display(); //Render Health bar
    gamePlayer.update(); //Update player movements
    gamePlayer.display(); // Renders updated player movements
    gameCommands.display(); // Renders Games queue

    /*
    gamePlayer.keyPressed();
    */

  }

  if (gameState.getGameState() == 2) {
    //Game paused state
    gamePauseMenu.displayPauseMenu();
  }

  if (gameState.getGameState() == 3) {
    //Game end state
    gameLeaderboard.display();
  }

}

function mouseClicked() {

  if (gameState.getGameState() == 0 && gameMenu.getOption() == 0) {
    if (mouseX < 820 && mouseX > 460) {
      if (mouseY < 100 && mouseY > 50) {

        gameMenu.setOption(1);
      }
      if (mouseY < 275 && mouseY > 200) {

        gameMenu.setOption(2);
      }
      if (mouseY < 425 && mouseY > 350) {

        gameMenu.setOption(3);
      }
    }
  }

  if (gameState.getGameState() == 1) {

    if (mouseY < 430 && mouseY > 400) {
      if (mouseX < 815 && mouseX > 700) {
        //Move Up
        gameCommands.addCommands(0);
      }

    }

    if (mouseY < 480 && mouseY > 450) {
      if (mouseX < 745 && mouseX > 630) {
        //Move Left button
        gameCommands.addCommands(1);
      }
      else if (mouseX < 860 && mouseX > 750) {
        //Move Right button
        gameCommands.addCommands(2);
      }
    }

    if (mouseY < 520 && mouseY > 500) {

      if (mouseX < 815 && mouseX > 700) {
        //Move Down button
        gameCommands.addCommands(3);
      }

    }

    if (mouseY < 640 && mouseY > 600) {
      if (mouseX < 410 && mouseX > 285) {
        if (gamePlayer.getMoving() == 0) {
          //Execute button
          gamePlayer.reset();
          gameScore.resetScore();
          gameHP.reset();
          gamePlayer.movePlayerPosition(gameCommands.getAllCommands());
        }
      }

      if (mouseX < 510 && mouseX > 420) {
        if (gamePlayer.getMoving() == 0) {
          //Reset button
          gamePlayer.reset();
          gameScore.resetScore();
          gameHP.reset();
          gameCommands.clearAllCommands();
        }
        
      }


    }



  }
}

function keyPressed() {
  if (gameState.getGameState() == 1 && keyIsDown(ESCAPE)) {
    gameState.setGameState(2);
    clear();
  }
  else if (gameState.getGameState() == 2 && keyIsDown(ESCAPE)) {
    gameState.setGameState(1);
    clear();
  }
}

/*function mousePressed() {
  shape1.pressed();

}

function mouseReleased() {
  shape1.released();

}*/

class Game {
  //Class to render Game
  constructor() {
    //this.gameMenu = 0;

  }


}





