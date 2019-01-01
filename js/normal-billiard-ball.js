class NormalBilliardBall {

  constructor(ball, number) {
    this.ball = ball;
    this.number = number;
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
