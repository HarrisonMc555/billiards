'use strict';

const Defaults = require('./defaults');
const AxisAlignedLine = require('../geometry2d/axis-aligned-line');
const AxisDirection = require('../geometry2d/axis-direction');

class Table {

  constructor(bounds, holes) {
    this._bounds = bounds;
    this._holes = holes;
  }

  get bounds() {
    return this._bounds;
  }

  get holes() {
    return this._holes;
  }

  walls() {
    return this.bounds.getAxisAlignedLines();
  }

  static createDefault() {
    return new Table(Defaults.createTableBounds(), Defaults.createHoles());
  }

}

module.exports = Table;
