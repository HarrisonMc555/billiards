'use strict';

const Vector = require('../geometry2d/vector');
const MathUtil = require('../util/math-util');

class Velocity {

  constructor(x, y) {
    this._vector = new Vector(x, y);
  }

  get x() {
    return this._vector.x;
  }

  get y() {
    return this._vector.y;
  }

  getMagnitude() {
    return Math.sqrt(this.getMagnitudeSquared());
  }

  getMagnitudeSquared() {
    return this.x*this.x + this.y*this.y;
  }

  scale(factor) {
    this._vector.scale(factor);
  }

  direction() {
    return MathUtil.atan2positive(this.y, this.x);
  }

  stopIfReallySlow(minSpeed) {
    let minSpeedSquared = minSpeed * minSpeed;
    if (this.getMagnitudeSquared() < minSpeedSquared) {
      this.stop();
    }
  }

  stop() {
    this._vector = Vector.zero();
  }

  negateX() {
    this._vector.negateX();
  }

  negateY() {
    this._vector.negateY();
  }

}

module.exports = Velocity;
