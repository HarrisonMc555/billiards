paintTableTop = require('./paint-table-top');
paintHole = require('./paint-hole');

class TablePainter {

  constructor(tableTopPaintFunction, holePaintFunction) {
    this.tableTopPaintFunction = tableTopPaintFunction;
    this.holePaintFunction = holePaintFunction;
  }

  paintTable(ctx, table) {
    this.tableTopPaintFunction(ctx, table.bounds);
    table.holes.forEach(hole => {
      console.log(hole);
      this.holePaintFunction(ctx, hole);
    });
  }

  static createDefault() {
    return new TablePainter(paintTableTop, paintHole);
  }

}

module.exports = TablePainter;
