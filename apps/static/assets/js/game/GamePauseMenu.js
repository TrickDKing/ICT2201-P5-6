class GamePauseMenu{
    
    constructor(){
        
    }

    displayPauseMenu(){
        textSize(50);
        text('GAME PAUSED', 620, 50)
        textStyle(NORMAL);
        textFont('Helvetica', 40);
        text('RETURN TO MAIN MENU', 560, 150)
        //text('RE', 560, 150)
        noFill();
        rect(540, 110, 500, 50); //Return to menu box
    }

    

}