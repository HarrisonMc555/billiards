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
    return this.vectorTo(point).magnitude();
  }

  getDistanceSquaredTo(point) {
    return this.vectorTo(point).magnitudeSquared();
  }

  angleTo(point) {
    return this.vectorTo(point).angle();
  }

  vectorTo(point) {
    return point._vector.minusVector(this._vector);
  }

  move(dx, dy) {
    this._vector.addVector(new Vector(dx, dy));
  }

  moveTo(x, y) {
    this._vector = new Vector(x, y);
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

  createPointOffsetBy(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
  }

  static origin() {
    return Vector.zero();
  }

}

module.exports = Point;
