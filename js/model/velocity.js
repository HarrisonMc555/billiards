MathUtil = require('../util/math-util');

class Velocity {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getMagnitude() {
    return Math.sqrt(this.getMagnitudeSquared());
  }

  getMagnitudeSquared() {
    return this.x*this.x + this.y*this.y;
  }

  scale(factor) {
    let direction = this.direction();
    let magnitude = this.getMagnitude();
    let scaledMagnitude = magnitude * factor;
    this.x = scaledMagnitude * Math.cos(direction);
    this.y = scaledMagnitude * Math.sin(direction);
  }

  direction() {
    return MathUtil.atan2positive(this.y, this.x);
  }

}

module.exports = Velocity;
