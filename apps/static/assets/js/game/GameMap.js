class GameMap {

  constructor(rows, cols) {
    this.cols = cols;
    this.rows = rows;
    this.resolution = 50;
    this.grid;
    this.setObjects();
    this.url = "http://127.0.0.1:5000/gameMaps";
    this.mapData;
    this.mapName;
    
    this.checkGetSuccess = 0;
  }

  getMapName(){
    return this.mapName;
  }

  getMapData(retrievedData) {
    this.mapName = retrievedData.name;
    var stringified = '[' + retrievedData.map_array.replace(/'/g, '"') + ']';
    let mapArray = JSON.parse(stringified)[0];
  
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = mapArray[i][j];
      }
    }

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
    if (this.checkGetSuccess == 0) {

      let sendData = { level_id: 1 };
      httpPost(this.url, 'json', sendData, function (success) {
        gameMap.getMapData(success);
      }, function (error) { console.log("ERROR FETCHING GAME MAP") });
      this.checkGetSuccess = 1;
    }

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
    textSize(30) //Defines text size
    text("LEVEL: " + this.mapName, 130, 40);
  }

}