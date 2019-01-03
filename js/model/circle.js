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
    return distanceSquared < this.getRadiusSquared();
  }

  collidesWithCircle(circle) {
    let combinedRadius = this.radius + circle.radius;
    let combinedRadiusSquared = combinedRadius * combinedRadius;
    return this.center.getDistanceSquaredTo(circle.center) <
      combinedRadiusSquared;
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
