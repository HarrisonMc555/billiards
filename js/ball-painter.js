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

  paintBalls(ctx, balls) {
    this.paintCueBall(ctx, balls.cueBall);
    balls.normalBilliardBalls.forEach(
      normalBilliardBall => this.paintNormalBilliardBall(
        ctx, normalBilliardBall));
  }

  paintCueBall(ctx, cueBall) {
    this.paintCueBallFunction(ctx, cueBall);
    paintBall(ctx, cueBall.ball);
  }

  paintNormalBilliardBall(ctx, normalBilliardBall) {
    this.paintNormalBilliardBallFunction(ctx, normalBilliardBall);
    paintBall(ctx, normalBilliardBall.ball);
  }

  static createDefault() {
    return new BallPainter(paintCueBall, paintNormalBilliardBall);
  }

}

module.exports = BallPainter;
