paintWall = require('./paint-wall');
paintHole = require('./paint-hole');

class TablePainter {

  constructor(wallPainter, holePainter) {
    this.wallPainter = wallPainter;
    this.holePainter = holePainter;
  }

  paintTable(ctx, table) {
    table.walls.forEach(wall => {
      this.wallPainter.paint(wall);
    });
    table.holes.forEach(hole => {
      this.holePainter.paint(hole);
    });
  }

  createDefault() {
    return TablePainter(paintWall, paintHole);
  }

}

module.exports = TablePainter;
