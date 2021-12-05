class GameOver{
    
    constructor(){
        
    }

    displayGameOver(){
        textSize(50);
        text('GAME OVER', 620, 50)
        textStyle(NORMAL);
        textFont('Helvetica', 40);
        text('Your accumulated score for this level is '+ gameScore.getScore(), 450, 100)
        text('RETURN TO MAIN MENU', 560, 150)
        //text('RE', 560, 150)
        noFill();
        rect(540, 110, 500, 50); //Return to menu box
        
        
    }
   
    

}
