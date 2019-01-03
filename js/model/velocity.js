'use strict';

const MathUtil = require('../util/math-util');

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

  round(roundingFactor) {
    this.x = MathUtil.roundToNearestMultiple(this.x, roundingFactor);
    this.y = MathUtil.roundToNearestMultiple(this.y, roundingFactor);
  }

  stopIfReallySlow(minSpeed) {
    let minSpeedSquared = minSpeed * minSpeed;
    if (this.getMagnitudeSquared() < minSpeedSquared) {
      this.stop();
    }
  }

  stop() {
    this.x = 0;
    this.y = 0;
  }

}

module.exports = Velocity;
