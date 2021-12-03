const canvasSize = 500;

let grid = [];
let currentBlock;

function startBlock() {
    return {
        r: 255,
        g: 255,
        b: 255
    }
}

function buffBlock() {
    return {
        r: 0,
        g: 255,
        b: 0
    }
}

function debuffBlock() {
    return {
        r: 255,
        g: 0,
        b: 0
    }
}

function wallBlock() {
    return {
        r: 0,
        g: 0,
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

function changeTileColor(event) {
    const { layerX, layerY } = event;
    const tileSize = canvasSize / grid.length;

    const x = Math.floor(layerX / tileSize);
    const y = Math.floor(layerY / tileSize);

    tile = grid[x][y];
    console.log(grid);

    start_block = startBlock();

    if (tile.r == start_block.r && tile.g == start_block.g && tile.b == start_block.b) {
        if (currentBlock == "buff") {
            grid[x][y] = buffBlock();
        } else if (currentBlock == "debuff") {
            grid[x][y] = debuffBlock();
        } else if (currentBlock == "wall") {
            grid[x][y] = wallBlock();
        } else {
            grid[x][y] = startBlock();
        }
    } else {
        grid[x][y] = startBlock();
    }

    redraw();

    grid.forEach((row, x) => {
        row.forEach((element, y) => {
            fill(element.r, element.g, element.b)
            rect(tileSize * x, tileSize * y, tileSize, tileSize)
        })
    })
}

function setup() {
    const canvas = createCanvas(canvasSize, canvasSize).parent('canvasHolder');
    canvas.mouseClicked(changeTileColor);

    grid = generateGrid(10);
}

function draw() {
    const tileSize = canvasSize / grid.length;

    grid.forEach((row, x) => {
        row.forEach((element, y) => {
            fill(element.r, element.g, element.b)
            rect(tileSize * x, tileSize * y, tileSize, tileSize)
        })
    })

    textSize(14) //Defines text size
    fill("black"); //Fill here defines text color
    text('START', 454, 495); //Display text and positions
    text('END', 10, 45); //Display text and positions
}

$("#buffsBtn").click(function() {
    $(".btn").removeClass("active");
    $(this).addClass("active");

    currentBlock = "buff";
});

$("#debuffsBtn").click(function() {
    $(".btn").removeClass("active");
    $(this).addClass("active");

    currentBlock = "debuff";
});

$("#wallsBtn").click(function() {
    $(".btn").removeClass("active");
    $(this).addClass("active");

    currentBlock = "wall";
});

$("#clearBtn").click(function() {
    $(".btn").removeClass("active");

    grid = generateGrid(10);
});

$("#saveBtn").click(function() {
    console.log(grid);
});