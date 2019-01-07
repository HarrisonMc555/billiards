'use strict';

const TablePainter = require('./table-painter');
const BilliardBallsPainter = require('./billiard-balls-painter');
const Point = require('../model/point');
const CueStick = require('../model/cue-stick');
const CueStickPaintUtils = require('./cue-stick-paint-utils');

class BoardPainter {

  constructor(tablePainter, ballPainter) {
    this.tablePainter = tablePainter;
    this.ballPainter = ballPainter;
  }

  paintBoard(ctx, board) {
    this.tablePainter.paintTable(ctx, board.table);
    this.ballPainter.paintBilliardBalls(ctx, board.billiardBalls);
    if (board._debug.collidedLast) {
      console.log('painted after collision');
    }
    let cueStick = new CueStick(new Point(250, 250), Math.PI, 1);
    CueStickPaintUtils.paintCueStick(ctx, cueStick);
  }

  static createDefault() {
    return new BoardPainter(TablePainter.createDefault(),
                            BilliardBallsPainter.createDefault());
  }

}

module.exports = BoardPainter;
