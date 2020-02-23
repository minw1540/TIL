
class Main {
  canvas = null;
  ctx = null;
  board = null;
  moves = {
    [KEY.LEFT]:  piece => ({ ...piece, x: piece.x - 1 }),
    [KEY.RIGHT]: piece => ({ ...piece, x: piece.x + 1 }),
    [KEY.DOWN]:  piece => ({ ...piece, y: piece.y + 1 }),
    [KEY.SPACE]: piece => ({ ...piece, y: piece.y + 1 }),
    [KEY.UP]: piece => this.board.rotate(piece)
  };
  
  constructor() {
    this.canvas = document.getElementById('board');
    this.ctx = this.canvas.getContext('2d');
    // 캔버스 크기 계산
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.board = new Board();

    this.addEventListener();
  }

  addEventListener() {
    document.getElementById('play')
      .addEventListener('click', () => this.play());

    
    document.addEventListener('keydown', event => this.movePiece(event));
  }

  play(){
    const piece = new Piece(this.ctx);

    this.board.reset();
    piece.draw();

    this.board.setPiece(piece);
  }

  movePiece(event){
    const {moves, board, ctx} = this;

    if (_.isUndefined(moves[event.keyCode]) || _.isNull(board.grid)) {
      return;
    }

    event.preventDefault();

    const piece = board.getPiece();
    let newPieceStatus = moves[event.keyCode](piece);

    if(!board.valid(newPieceStatus)){
      return;
    }

    if (event.keyCode === KEY.SPACE) {
      // Hard drop
      while (board.valid(newPieceStatus)) {
        piece.move(newPieceStatus);
        newPieceStatus = moves[KEY.DOWN](piece);
      }
    }else{
      piece.move(newPieceStatus);
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
    piece.draw();
  }
}

let App = {};
(function () {
  new Main();
})(App || (App = {}));