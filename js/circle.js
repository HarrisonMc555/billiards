class Circle {

  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  move(dx, dy) {
    this.center.move(dx, dy);
  }

}

module.exports = Circle;
