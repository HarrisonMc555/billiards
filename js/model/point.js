const AxisDirection = require('./axis-direction');
const MathUtil = require('../util/math-util');

class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistanceTo(point) {
    return Math.sqrt(this.getDistanceSquaredTo(point));
  }

  getDistanceSquaredTo(point) {
    let x2 = point.x;
    let y2 = point.y;
    let dx = Math.abs(x2 - this.x);
    let dy = Math.abs(y2 - this.y);
    let xsquared = dx * dx;
    let ysquared = dy * dy;
    return xsquared + ysquared;
  }

  getDistanceSquaredToAxisAlignedLine(axisAlignedLine) {
    // Assume that we can't go past the walls, so we must be within the
    // dimensions of the wall.
    let linePoint;
    if (axisAlignedLine.direction === AxisDirection.RIGHT) {
      linePoint = new Point(this.x, axisAlignedLine.corner.y);
    } else if (axisAlignedLine.direction === AxisDirection.DOWN){
      linePoint = new Point(axisAlignedLine.corner.x, this.y);
    } else {
      throw 'Invalid axis direction';
    }
    return this.getDistanceSquaredTo(linePoint);
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  createPointOffsetBy(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
  }

  angleTo(point) {
    let dx = point.x - this.x;
    let dy = point.y - this.y;
    return MathUtil.atan2positive(dy, dx);
  }

  round(roundingFactor) {
    this.x = MathUtil.roundToNearestMultiple(this.x, roundingFactor);
    this.y = MathUtil.roundToNearestMultiple(this.y, roundingFactor);
  }

}

module.exports = Point;
