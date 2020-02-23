class Piece {
  x = 3;
  y = 0;
  color = 'blue';
  shape = [
    [2, 0, 0], 
    [2, 2, 2], 
    [0, 0, 0]
  ];
  ctx = null;
  
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = this.color;

    _.forEach(this.shape, (row, y) => {
      _.forEach(row, (value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  move(value) {
    this.x = value.x;
    this.y = value.y;
    this.shape = value.shape;
  }
}