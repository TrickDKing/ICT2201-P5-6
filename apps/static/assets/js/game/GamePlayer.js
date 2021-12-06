class GamePlayer {
    constructor(width, height) {
        this.x = width;
        this.y = height;
        this.diameter = 20;
        this.speed = 1;
    }

    getPlayerPosition(){
        //Function to get current player position
        return [this.x, this.y];
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

        if (keyIsDown(ESCAPE)) {
            gameState.setGameState(0);
            gameMenu.setOption(0);
        }
    }

    move(x, y) {

        this.x += x;
        this.y += y;
        if (this.x < 0 + (this.diameter / 2)) {
            this.x = 10;
        }
        if (this.y < 50 + (this.diameter / 2)) {
            this.y = 60;
        }
        if (this.x > 500 - (this.diameter / 2)) {
            this.x = 490;
        }
        if (this.y > 550 - (this.diameter / 2)) {
            this.y = 540;
        }
    }

    display() {
        fill(0);
        
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}