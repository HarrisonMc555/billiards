'use strict';

const TablePainter = require('./table-painter');
const BilliardBallsPainter = require('./billiard-balls-painter');

class BoardPainter {

  constructor(tablePainter, ballPainter) {
    this.tablePainter = tablePainter;
    this.ballPainter = ballPainter;
  }

  paintBoard(ctx, board) {
    this.tablePainter.paintTable(ctx, board.table);
    this.ballPainter.paintBilliardBalls(ctx, board.billiardBalls);
  }

  static createDefault() {
    return new BoardPainter(TablePainter.createDefault(),
                            BilliardBallsPainter.createDefault());
  }

}

module.exports = BoardPainter;
