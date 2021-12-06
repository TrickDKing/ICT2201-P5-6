'use strict';

// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;

const Game = require('../sketch');

describe('Game tests', function() {
  
    // let myCircle;
    // let gameState;
    // let gameMenu;
    // let gameScore;
    // let gamePlayer;
    // let gameMap;
    // let grid;
    // let gameCommands;
    // let gameData;
    // let gameHP;
    // let Gameleaderboard;
    // let pg;
    // let gameConsole;
    let game;

  // beforeEach is a special function that is similar to the setup function in
  // p5.js.  The major difference it that this function runs before each it()
  // test you create instead of running just once before the draw loop
  // beforeEach lets you setup the objects you want to test in an easy fashion.
    beforeEach(function() {
        // gameLeaderboard = new GameLeaderboard();
        // gameBackground = new GameBackground();
        // gameMenu = new GameMenu();
        // gameState = new GameState();
        // gameScore = new GameScore();
        // gamePlayer = new GamePlayer(475, 525);
        // gameMap = new GameMap(10, 10);
        // gameCommands = new GameCommands();
        // gameData = new GameData();
        // gameHP = new GameHP();
        // gamePauseMenu = new GamePauseMenu();
        // gameOver = new GameOver();
        // gameConsole = new GameConsole();
        // gameMap.getMapData(1);
        game = new Game();

        game.gameHP.setHealth(100);
    });

    it('should 0 health, after calling gameHP.setHealth(1) 100 times', function(done) {
        for (let count = 0; count < 100; count += 1) {
            game.gameHP.setHealth(1);
        }
        expect(game.gameHP.getHealth()).to.equal(0)
        done();
    });

    
  


});