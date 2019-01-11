'use strict';

class AxisAlignedLine {

  constructor(corner, direction, length) {
    this._corner = corner;
    this._direction = direction;
    this._length = length;
  }

  get corner() {
    return this._corner;
  }

  get direction() {
    return this._direction;
  }

  get length() {
    return this._length;
  }

}

module.exports = AxisAlignedLine;
