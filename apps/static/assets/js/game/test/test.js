'use strict';


// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;

// const Game = require('../sketch');
const GameHP = require('../GameHP');
const GameScore = require('../GameScore');
const GameMap = require('../GameMap');
const GamePlayer = require('../GamePlayer');
const GameConsole = require('../GameConsole');

describe('Game tests', function() {
  
    // let game;
    let gameHP;
    let gameScore;
    let gameMap;
    let gamePlayer;
    let gameConsole;

    // beforeEach is a special function that is similar to the setup function in
    // p5.js.  The major difference it that this function runs before each it()
    // test you create instead of running just once before the draw loop
    // beforeEach lets you setup the objects you want to test in an easy fashion.
    beforeEach(function() {

        gameHP = new GameHP();
        gameHP.reset();

        gameScore = new GameScore();
        gameScore.resetScore();

        gameMap = new GameMap(10, 10);
        gamePlayer = new GamePlayer(475, 525);
        gameConsole = new GameConsole();

    });

    it('should add health, after running into a buff', function(done) {

        gamePlayer.gameHP = new GameHP();
        console.log("Initial HP:", gamePlayer.gameHP.getHealth())
        gamePlayer.unittest = 1;
        gamePlayer.checkFront = 3;
        gamePlayer.movePosition(0);

        expect(gamePlayer.gameHP.getHealth()).to.equal(105)
        // expect(gameScore.getScore()).to.equal(-1)
        done();
    });

    it('should 0 health, after calling gameHP.setHealth(1) 100 times', function(done) {
        console.log("Initial HP:", gameHP.getHealth())
        for (let count = 0; count < 100; count += 1) {
            gameHP.setHealth(1);
        }
        expect(gameHP.getHealth()).to.equal(0)
        done();
    });

    
  


});