'use strict';

/* Why isn't this working??!! */
// const Defaults = require('./defaults');
// const COLLISION_LEEWAY = 0.01;
const COLLISION_LEEWAY = 0.00;

class Circle {

  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  move(dx, dy) {
    this.center.move(dx, dy);
  }

  collidesWithAxisAlignedLine(axisAlignedLine) {
    // Assume that we can't go past the walls, so we must be within the
    // dimensions of the wall.
    let distanceSquared =
        this.center.getDistanceSquaredToAxisAlignedLine(axisAlignedLine);
    let collides = distanceSquared <
        this.getRadiusSquared() + COLLISION_LEEWAY;
    if (collides) {
      return true;
    } else {
      return false;
    }
    // return distanceSquared <
    //   // this.getRadiusSquared() + Defaults.getCollisionLeeway();
    //   this.getRadiusSquared() + COLLISION_LEEWAY;
  }

  collidesWithCircle(circle) {
    let combinedRadius = this.radius + circle.radius;
    let combinedRadiusSquared = combinedRadius * combinedRadius;
    return this.center.getDistanceSquaredTo(circle.center) <
      // combinedRadiusSquared + Defaults.getCollisionLeeway();
      combinedRadiusSquared + COLLISION_LEEWAY;
  }

  getRadiusSquared() {
    return this.radius * this.radius;
  }

  clone() {
    let center = this.center.clone();
    let circle = new Circle(center, this.radius);
    return circle;
  }

}

module.exports = Circle;
