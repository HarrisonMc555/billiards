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

  static createDefault() {
    return new Board(Table.createDefault(), BilliardBalls.createDefault());
  }

}

module.exports = Board;
