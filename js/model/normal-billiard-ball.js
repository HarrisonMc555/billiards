'use strict';

class NormalBilliardBall {

  constructor(ball, number) {
    this._ball = ball;
    this._number = number;
  }

  get ball() {
    return this._ball;
  }

  get number() {
    return this._number;
  }

  get circle() {
    return this.ball.circle;
  }

  get center() {
    return this.circle.center;
  }

  get radius() {
    return this.circle.radius;
  }

}

module.exports = NormalBilliardBall;
