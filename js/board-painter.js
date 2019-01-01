TablePainter = require('./table-painter');
BallPainter = require('./ball-painter');

class BoardPainter {

  constructor(tablePainter, ballPainter) {
    this.tablePainter = tablePainter;
    this.ballPainter = ballPainter;
  }

  paintBoard(ctx, board) {
    this.tablePainter.paintTable(ctx, board.table);
    board.getAllBalls().forEach(ball => {
      this.ballPainter.paintBall(ctx, ball);
    });
  }

  static createDefault() {
    return new BoardPainter(TablePainter.createDefault(),
                            BallPainter.createDefault());
  }

}

module.exports = BoardPainter;
