class GamePlayer {
    constructor(width, height) {
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

    movePlayerPosition(commands) {
        for (let i = 0; i < commands.length; i++) {
            console.log(commands[i]);
            switch (commands[i]) {
               /* case "move left":
                    this.x -= 50;*/
                case "move forwards":
                    this.y -= 50;
                case "move left":
                    this.x -= 50;
                    // setTimeout(() => {  console.log("World!"); }, 2000);
            }
            
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



    move(command) {
        this.currentCommand = command;
        if (command == "move forward") {
            this.temp = this.y;
            console.log("A" + this.temp);

            this.speed = -1;
            this.moving = 1;

        }
        /*  if (command == "move backwards") {
              this.temp = this.y;
              //console.log("A" + this.temp);
  
              this.speed = 1;
          }*/
        /* if(command == "move backwards"){
             this.y += 10;
         }*/
        /*if(command == "move left"){
            this.x -= 10;
        }*/

        /*this.x += x;
        this.y += y;*/

    }

    polling() {
        return;
    }

    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;

       /* if (this.y == this.temp - 50 && this.currentCommand == "move forward") {
            console.log("B" + this.temp);
            this.yspeed = 0;
            this.temp = 0;
            this.currentCommand = "";
        }*/


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