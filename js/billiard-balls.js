const Defaults = require('./defaults');

class BilliardBalls {

  constructor(cueBall, normalBilliardBalls) {
    this.cueBall = cueBall;
    this.normalBilliardBalls = normalBilliardBalls;
  }

  getAllBalls() {
    let balls = [];
    balls.push(this.cueBall.ball);
    this.normalBilliardBalls.forEach(normalBilliardBall =>
                                     normalBilliardBall.ball);
    return balls;
  }

  static createDefault() {
    return new BilliardBalls(Defaults.createCueBall(),
                             Defaults.createNormalBilliardBalls());
  }

}

module.exports = BilliardBalls;
