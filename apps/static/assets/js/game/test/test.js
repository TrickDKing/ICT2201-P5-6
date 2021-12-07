'use strict';
require('jsdom-global')();
global.window = window;
global.$ = require('jquery');
global.jQuery = $;

// Import the expect library.  This is what allows us to check our code.
// You can check out the full documentation at http://chaijs.com/api/bdd/
const expect = require('chai').expect;

// const Game = require('../sketch');
const GameHP = require('../GameHP');
const GameScore = require('../GameScore');
const GameMap = require('../GameMap');
const GamePlayer = require('../GamePlayer');
const GameConsole = require('../GameConsole');
const GameMenu = require('../GameMenu');
const GameState = require('../GameState');

describe('Game tests', function() {
  
    // let game;
    let gameHP;
    let gameScore;
    let gameMap;
    let gamePlayer;
    let gameConsole;
    let gameMenu;
    let gameState;

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

        gameMenu = new GameMenu();
        gameState = new GameState();

    });


    // // G-01
    // it('should complete level (gamestate 3), after reaching end', function(done) {
    //     gamePlayer.gameState = new GameState();
    //     gamePlayer.unittest = 1
    //     gamePlayer.setPlayerPosition(0,0);
    //     gamePlayer.movePlayerPosition([0]);

    //     expect(gamePlayer.gameState.getGameState()).to.equal(3)
    //     done();
    // });


    // G-03
    it('should add health, after running into a buff', function(done) {

        gamePlayer.gameHP = new GameHP();
        gamePlayer.unittest = 1;
        gamePlayer.checkFront = 3;
        gamePlayer.movePosition(0);

        expect(gamePlayer.gameHP.getHealth()).to.equal(105)
        done();
    });


    // G-04
    it('should deduct health, after running into a trap', function(done) {

        gamePlayer.gameHP = new GameHP();
        gamePlayer.gameScore = new GameScore();
        gamePlayer.unittest = 1;
        gamePlayer.checkFront = 2;
        gamePlayer.movePosition(0);

        expect(gamePlayer.gameHP.getHealth()).to.equal(95)
        expect(gamePlayer.gameScore.getScore()).to.equal(-1)
        done();
    });


    // G-05
    it('should log in console, after running into an obstacle', function(done) {

        gamePlayer.unittest = 1;
        gamePlayer.checkFront = 0;
        gamePlayer.movePosition(0);
        
        expect(gamePlayer.gameConsole.getLogs()[0]).to.equal("ERROR OBSTACLE UNABLE TO MOVE!")
        done();
    });


    // G-08
    it('should start game, after clicking start button', function(done) {

        gameMenu.unittest = 1;
        gameMenu.setOption(1);
        gameMenu.display();
        
        expect(gameMenu.gameState.getGameState()).to.equal(1)
        done();
    });


    // // G-10
    // it('should quit game, after hitting esc', function(done) {

    //     gameState.setGameState(4)
        
    //     expect(gameState.getGameState()).to.equal(4)
    //     done();
    // });

    
    // Example
    it('should 0 health, after calling gameHP.setHealth(1) 100 times', function(done) {
        for (let count = 0; count < 100; count += 1) {
            gameHP.setHealth(1);
        }
        expect(gameHP.getHealth()).to.equal(0)
        done();
    });


});