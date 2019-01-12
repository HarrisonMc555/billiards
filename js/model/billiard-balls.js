'use strict';

const Defaults = require('./defaults');

class BilliardBalls {

  constructor(cueBall, normalBilliardBalls) {
    this._cueBall = cueBall;
    this._normalBilliardBalls = normalBilliardBalls;
  }

  get cueBall() {
    return this._cueBall;
  }

  get normalBilliardBalls() {
    return this._normalBilliardBalls;
  }

  getAllBalls() {
    let balls = [];
    balls.push(this.cueBall.ball);
    this.normalBilliardBalls.forEach(
      normalBilliardBall => balls.push(normalBilliardBall.ball));
    return balls;
  }

  static createDefault() {
    return new BilliardBalls(Defaults.createCueBall(),
                             Defaults.createNormalBilliardBalls());
  }

}

module.exports = BilliardBalls;
