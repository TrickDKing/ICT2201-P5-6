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
  createCanvas(1520, 700).parent('canvasHolder');
  background('white');
  //console.log("A" + windowHeight);
  //createCanvas(1200, 600).parent('canvasHolder');
  //Height 754
  //Width 1536

  gameBackground = new GameBackground();
  gameMenu = new GameMenu();
  gameState = new GameState();
  gameScore = new GameScore();
  gamePlayer = new GamePlayer(475, 525);
  gameMap = new GameMap(10, 10);
  gameCommands = new GameCommands();
  gameData = new GameData();
  gameHP = new GameHP();
  gameBlocks = new GameBlocks();
  gamePauseMenu = new GamePauseMenu();
  Gameleaderboard = new GameLeaderboard();
  shape1 = new Draggable(700, 100, 50, 50);

  gamePlayer.setPlayerPosition(gameMap.getMapRows(), gameMap.getMapColumns()); //Initialise player position to be at the start
  /*httpPost(url, 'json', postData,  function(result) {console.log(result)}
  );*/
  console.log("POSTION " + gamePlayer.getPlayerPosition());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  
  //print(mouseX, mouseY);
  //In game Menu
  if (gameState.getGameState() == 3) {
    gameBackground.display();
    gameMenu.display();
    //gameData.postGameData({ userId: 1, score: 21, body: 'This game is garbage' });
  }

  if (gameState.getGameState() == 1) {
   

    gameMap.spawnMap(); // Render map
    gameScore.display(); // Render Score
    gameHP.display(); //Render Health bar

    gamePlayer.keyPressed();
    /*let v = gameBlocks.mouseClicked();
    console.log(v);
    if (v == "move forward"){
      gamePlayer.move(0, -50);
    }*/


    /*if(this.gameBlocks){

    }*/
    gamePlayer.update();
    gamePlayer.display();
    shape1.over();
    shape1.update();
    shape1.show();
    gameCommands.display();

    gameBlocks.display();
    //gamePlayer.move(0,0);

  }

  if (gameState.getGameState() == 2) {
    //Game paused state
    gamePauseMenu.displayPauseMenu();
  }

  if (gameState.getGameState() == 0) {
    //Game end state
    Gameleaderboard.display();
  }



}

function mouseClicked() {

  if (gameState.getGameState() == 0 && gameMenu.getOption() == 0) {
    if (mouseX < 630 && mouseX > 460) {
      if (mouseY < 100 && mouseY > 55) {

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
    if (mouseX < 655 && mouseX > 550) {
      if (mouseY < 525 && mouseY > 500) {
      
        for (let i = 0; i < gameBlocks.getArraySize(); i++) {
         
          gamePlayer.move(gameBlocks.getCommands(i));
          
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

function mousePressed() {
  shape1.pressed();

}

function mouseReleased() {
  shape1.released();

}

class Game {
  //Class to render Game
  constructor() {
    //this.gameMenu = 0;

  }


}





