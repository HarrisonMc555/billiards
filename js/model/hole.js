'use strict';

const Point = require('../geometry2d/point');
const Circle = require('../geometry2d/circle');
const Defaults = require('./defaults');

class Hole {

  constructor(circle, holeDirection) {
    this._circle = circle;
    this._holeDirection = holeDirection;
  }

  get circle() {
    return this._circle;
  }

  get holeDirection() {
    return this._holeDirection;
  }

}

module.exports = Hole;
