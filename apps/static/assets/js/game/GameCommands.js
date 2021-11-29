class GameCommands {
  constructor() {
      this.commands = {
           "Commands" : ["move forward", "move backward"]
        };
      this.trash = 0
      this.url = 'http://127.0.0.1:5000/commands'; // Target URL
  }

  removeAllCommands(){

  }

  getArraySize(){
      return this.commands.length;
  }

  getCommands(index){
      return this.commands[index];
  }

  postCommands(postData){
    httpPost(this.url, 'json', postData, function (success) { console.log(success) } , function(error) {console.log(error)});
  }

  /*mouseClicked(){
      if (mouseX < 650 && mouseX > 550) {
          if (mouseY < 520 && mouseY > 500) {
              return this.executeCommands();
          }
      }
  }*/
  
  display() {
      if(this.trash == 0){
        this.postCommands(this.commands)
        this.trash = 1
      }
      fill(0, 0, 0, 0);
      //Set outline to black
      stroke(0);
      rect(520, 50, 600, 500);
      //Defines text size
      textSize(50);

      fill(0);
      text('COMMANDS ', 560, 100);
      textSize(20);
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