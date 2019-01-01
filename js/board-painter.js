TablePainter = require('./table-painter');
BallPainter = require('./ball-painter');

class BoardPainter {

  constructor(tablePainter, ballPainter) {
    this.tablePainter = tablePainter;
    this.ballPainter = ballPainter;
  }

  paintBoard(ctx, board) {
    this.tablePainter.paintTable(ctx, board.table);
    this.ballPainter.paintBalls(ctx, board.balls);
  }

  static createDefault() {
    return new BoardPainter(TablePainter.createDefault(),
                            BallPainter.createDefault());
  }

}

module.exports = BoardPainter;
