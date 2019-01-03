'use strict';

const Defaults = require('./defaults');
const AxisAlignedLine = require('./axis-aligned-line');
const AxisDirection = require('./axis-direction');

class Table {

  constructor(bounds, holes) {
    this.bounds = bounds;
    this.holes = holes;
  }

  getWalls() {
    return this.bounds.getAxisAlignedLines();
  }

  static createDefault() {
    return new Table(Defaults.createTableBounds(), Defaults.createHoles());
  }

}

module.exports = Table;
