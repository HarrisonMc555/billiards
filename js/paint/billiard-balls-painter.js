'use strict';

const BallPaintUtils = require('./ball-paint-utils');
const BilliardBallsPaintUtils = require('./billiard-balls-paint-utils');
const PaintUtil = require('./paint-util');

class BilliardBallsPainter {

  constructor(paintCueBallFunction, paintNormalBilliardBallFunction) {
    this.paintCueBallFunction = paintCueBallFunction;
    this.paintNormalBilliardBallFunction = paintNormalBilliardBallFunction;
  }

  paintBilliardBalls(ctx, billiardBalls) {
    this.paintShadows(ctx, billiardBalls);
    this.paintActualBilliardBalls(ctx, billiardBalls);
  }

  paintShadows(ctx, billiardBalls) {
    BallPaintUtils.paintShadow(ctx,
                                       billiardBalls.cueBall.ball);
    billiardBalls.normalBilliardBalls.forEach(
      normalBilliardBall => BallPaintUtils.paintShadow(
        ctx, normalBilliardBall.ball));
  }

  paintActualBilliardBalls(ctx, billiardBalls) {
    this.paintBilliardBall(ctx, billiardBalls.cueBall,
                           this.paintCueBallFunction);
    billiardBalls.normalBilliardBalls.forEach(
      normalBilliardBall => this.paintBilliardBall(
        ctx, normalBilliardBall, this.paintNormalBilliardBallFunction));
  }

  paintBilliardBall(ctx, billiardBall, paintFunction) {
    paintFunction(ctx, billiardBall);
    BallPaintUtils.paintHighlights(ctx, billiardBall.ball);
    if (billiardBall.ball.velocity.getMagnitudeSquared() > 1) {
      PaintUtil.paintVelocity(ctx, billiardBall.ball);
    }
  }

  static createDefault() {
    return new BilliardBallsPainter(
      BilliardBallsPaintUtils.paintCueBall,
      BilliardBallsPaintUtils.paintNormalBilliardBall);
  }

}

module.exports = BilliardBallsPainter;
