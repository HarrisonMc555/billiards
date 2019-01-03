'use strict';

const AxisAlignedLine = require('./axis-aligned-line');
const AxisDirection = require('./axis-direction');

class Rectangle {

  constructor(topLeft, width, height) {
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
  }

  getTopLeft() {
    return this.topLeft;
  }

  getTopRight() {
    return this.topLeft.createPointOffsetBy(this.width, 0);
  }

  getBottomLeft() {
    return this.topLeft.createPointOffsetBy(0, this.height);
  }

  getBottomRight() {
    return this.topLeft.createPointOffsetBy(this.width, this.height);
  }

  getAxisAlignedLines() {
    let top = new AxisAlignedLine(
      this.getTopLeft(), AxisDirection.RIGHT, this.width);
    let bottom = new AxisAlignedLine(
      this.getBottomLeft(), AxisDirection.RIGHT, this.width);
    let left = new AxisAlignedLine(
      this.getTopLeft(), AxisDirection.DOWN, this.height);
    let right = new AxisAlignedLine(
      this.getTopRight(), AxisDirection.DOWN, this.height);
    return [top, bottom, left, right];
  }

}

module.exports = Rectangle;
