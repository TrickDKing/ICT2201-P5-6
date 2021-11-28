class GameMap {

    constructor(rows, cols) {
      this.cols = cols;
      this.rows = rows;
      this.resolution = 50;
      this.grid;
      this.setObjects();
    }
  
    setObjects() {
      this.grid = this.create2DArray(this.cols, this.rows);
  
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          this.grid[i][j] = floor(random(4));
          
        }
      }
      //Ensure no objects are spawned at the start and end of the map
      this.grid[0][0] = 1;
      this.grid[this.rows-1][this.cols-1] = 1;
    }
  
    create2DArray(cols, rows) {
  
      //Generate a 2D array to have the map spawn with objects
      let arr = new Array(cols);
      for (let i = 0; i < cols; i++) { //Creates a 2D array that is empty
        arr[i] = new Array(rows);
      }
      return arr;
    }
  

    getMapRows(){
      return this.rows;
    }

    getMapColumns(){
      return this.cols;
    }
  
    spawnMap() {
      clear();
      
      for (let i = 0; i < this.cols; i++) {
        for (let j = 0; j < this.rows; j++) {
          
          let x = i * this.resolution;
          let y = 50 + (j * this.resolution);
          if (this.grid[i][j] == 1) {
            //normal path
            fill('white');
            stroke(0);
            rect(x, y, this.resolution, this.resolution);
          }
          else if (this.grid[i][j] == 2){
            //trap
            fill('yellow');
            stroke(0);
            rect(x, y, this.resolution, this.resolution);
          }
          else if (this.grid[i][j] == 3){
            //buffs
            fill('green');
            stroke(0);
            rect(x, y, this.resolution, this.resolution);
          }
          else {
            //obstacle
            fill('red');
            stroke(0);
            rect(x, y, this.resolution, this.resolution);
          }
        }
      }
      
      textSize(15) //Defines text size
      fill("black"); //Fill here defines text color
      text('START', 452, 568); //Display text and positions
      text('END', 10, 46); //Display text and positions
    }
  
  }