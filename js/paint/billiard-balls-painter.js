'use strict';

const PhysicalBallPaintUtils = require('./physical-ball-paint-utils');
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
    PhysicalBallPaintUtils.paintShadow(ctx,
                                       billiardBalls.cueBall.physicalBall);
    billiardBalls.normalBilliardBalls.forEach(
      normalBilliardBall => PhysicalBallPaintUtils.paintShadow(
        ctx, normalBilliardBall.physicalBall));
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
    PhysicalBallPaintUtils.paintHighlights(ctx, billiardBall.physicalBall);
    PaintUtil.paintVelocity(billiardBall.physicalBall);
  }

  static createDefault() {
    return new BilliardBallsPainter(
      BilliardBallsPaintUtils.paintCueBall,
      BilliardBallsPaintUtils.paintNormalBilliardBall);
  }

}

module.exports = BilliardBallsPainter;
