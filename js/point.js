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

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  create_point_offset_by(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
  }

}

module.exports = Point;
