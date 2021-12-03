class GameMenu {
  //Class to render Game Menu
  constructor() {
    this.gameMenu = 0;
    this.points = [];
    this.mult = 0.005;
    this.displayMenuBG();
  }

  getOption() {
    return this.gameMenu;
  }

  setOption(gameMenu) {
    this.gameMenu = gameMenu;
  }

  

  displayMenuBG() {


    var density = 10; // The number of points in each row
    var space = width / density;

    for (var x = 0; x < width; x += space) {
      for (var y = 0; y < height; y += space) {
        var p = createVector(x, y)
        this.points.push(p)
      }
    }



  }

  displayGameMenu() {
   
    //Create Start rect
    //rect(windowWidth/2, windowHeight/2,0,0);
    fill(255, 0, 0);
    //rect(550, 50, 270, 75);
    //Create Instructions
    fill(255, 0, 0);
    //rect(500, 200, 380, 95);
    //Create Settings rectangle
    fill(255, 0, 0);
    //rect(550, 350, 260, 75);
    //Defines text size
    textSize(50)
    //Fill here defines text color
    fill(0);
    //Display text and positions
    text('START', (windowWidth / 3) - 50, 100);
    text('INSTRUCTIONS',(windowWidth / 3) - 150, 250);
    text('SETTINGS', (windowWidth / 3) - 100, 400);
  }


  displayHelpManual() {
    background(0)
    textSize(20)
    text('BACKSPACE to return to MENU', 500, 30)
    textSize(30)
    text('1. Move your characeter using arrow keys.', 50, 150)
    text('2. Move your character using arrow keys', 50, 200)
    text('<- Avoid movement.', 80, 240)
    text('3. The game is over when your battery is zero.', 50, 290)
    if (keyIsDown(BACKSPACE)) {
      this.gameMenu = 0;
    }
  }

  displaySettings() {
   
    textSize(75)
    text('SETTINGS!', 25, height / 2)
    if (keyIsDown(BACKSPACE)) {
      this.gameMenu = 0;
    }
  }

  display() {
    if (gameState.getGameState() == 0 && this.getOption() == 0) {
      this.displayGameMenu();
    } else if (this.getOption() == 1) {
      gameState.setGameState(1);
      if (keyIsDown(BACKSPACE)) {
        this.gameMenu = 0;
      }
    } else if (this.getOption() == 2) {
      this.displayHelpManual();
    }
    else if (this.getOption() == 3) {
      this.displaySettings();
    }
  }

}