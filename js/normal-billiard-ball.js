class NormalBilliardBall {

  constructor(physicalBall, number) {
    this.physicalBall = physicalBall;
    this.number = number;
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

module.exports = NormalBilliardBall;
