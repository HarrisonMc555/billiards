class Ball {

  constructor(circle, mass, velocity) {
    this.circle = circle;
    this.mass = mass;
    this.velocity = velocity;
  }

  tick() {
    this.circle.move(this.velocity.x, this.velocity.y);
  }

  get center() {
    return this.circle.center;
  }

  get radius() {
    return this.circle.radius;
  }

}

module.exports = Ball;
