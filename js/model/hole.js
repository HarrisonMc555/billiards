'use strict';

const Point = require('../geometry2d/point');
const Circle = require('../geometry2d/circle');
const Defaults = require('./defaults');

class Hole {

  constructor(circle, holeDirection) {
    this.circle = circle;
    this.holeDirection = holeDirection;
  }

}

module.exports = Hole;
