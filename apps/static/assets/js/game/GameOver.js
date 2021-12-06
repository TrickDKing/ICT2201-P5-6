class GameOver{
    
    constructor(){
        this.url = "http://127.0.0.1:5000/gameOver";
    }

    displayGameOver(){
        textSize(50);
        text('GAME OVER', 620, 50)
        textStyle(NORMAL);
        textFont('Helvetica', 40);
        text('Your accumulated score for this level is '+ gameScore.getScore(), 450, 100)
        text('RETURN TO MAIN MENU', 560, 150)
        
        noFill();
        rect(540, 110, 500, 50); //Return to menu box
        
        
        
    }

    insertGameOverData(score,remainhealth) {
        
        let url = "http://127.0.0.1:5000/gameOver";
        let data = {score:  score, energy_left: remainhealth};
        httpPost(url, 'json',data, function (success) {
        console.log(success);
        return success} , function(error) {console.log(error)});
       
    }

}
