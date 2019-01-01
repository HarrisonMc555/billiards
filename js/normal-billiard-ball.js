class NormalBilliardBall {

  constructor(ball, number) {
    this.ball = ball;
    this.number = number;
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

module.exports = NormalBilliardBall;
