'use strict';

class CueBall {

  constructor(physicalBall) {
    this._physicalBall = physicalBall;
  }

  get physicalBall() {
    return this._physicalBall;
  }

  get circle() {
    return this.physicalBall.circle;
  }

  get center() {
    return this.circle.center;
  }

  get radius() {
    return this.circle.radius;
  }

}

module.exports = CueBall;
