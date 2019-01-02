const Defaults = require('./defaults');

class BilliardBalls {

  constructor(cueBall, normalBilliardBalls) {
    this.cueBall = cueBall;
    this.normalBilliardBalls = normalBilliardBalls;
  }

  getAllPhysicalBalls() {
    let balls = [];
    balls.push(this.cueBall.physicalBall);
    this.normalBilliardBalls.forEach(normalBilliardBall =>
                                     normalBilliardBall.physicalBall);
    return balls;
  }

  static createDefault() {
    return new BilliardBalls(Defaults.createCueBall(),
                             Defaults.createNormalBilliardBalls());
  }

}

module.exports = BilliardBalls;
