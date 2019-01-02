class CueBall {

  constructor(physicalBall) {
    this.physicalBall = physicalBall;
  }

  get circle() {
    return this.physicalBall.circle;
  }

  get center() {
    return this.circle.center;
  }

  get radius() {
    return this.circle.radius;
  }

}

module.exports = CueBall;
