class GameScore {
  //Class to render Score
  constructor() {
    this.score = 0;
  }

  setScore(score) {
    this.score += score;
  }

  getScore() {
    return this.score;
  }

  resetScore() {
    this.score = 0;
  }

  display() {

    fill(255, 255, 255);
    //Set outline to black
    stroke(255);
    //rect(10, 600, 350, 75);
    //Defines text size
    textSize(40);
    //Fill here defines text color
    fill(0);
    text('SCORE = ' + this.score, 10, 640);
  }
}
