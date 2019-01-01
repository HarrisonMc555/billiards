const Defaults = require('./defaults');

class Table {

  constructor(bounds, holes) {
    this.bounds = bounds;
    this.holes = holes;
  }

  static createDefault() {
    return new Table(Defaults.tableBounds, Defaults.holes);
  }

}

module.exports = Table;
