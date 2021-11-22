class GameBlocks {
    constructor() {
        this.commands = ["move forward", "move backwards", "move left"];
    }

    removeAllCommands(){

    }

    executeCommands(){
        return this.commands[0];
    }

    /*mouseClicked(){
        if (mouseX < 650 && mouseX > 550) {
            if (mouseY < 520 && mouseY > 500) {
                return this.executeCommands();
            }
        }
    }*/

    display() {
        fill(0);
        text('COMMANDS ', 560, 100);
        let y = 150;
        for (let i = 0; i< this.commands.length; i++){
            text((i+1) + " " + this.commands[i], 560, y);
            y+=50;
        }
        noFill();
        rect(550, 500, 100, 20);
        textSize(20);
        text('EXECUTE ', 550, 520);
    }
}