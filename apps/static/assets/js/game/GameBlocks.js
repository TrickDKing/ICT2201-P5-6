class GameBlocks {
    constructor() {
        this.commands = ["move forward", "move backwards", "move left"];
    }

    removeAllCommands(){

    }

    getArraySize(){
        return this.commands.length;
    }

    getCommands(index){
        return this.commands[index];
    }

    /*mouseClicked(){
        if (mouseX < 650 && mouseX > 550) {
            if (mouseY < 520 && mouseY > 500) {
                return this.executeCommands();
            }
        }
    }*/
    
    display() {

        fill(0, 0, 0, 0);
        //Set outline to black
        stroke(0);
        rect(520, 50, 600, 500);
        //Defines text size
        textSize(50)

        fill(0);
        text('COMMANDS ', 560, 100);
        let y = 150;
        for (let i = 0; i< this.commands.length; i++){
            text((i+1) + " " + this.commands[i], 560, y);
            y+=50;
        }

        noFill();
        rect(540, 500, 114, 25);
        textSize(20);
        fill(0);
        text('EXECUTE ', 550, 520);


    }
}