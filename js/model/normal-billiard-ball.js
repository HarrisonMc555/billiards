'use strict';

class NormalBilliardBall {

  constructor(physicalBall, number) {
    this._physicalBall = physicalBall;
    this._number = number;
  }

  get physicalBall() {
    return this._physicalBall;
  }

  get number() {
    return this._number;
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

module.exports = NormalBilliardBall;
