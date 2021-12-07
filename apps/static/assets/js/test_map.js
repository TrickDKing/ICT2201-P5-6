var mapArray;

async function getMap() {
    var levelName = $("#levelName").val();
    mapArray = $("#mapArray").val();
    var levelType = $("#levelType").val();
    var energyLevel = $("#energyLevel").val();

    var stringified = '[' + mapArray.replace(/'/g, '"') + ']';
    mapArray = JSON.parse(stringified)[0];
    console.log(mapArray);
}

const canvasSize = 500;

let grid = [];

function startBlock() {
    return {
        r: 255,
        g: 255,
        b: 255
    }
}

function generateGrid(size) {
    let grid = [];

    for (let x = 0; x < size; x++) {
        let row = [];
        for (let y = 0; y < size; y++) {
            row.push(startBlock());
        }
        grid.push(row);
    }
    return grid;
}

async function setup() {
    const canvas = createCanvas(canvasSize, canvasSize).parent('canvasHolder');

    grid = generateGrid(10);

    const tileSize = canvasSize / grid.length;

    getMap().then(
        mapArray.forEach((row, x) => {
            row.forEach((element, y) => {
                if (element == 1) {
                    fill("white");
                } else if (element == 2) {
                    fill("yellow");
                } else if (element == 3) {
                    fill("green");
                } else {
                    fill("red");
                }
                rect(tileSize * x, tileSize * y, tileSize, tileSize)
            })
        })
    )

    textSize(14) //Defines text size
    fill("black"); //Fill here defines text color
    text('START', 454, 495); //Display text and positions
    text('END', 10, 45); //Display text and positions
}