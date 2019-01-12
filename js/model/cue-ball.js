'use strict';

class CueBall {

  constructor(ball) {
    this._ball = ball;
  }

  get ball() {
    return this._ball;
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

module.exports = CueBall;
