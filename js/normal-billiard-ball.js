class NormalBilliardBall {

  constructor(ball, number) {
    this.ball = ball;
    this.number = number;
  }

  tick() {
    this.ball.tick();
  }

}

module.exports = NormalBilliardBall;
