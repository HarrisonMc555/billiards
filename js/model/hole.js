const Point = require('./point');
const Circle = require('./circle');
const Defaults = require('./defaults');

class Hole {

  constructor(circle, holeDirection) {
    this.circle = circle;
    this.holeDirection = holeDirection;
  }

}

module.exports = Hole;
