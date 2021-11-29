class GameCommands {
  constructor() {
    this.commands = {
      "Commands": ["move forward", "move backward"]
    };
    this.trash = 0
    this.url = 'http://127.0.0.1:5000/commands'; // Target URL
  }

  removeAllCommands() {

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

  display() {
    if (this.trash == 0) {
      this.postCommands(this.commands)
      this.trash = 1
    }
    fill(0, 0, 0, 0);
    //Set outline to black
    stroke(0);
    rect(520, 50, 600, 500);
    //Defines text size
    textSize(50);

    
    let y = 150;
    for (let i = 0; i < this.commands.length; i++) {
      text((i + 1) + " " + this.commands[i], 560, y);
      y += 50;
    }
    fill(0);
    text('COMMANDS ', 560, 100);
    textSize(20);
    
    noFill();
    rect(540, 500, 114, 25); //Execute box
    rect(780, 400, 115, 25);  //Up box
    rect(780, 450, 115, 25); // Down box
    rect(680, 420, 115, 25);  //Left box
    rect(880, 420, 115, 25); // Right box
    rect(540, 400, 114, 25); // Rotate 90 deg box

    fill(0);
    textSize(20);
    text('EXECUTE ', 550, 520);
    text('UP ', 790, 420);
    text('DOWN ', 800, 470);
    text('LEFT ', 700, 440);
    text('RIGHT ', 880, 440);
    text('rotate', 550, 420);


  }
}