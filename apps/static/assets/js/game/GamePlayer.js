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

    setPlayerPosition(row, column) {
        this.currentPosition = [row, column];
    }

    reset() {
        //Resets the player object to original position
        this.x = this.width;
        this.y = this.height;
    }

    setMoving() {

        if (this.moving == 1) {
            this.moving = 0;
        }
        else if (this.moving == 0) {
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
            await delay(1000);
            this.movePosition(command);
            gameHP.setHealth(1);
            gameScore.setScore(1);
        }
        this.setMoving();
    };

    movePosition(command) {
        //Function to move player
        if (command == 0) {
            //Move forward
            this.y -= 50;
        }

        if (command == 1) {
            //Move left
            this.x -= 50;
        }

        if (command == 2) {
            //Move right
            this.x += 50;
        }

        if (command == 3) {
            //Move right
            this.y += 50;
        }

    }

    getPlayerPosition() {
        //Function to get current player position
        return this.currentPosition;
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