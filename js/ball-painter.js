const CueBall = require('./cue-ball');
const NormalBilliardBall = require('./normal-billiard-ball');
paintCueBall = require('./paint-cue-ball');
paintNormalBilliardBall = require('./paint-normal-billiard-ball');
paintBall = require('./paint-ball');

class BallPainter {

  constructor(paintCueBallFunction, paintNormalBilliardBallFunction) {
    this.paintCueBallFunction = paintCueBallFunction;
    this.paintNormalBilliardBallFunction = paintNormalBilliardBallFunction;
  }

  paintBall(ctx, ball) {
    if (ball instanceof CueBall) {
      this.paintCueBallFunction(ctx, ball);
    } else if (ball instanceof NormalBilliardBall) {
      this.paintNormalBilliardBallFunction(ctx, ball);
    } else {
      throw 'Tried to draw something that wasn\'t a CueBall or ' +
        'NormalBilliardBall.';
    }
    paintBall(ctx, ball);
  }

  static createDefault() {
    return new BallPainter(paintCueBall, paintNormalBilliardBall);
  }

}

module.exports = BallPainter;
