class CueBall {

  constructor(ball) {
    this.ball = ball;
  }

  tick() {
    this.ball.tick();
  }

  get circle() {
    return this.ball.circle;
  }

  get center() {
    return this.circle.center;
  }

  get radius() {
    return this.circle.radius;
  }

}

module.exports = CueBall;
