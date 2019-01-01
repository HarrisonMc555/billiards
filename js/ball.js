class Ball {

  constructor(circle, mass, velocity) {
    this.circle = circle;
    this.mass = mass;
    this.velocity = velocity;
  }

  tick() {
    this.circle.move(this.velocity.x, this.velocity.y);
  }

}

module.exports = Ball;
