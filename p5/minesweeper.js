const canvas_size = 400;
let width = 20;
let cols = canvas_size / width;
let rows = canvas_size / width;
let grid;
let remainder = cols*rows;
let numBees=0;
let winner=0;
let left=0;


function setup() {
  var myCanvas = createCanvas(400, 420);
  myCanvas.parent("minesweeper_div");

  grid = new Array(cols);
  for(let i=0; i < cols; i++) {
    grid[i] = new Array(rows);
    for(let j=0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, width);
    
      if(Math.random() < 0.1) {
        numBees++;
        grid[i][j].makeBee();
      } 
    }
  }
  
  for(let i=0; i < cols; i++) {
    for(let j=0; j < rows; j++) {
      grid[i][j].countNeigborBees(grid);
    }
  }

  left = remainder - numBees;
}

function gameOver() {
  for(let i=0; i < cols; i++) {
    for(let j=0; j < rows; j++) {
      grid[i][j].reveal();
    }
  }
}

function won() {
  let numRevealed=0;
  for(let i=0; i<cols; i++) {
    for(let j=0; j<cols; j++) {
      if( (grid[i][j].isRevealed() == true) && (grid[i][j].isBee() == false)) {
        numRevealed++;
      }
    }
  }
  
  left = remainder - (numBees + numRevealed);
  console.log("Remainder: " + left);
  if( 0 == left) {
    // gameOver();
    winner = 1;
  }
}

function mousePressed() {
  let x = floor(mouseX / width);
  let y = floor(mouseY / width);
  
  grid[x][y].reveal();

  if(grid[x][y].isBee()) {
    winner = -1;
    gameOver();
  } else {
    won();
  }
}

function draw() {
  background(255);

  for(let i=0; i < cols; i++) {
    for(let j=0; j < rows; j++) {
      grid[i][j].show();
    }
  }

  textSize(18);
  if(winner == 1) {
    fill(0,200, 200);
    stroke(0,0,255);
    rect(100, 100, 200, 200);
    fill(0,0,255);
    text("Congratulations!\n You won!", 120, 150);
  } else if(winner == -1) {
    fill(0,200, 200);
    stroke(0,0,255);
    rect(100, 100, 200, 200);
    fill(0,0,255);
    text("You lost!", 120, 150);
  }
  textSize(16);
  fill(0);
  text("Remaining fields: " + left, 240, 416);

}
