'use strict';

const paintTableTop = require('./paint-table-top');
const paintHole = require('./paint-hole');

class TablePainter {

  constructor(tableTopPaintFunction, holePaintFunction) {
    this.tableTopPaintFunction = tableTopPaintFunction;
    this.holePaintFunction = holePaintFunction;
  }

  paintTable(ctx, table) {
    this.tableTopPaintFunction(ctx, table.bounds);
    table.holes.forEach(
      hole => this.holePaintFunction(ctx, hole));
  }

  static createDefault() {
    return new TablePainter(paintTableTop, paintHole);
  }

}

module.exports = TablePainter;
