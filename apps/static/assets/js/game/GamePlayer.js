class GamePlayer {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.x = width;
        this.y = height;
        this.diameter = 20;
        this.xspeed = 0;
        this.yspeed = 0;
        this.currentPosition;
        this.temp = 0;
        this.currentCommand;
        this.moving = 0;
    }

    getPlayerPosition() {
        //Function to get current player position
        return this.currentPosition;
    }

    setPlayerPosition(col, row) {

        this.currentPosition = [col, row];
    }

    reset() {
        //Resets the player object to original position
        this.x = this.width;
        this.y = this.height;
    }

    setMoving() {

        if (this.moving == 1) {
            this.moving = 0;
        } else if (this.moving == 0) {
            this.moving = 1;
        }

    }

    getMoving() {
        return this.moving;
    }

    async movePlayerPosition(commands) {
        var delay = ms => new Promise(res => setTimeout(res, ms));
        this.setMoving();
        for (const command of commands) {

            if (this.getPlayerPosition()[0] == 0 && this.getPlayerPosition()[1] == 0) {
                clear();
                gameState.setGameState(3);
                break;
            }

            if (gameHP.getHealth() > 0) {
                await delay(1000);
                this.movePosition(command);
                gameHP.setHealth(1);
                gameScore.setScore(1);
                gameConsole.insertLog("Moving One Grid: HP --");

            } else {
                gameState.setGameState(4);
                clear();
                break;
            }

        }

        this.setMoving();
        gameConsole.insertLog("EXECUTION ENDED");

        

    };

    checkObstacle() {
        gameMap.checkGrid(gamePlayer.getPlayerPosition());
    }

    movePosition(command) {
        //Function to move player

        if (command == 0) {
            //Move forward
            let checkFront = gameMap.checkGrid(this.getPlayerPosition()[0], this.getPlayerPosition()[1] - 1);
            console.log(checkFront);
            if (checkFront == 0) {
                gameConsole.insertLog("ERROR OBSTACLE UNABLE TO MOVE!");
            } else if (checkFront >= 1 && checkFront <= 3) {

                if (checkFront == 2) {
                    gameConsole.insertLog("TRAP HIT! HP --");
                    gameHP.setHealth(5);
                    gameScore.setScore(-1);
                } else if (checkFront == 3) {
                    gameConsole.insertLog("BUFF ENCOUNTERED! RESTORING HP");
                    gameConsole.insertLog("HP ++");
                    gameHP.setHealth(-5);
                }

                gamePlayer.setPlayerPosition(gamePlayer.getPlayerPosition()[0], gamePlayer.getPlayerPosition()[1] - 1);
                this.y -= 50;
                gameConsole.insertLog("MOVING FORWARD");
            }

        }

        if (command == 1) {
            //Move left
            let checkLeft = gameMap.checkGrid(this.getPlayerPosition()[0] - 1, this.getPlayerPosition()[1]);
            if (checkLeft == 0) {
                gameConsole.insertLog("ERROR OBSTACLE UNABLE TO MOVE!");
            } else if (checkLeft >= 1 && checkLeft <= 3) {
                if (checkLeft == 2) {
                    gameConsole.insertLog("TRAP HIT! HP --");
                    gameHP.setHealth(5);
                    gameScore.setScore(-1);
                } else if (checkLeft == 3) {
                    gameConsole.insertLog("BUFF ENCOUNTERED! RESTORING HP");
                    gameConsole.insertLog("HP ++");
                    gameHP.setHealth(-5);
                }

                gamePlayer.setPlayerPosition(gamePlayer.getPlayerPosition()[0] - 1, gamePlayer.getPlayerPosition()[1]);
                this.x -= 50;
                gameConsole.insertLog("MOVING LEFT");
            }

        }

        if (command == 2) {
            //Move right
            let checkRight = gameMap.checkGrid(this.getPlayerPosition()[0] + 1, this.getPlayerPosition()[1]);
            if (checkRight == 0) {
                gameConsole.insertLog("ERROR OBSTACLE UNABLE TO MOVE!");
            } else if (checkRight >= 1 && checkRight <= 3) {
                if (checkRight == 2) {
                    gameConsole.insertLog("TRAP HIT! HP --");
                    gameHP.setHealth(5);
                    gameScore.setScore(-1);
                } else if (checkRight == 3) {
                    gameConsole.insertLog("BUFF ENCOUNTERED! RESTORING HP");
                    gameConsole.insertLog("HP ++");
                    gameHP.setHealth(-5);
                }
                gamePlayer.setPlayerPosition(gamePlayer.getPlayerPosition()[0] + 1, gamePlayer.getPlayerPosition()[1]);
                this.x += 50;
                gameConsole.insertLog("MOVING RIGHT");
            }

        }

        if (command == 3) {
            //Move Down
            let checkDown = gameMap.checkGrid(this.getPlayerPosition()[0], this.getPlayerPosition()[1] + 1);
            if (checkDown == 0) {
                gameConsole.insertLog("ERROR OBSTACLE UNABLE TO MOVE!");
            } else if (checkDown >= 1 && checkDown <= 3) {

                if (checkDown == 2) {
                    gameConsole.insertLog("TRAP HIT!");
                    gameConsole.insertLog("HP --");
                    gameHP.setHealth(5);
                    gameScore.setScore(-1);
                } else if (checkDown == 3) {
                    gameConsole.insertLog("BUFF ENCOUNTERED! RESTORING HP");
                    gameConsole.insertLog("HP ++");
                    gameHP.setHealth(-5);
                }

                gamePlayer.setPlayerPosition(gamePlayer.getPlayerPosition()[0], gamePlayer.getPlayerPosition()[1] + 1);
                this.y += 50;
                gameConsole.insertLog("MOVING DOWN");
            }

        }

    }



    keyPressed() {

        /*if (keyIsDown(LEFT_ARROW)) {
            this.move(-this.speed, 0);
            gameHP.setHealth(gameHP.getHealth()-1);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.move(this.speed, 0);
        }
        if (keyIsDown(UP_ARROW)) {
            this.move(0, -this.speed);
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.move(0, this.speed);
        }*/


    }

    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;

        if (this.x < 0 + (this.diameter / 2)) {
            this.x = 25;
        }
        if (this.y < 50 + (this.diameter / 2)) {
            this.y = 75;
        }
        if (this.x > 500 - (this.diameter / 2)) {
            this.x = 475;
        }
        if (this.y > 550 - (this.diameter / 2)) {
            this.y = 525;
        }
    }

    display() {
        this.update();

        fill(0);
        ellipse(this.x, this.y, this.diameter, this.diameter);

    }
}