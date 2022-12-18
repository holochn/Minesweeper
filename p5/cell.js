class Cell {
    constructor(i, j, w) {
      this.x = i;
      this.y = j;
      this.index_i = i * width;
      this.index_j = j * width;
      this.w = w;
      this.bee = false;
      this.revealed = false;
      this.neighborBees = 0;
    }
  
    show() {
      stroke(0);
      if(!this.revealed) {
        fill(255);
        rect(this.index_i, this.index_j, this.w); 
      } else {
          fill(200);
          rect(this.index_i, this.index_j, this.w); 
  
          if(this.bee) {
            fill(120);
            circle(this.index_i + (this.w * 0.5), this.index_j + (this.w * 0.5), this.w * 0.5); 
          } else {
            if(this.neighborBees > 0) {
              fill(0);
              text(this.neighborBees, this.index_i + this.w*0.3, this.index_j+this.w*0.7);
            }
          }
      }
    }
  
    countNeigborBees(grid) {
      if(this.bee) {
        this.neighborBees = -1;
        return;
      }
  
      for(let i=-1; i <= 1; i++) {
        for(let j=-1; j <= 1; j++) {
          let _x = this.x + i;
          let _y = this.y + j;
  
          if( _x >= 0 && _y >= 0 && _x < this.w && _y < this.w ) {
            if(grid[_x][_y].isBee()) {
              this.neighborBees++;
            }
          }
        }
      }
    }
  
    floodFill() {
      for(let i=-1; i <= 1; i++) {
        let _x = this.x + i;
        
        if(_x >= 0) {
          for(let j=-1; j <= 1; j++) {
            let _y = this.y + j;
            
            if(_y >= 0 && _x < this.w && _y < this.w ) {
              let neighbor = grid[_x][_y];
              if(neighbor.isRevealed() == false) {
                neighbor.reveal();
              }
            }
          }
        }
      }
    }
  
    reveal() {
      this.revealed = true;
      if(this.neighborBees ===  0) {
        this.floodFill();
      }
    }
  
    makeBee() {
      this.bee = true;
    }
  
    isBee() {
      return this.bee;
    }
  
    isRevealed() {
      return this.revealed;
    }
  }