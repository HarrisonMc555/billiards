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

  distanceTo(point) {
    return this.vectorTo(point).magnitude();
  }

  distanceSquaredTo(point) {
    return this.vectorTo(point).magnitudeSquared();
  }

  angleTo(point) {
    return this.vectorTo(point).angle();
  }

  vectorTo(point) {
    return point._vector.minusVector(this._vector);
  }

  translate(dx, dy) {
    this._vector.addVector(new Vector(dx, dy));
    return this;
  }

  translated(dx, dy) {
    return this.clone().translate(dx, dy);
  }

  move(x, y) {
    this._vector = new Vector(x, y);
    return this;
  }

  distanceToX(x) {
    return Math.abs(this.x - x);
  }

  distanceToXSquared(x) {
    let distance = this.distanceToX(x);
    return distance * distance;
  }

  distanceToY(y) {
    return Math.abs(this.y - y);
  }

  distanceToYSquared(y) {
    let distance = this.distanceToY(y);
    return distance * distance;
  }

  distanceSquaredToAxisAlignedLine(axisAlignedLine) {
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
    return this.distanceSquaredTo(linePoint);
  }

  static origin() {
    return Vector.zero();
  }

}

module.exports = Point;
