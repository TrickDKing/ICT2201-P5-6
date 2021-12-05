class GameCommands {
  constructor() {
    this.commands = [];
    this.url = 'http://127.0.0.1:5000/commands'; // Target URL
  }

  clearAllCommands() {
    this.commands = [];
  }

  addCommands(value) {
    this.commands.push(value);
  }

  removeLastCommand(){
    this.commands.pop();
  }

  getAllCommands(){
    return this.commands;
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
    let y = 130;
    let x = 540
    for (let i = 0; i < this.commands.length; i++) {
      if(i%20==0 && i!=0){
        x += 150
        y = 130;
      }
      if(i == 80){
        //Stops at the 
        break;
      }
      text((i + 1) + " " + this.checkCommands(this.commands[i]), x, y);
      y += 20;
    }

    //Defines text size
    textSize(50);
    fill(0);
    text('COMMANDS ', 670, 100);

    textSize(20);
    noFill();
    rect(290, 610, 114, 25); //Execute box
    rect(420, 610, 85, 25); //Reset box
    rect(580, 560, 115, 25);  //Up box
    rect(580, 620, 115, 25); // Down box
    rect(540, 590, 90, 25);  //Left box
    rect(640, 590, 90, 25); // Right box
    rect(740, 590, 240, 25); // Remove last command box

    fill(0);
    textSize(20);
    text('EXECUTE ', 300, 630);
    text('RESET', 430, 630);
    text('UP ', 620, 580);
    text('DOWN ', 608, 640);
    text('LEFT ', 560, 610);
    text('RIGHT ', 650, 610);
    text('POP LAST COMMAND', 760, 610);

  }
}