'use strict';

const AxisAlignedLine = require('./axis-aligned-line');
const AxisDirection = require('./axis-direction');

class Rectangle {

  constructor(topLeft, width, height) {
    this._topLeft = topLeft;
    this._width = width;
    this._height = height;
  }

  get topLeft() {
    return this._topLeft;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  getTopLeft() {
    return this._topLeft;
  }

  getTopRight() {
    return this._topLeft.translated(this._width, 0);
  }

  getBottomLeft() {
    return this._topLeft.translated(0, this._height);
  }

  getBottomRight() {
    return this._topLeft.translated(this._width, this._height);
  }

  getAxisAlignedLines() {
    let top = new AxisAlignedLine(
      this.getTopLeft(), AxisDirection.RIGHT, this._width);
    let bottom = new AxisAlignedLine(
      this.getBottomLeft(), AxisDirection.RIGHT, this._width);
    let left = new AxisAlignedLine(
      this.getTopLeft(), AxisDirection.DOWN, this._height);
    let right = new AxisAlignedLine(
      this.getTopRight(), AxisDirection.DOWN, this._height);
    console.log([top, bottom, left, right]);
    return [top, bottom, left, right];
  }

}

module.exports = Rectangle;
