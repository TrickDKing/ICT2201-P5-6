class GameMap {

  constructor(rows, cols) {
    this.cols = cols;
    this.rows = rows;
    this.resolution = 50;
    this.grid;
    this.setObjects();
    this.url = "http://127.0.0.1:5000/gameMaps";
  }

  getMapData(data) {
    let mapData;
    let sendData = { level_id: data };
    console.log(JSON.stringify(sendData));
    httpPost(this.url, 'json', sendData, mapData = function (success) { 
      console.log(success);
      return success }, function (error) { console.log(error) });
 
  }

  setObjects() {
    this.grid = this.create2DArray(this.cols, this.rows);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = floor(random(4));
      }
      
    }

    //Ensure no objects are spawned at the start and end of the map
    this.grid[0][0] = 1;
    this.grid[this.cols - 1][this.rows - 1] = 1;
    console.log(this.grid);
  }

  create2DArray(cols, rows) {

    //Generate a 2D array to have the map spawn with objects
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) { //Creates a 2D array that is empty
      arr[i] = new Array(rows);
    }
    return arr;
  }

  checkGrid(col, row) {

    /*if (col <= this.grid.cols && row <= this.grid.rows) {
      
    }*/
    return this.grid[col][row];
    //return;
  }



  getMapRows() {
    return this.rows;
  }

  getMapColumns() {
    return this.cols;
  }

  spawnMap() {

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {

        let x = i * this.resolution;
        let y = 50 + (j * this.resolution);
        if (this.grid[i][j] == 1) {
          //normal path
          fill('white'); //Spawns the object
          stroke(0);
          rect(x, y, this.resolution, this.resolution);
        }
        else if (this.grid[i][j] == 2) {
          //trap
          fill('yellow');
          stroke(0);
          rect(x, y, this.resolution, this.resolution);
        }
        else if (this.grid[i][j] == 3) {
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