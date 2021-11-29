class GameScore {
    //Class to render Score
    constructor() {
      this.score = 0;
    }
  
    setScore(score) {
      this.score = score;
    }
  
    getScore() {
      return this.score;
    }
  
    display() {
     
      fill(255, 255, 255);
      //Set outline to black
      stroke(255);
      //rect(10, 600, 350, 75);
      //Defines text size
      textSize(50)
      //Fill here defines text color
      fill(0);
      text('SCORE = ' + this.score, 10, 670);
    }
  }
  