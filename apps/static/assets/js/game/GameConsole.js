class GameConsole {
    constructor() {
        this.log = [];

    }

    insertLog(logString) {
        if (this.log.length == 20) {
            this.log.shift();
        }
        this.log.push(logString);
    }

    getLogs() {
        return this.log;
    }
    clearAllLogs()
    {
        this.log = [];
    }

    display() {

        fill(0, 0, 0, 0);
        //Set outline to black
        stroke(0);
        rect(1130, 50, 450, 500);

        //Defines text size
        textSize(45);
        fill(0);
        text('DEBUG CONSOLE ', 1160, 100);

        //Defines text size
        textSize(15);
        let x = 1150;
        let y = 130;
        for (let i = 0; i < this.log.length; i++) {
            text(this.log[i], x, y);
            y += 20;
        }

    }
}