'use strict';

const Defaults = require('./defaults');
const AxisAlignedLine = require('../geometry2d/axis-aligned-line');
const AxisDirection = require('../geometry2d/axis-direction');

class Table {

  constructor(bounds, holes) {
    this.bounds = bounds;
    this.holes = holes;
  }

  walls() {
    return this.bounds.getAxisAlignedLines();
  }

  static createDefault() {
    return new Table(Defaults.createTableBounds(), Defaults.createHoles());
  }

}

module.exports = Table;
