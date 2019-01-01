Table = require('./table');
BilliardBalls = require('./billiard-balls');

class Board {

  constructor(table, balls) {
    this.table = table;
    this.balls = balls;
  }

  getAllBalls() {
    return this.balls.getAllBalls();
  }

  tick() {
    this.getAllBalls().forEach(ball => ball.tick());
  }

  static createDefault() {
    return new Board(Table.createDefault(), BilliardBalls.createDefault());
  }

}

module.exports = Board;
