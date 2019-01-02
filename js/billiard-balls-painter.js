const PhysicalBallPaintUtils = require('./physical-ball-paint-utils');
const BilliardBallsPaintUtils = require('./billiard-balls-paint-utils');

class BilliardBallsPainter {

  constructor(paintCueBallFunction, paintNormalBilliardBallFunction) {
    this.paintCueBallFunction = paintCueBallFunction;
    this.paintNormalBilliardBallFunction = paintNormalBilliardBallFunction;
  }

  paintBilliardBalls(ctx, billiardBalls) {
    this.paintCueBall(ctx, billiardBalls.cueBall);
    billiardBalls.normalBilliardBalls.forEach(
      normalBilliardBall => this.paintNormalBilliardBall(
        ctx, normalBilliardBall));
  }

  paintCueBall(ctx, cueBall) {
    PhysicalBallPaintUtils.paintShadow(ctx, cueBall.physicalBall);
    this.paintCueBallFunction(ctx, cueBall);
    PhysicalBallPaintUtils.paintHighlights(ctx, cueBall.physicalBall);
  }

  paintNormalBilliardBall(ctx, normalBilliardBall) {
    PhysicalBallPaintUtils.paintShadow(ctx, normalBilliardBall.physicalBall);
    this.paintNormalBilliardBallFunction(ctx, normalBilliardBall);
    PhysicalBallPaintUtils.paintHighlights(ctx, normalBilliardBall.physicalBall);
  }

  static createDefault() {
    return new BilliardBallsPainter(
      BilliardBallsPaintUtils.paintCueBall,
      BilliardBallsPaintUtils.paintNormalBilliardBall);
  }

}

module.exports = BilliardBallsPainter;
