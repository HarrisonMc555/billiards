class CueBall {

  constructor(ball) {
    this.ball = ball;
  }

  tick() {
    this.ball.tick();
  }

}

module.exports = CueBall;
