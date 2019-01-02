Table = require('./table');
BilliardBalls = require('./billiard-balls');

class Board {

  constructor(table, billiardBalls) {
    this.table = table;
    this.billiardBalls = billiardBalls;
  }

  getAllPhysicalBalls() {
    return this.billiardBalls.getAllPhysicalBalls();
  }

  tick() {
    this.moveAllPhysicalBalls();
  }

  moveAllPhysicalBalls() {
    this.billiardBalls.getAllPhysicalBalls().forEach(
      (physicalBall, index, array) => {
      let otherBalls = array.slice(index + 1);
      this.moveBall(physicalBall, otherBalls);
    });
  }

  moveBall(physicalBall, otherBalls) {
    // TODO
  }

  static createDefault() {
    return new Board(Table.createDefault(), BilliardBalls.createDefault());
  }

}

module.exports = Board;
