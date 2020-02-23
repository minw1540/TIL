class Board {
  grid = null;
  piece = null;
  
  constructor() {}

  reset() {
    this.grid = this.getEmptyBoard();
  }
  
  getEmptyBoard() {
    return _.times(ROWS, () => _.times(COLS, _.constant(0)));
  }

  setPiece(piece) {
    this.piece = piece;
  };

  getPiece(){
    return this.piece;
  }

  valid(piece) {
    return _.every(piece.shape, (row, dy) => {
      return _.every(row, (value, dx) => {
        let x = piece.x + dx;
        let y = piece.y + dy;
        return (
          !value ||
          (this.insideWalls(x) && this.aboveFloor(y) && this.notOccupied(x, y))
        );
      });
    });
  }

  insideWalls(x) {
    return x >= 0 && x < COLS;
  }

  aboveFloor(y) {
    return y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && !this.grid[y][x];
  }

  rotate(piece) {
    // Clone with JSON for immutability.
    let clonePiece = _.clone(piece);

    // Transpose matrix
    for (let y = 0; y < clonePiece.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [clonePiece.shape[x][y], clonePiece.shape[y][x]] = 
          [clonePiece.shape[y][x], clonePiece.shape[x][y]];
      }
    }

    // Reverse the order of the columns.
    _.forEach(clonePiece.shape, row => row.reverse());
    
    return clonePiece;
  }
}