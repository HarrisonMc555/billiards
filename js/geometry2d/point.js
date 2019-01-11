'use strict';

const Vector = require('./vector');
const AxisDirection = require('./axis-direction');
const MathUtil = require('../util/math-util');

class Point {

  constructor(x, y) {
    this._vector = new Vector(x, y);
  }

  get x() {
    return this._vector.x;
  }

  get y() {
    return this._vector.y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  getDistanceTo(point) {
    return Math.sqrt(this.getDistanceSquaredTo(point));
  }

  getDistanceSquaredTo(point) {
    let x2 = point.x;
    let y2 = point.y;
    let dx = Math.abs(x2 - this.x);
    let dy = Math.abs(y2 - this.y);
    let xsquared = dx * dx;
    let ysquared = dy * dy;
    return xsquared + ysquared;
  }

  getDistanceSquaredToAxisAlignedLine(axisAlignedLine) {
    // Assume that we can't go past the walls, so we must be within the
    // dimensions of the wall.
    let linePoint;
    if (axisAlignedLine.direction === AxisDirection.RIGHT) {
      linePoint = new Point(this.x, axisAlignedLine.corner.y);
    } else if (axisAlignedLine.direction === AxisDirection.DOWN){
      linePoint = new Point(axisAlignedLine.corner.x, this.y);
    } else {
      throw 'Invalid axis direction';
    }
    return this.getDistanceSquaredTo(linePoint);
  }

  vectorTo(point) {
    return point._vector.minusVector(this._vector);
  }

  angleTo(point) {
    return this.vectorTo(point).angle();
  }

  move(dx, dy) {
    this._vector = new Vector(this.x + dx, this.y + dy);
  }

  moveTo(x, y) {
    this._vector = new Vector(x, y);
  }

  createPointOffsetBy(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
  }

  round(roundingFactor) {
    let newX = MathUtil.roundToNearestMultiple(this.x, roundingFactor);
    let newY = MathUtil.roundToNearestMultiple(this.y, roundingFactor);
    this._vector = new Vector(newX, newY);
  }

}

module.exports = Point;
