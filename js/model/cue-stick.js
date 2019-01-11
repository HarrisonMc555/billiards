'use strict';

class CueStick {

  constructor(tip, angle, length) {
    this._tip = tip;
    this._angle = angle;
    this._length = length;
  }

  get tip() {
    return this._tip;
  }

  get angle() {
    return this._angle;
  }

  get length() {
    return this._length;
  }

}

module.exports = CueStick;
