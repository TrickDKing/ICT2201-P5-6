class GameCommands {
  constructor() {
    this.commands = [];
    this.url = 'http://127.0.0.1:5000/commands'; // Target URL
  }

  clearAllCommands() {
    this.commands = [];
  }

  getAllCommands(){
    return this.commands;
  }
  
  addCommands(value) {
    this.commands.push(value);
  }

  getArraySize() {
    return this.commands.length;
  }

  getCommands(index) {
    return this.commands[index];
  }

  postCommands(postData) {
    httpPost(this.url, 'json', postData, function (success) { console.log(success) }, function (error) { console.log(error) });
  }

  /*mouseClicked(){
      if (mouseX < 650 && mouseX > 550) {
          if (mouseY < 520 && mouseY > 500) {
              return this.executeCommands();
          }
      }
  }*/

  checkCommands(command) {
    switch (command) {
      case 0:
        return "Move Forward";
      case 1:
        return "Move Left";
      case 2:
        return "Move Right";
      case 3:
        return "Move Down";
    }
  }

  display() {

    fill(0, 0, 0, 0);
    //Set outline to black
    stroke(0);
    rect(520, 50, 600, 500);

    //Defines text size
    textSize(15);
    fill(0);
    let y = 150;
    for (let i = 0; i < this.commands.length; i++) {
      text((i + 1) + " " + this.checkCommands(this.commands[i]), 560, y);
      y += 20;
    }

    //Defines text size
    textSize(50);
    fill(0);
    text('COMMANDS ', 560, 100);

    textSize(20);
    noFill();
    rect(540, 500, 114, 25); //Execute box
    rect(960, 500, 114, 25); //Reset box
    rect(700, 400, 115, 25);  //Up box
    rect(700, 500, 115, 25); // Down box
    rect(630, 450, 115, 25);  //Left box
    rect(750, 450, 115, 25); // Right box
    rect(540, 400, 114, 25); // Rotate 90 deg box

    fill(0);
    textSize(20);
    text('EXECUTE ', 550, 520);
    text('RESET', 980, 520)
    text('UP ', 740, 420);
    text('DOWN ', 720, 520);
    text('LEFT ', 660, 470);
    text('RIGHT ', 780, 470);
    text('ROTATE', 550, 420);

  }
}