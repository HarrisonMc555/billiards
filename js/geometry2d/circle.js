'use strict';

class Circle {

  constructor(center, radius) {
    this._center = center;
    this._radius = radius;
  }

  get center() {
    return this._center;
  }

  get radius() {
    return this._radius;
  }

  clone() {
    let center = this._center.clone();
    return new Circle(center, this._radius);
  }

  move(dx, dy) {
    this._center.move(dx, dy);
  }

  moveTo(x, y) {
    this._center.moveTo(x, y);
  }

  collidesWithAxisAlignedLine(axisAlignedLine) {
    // Assume that we can't go past the walls, so we must be within the
    // dimensions of the wall.
    let distanceSquared =
        this._center.getDistanceSquaredToAxisAlignedLine(axisAlignedLine);
    let collides = distanceSquared < this.getRadiusSquared();
    if (collides) {
      return true;
    } else {
      return false;
    }
  }

  collidesWithCircle(circle) {
    let combinedRadius = this._radius + circle._radius;
    let combinedRadiusSquared = combinedRadius * combinedRadius;
    return this._center.getDistanceSquaredTo(circle._center) <
      combinedRadiusSquared;
  }

  getRadiusSquared() {
    return this._radius * this._radius;
  }

}

module.exports = Circle;
