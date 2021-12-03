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

function setup() {
    //createCanvas(windowWidth, windowHeight).parent('canvasHolder');
    createCanvas(1520, 700).parent('canvasHolder');
    //console.log("A" + windowHeight);
    //createCanvas(1200, 600).parent('canvasHolder');
    //Height 754
    //Width 1536


    gameMenu = new GameMenu();
    gameState = new GameState();
    gameScore = new GameScore();
    gamePlayer = new GamePlayer(475, 525);
    gameMap = new GameMap(10, 10);
    gameCommands = new GameCommands();
    gameData = new GameData();
    gameHP = new GameHP();
    gameBlocks = new GameBlocks();
    shape1 = new Draggable(700, 100, 50, 50);
    /*httpPost(url, 'json', postData,  function(result) {console.log(result)}
    );*/

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    clear();
    background('white');
    print(mouseX, mouseY);
    //In game Menu
    if (gameState.getGameState() == 1) {
        gameMenu.display();
        //gameData.postGameData({ userId: 1, score: 21, body: 'This game is garbage' });
    }

    if (gameState.getGameState() == 0) {
        gameMap.spawnMap(); // Render map
        gameScore.display(); // Render Score
        gameHP.display(); //Render Health bar
        //gameScore.setScore(gameScore.getScore() + 1);
        gamePlayer.keyPressed();
        /*let v = gameBlocks.mouseClicked();
        console.log(v);
        if (v == "move forward"){
          gamePlayer.move(0, -50);
        }*/


        /*if(this.gameBlocks){

        }*/
        gamePlayer.display();
        shape1.over();
        shape1.update();
        shape1.show();
        gameCommands.display();
        //console.log(gamePlayer.getPlayerPosition());
        gameBlocks.display();
        //gamePlayer.move(0,0);
    }

    if (gameState.getGameState() == 2) {
        //Game end state

    }

}

function mouseClicked() {

    if (gameState.getGameState() == 0 && gameMenu.getOption() == 0) {
        if (mouseX < 320 && mouseX > 50) {
            if (mouseY < 125 && mouseY > 50) {
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