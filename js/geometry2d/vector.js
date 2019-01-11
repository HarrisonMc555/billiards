'use strict';

const MathUtil = require('../util/math-util');

class Vector {

  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  clone() {
    return new Vector(this._x, this._y);
  }

  getMagnitude() {
    return Math.sqrt(this.getMagnitudeSquared());
  }

  getMagnitudeSquared() {
    return this._x*this._x + this._y*this._y;
  }

  getAngle() {
    return MathUtil.atan2positive(this._y, this._x);
  }

  getDirection() {
    return this.getAngle();
  }

  addVector(vector) {
    this._x += vector._x;
    this._y += vector._y;
    return this;
  }

  plusVector(vector) {
    return this.clone().addVector(vector);
  }

  subtractVector(vector) {
    this._x -= vector._x;
    this._y -= vector._y;
    return this;
  }

  minusVector(vector) {
    return this.clone().subtractVector(vector);
  }

  negate() {
    this._x *= -1;
    this._y *= -1;
    return this;
  }

  negated() {
    return this.clone().negate();
  }

  scale(scalarFactor) {
    this._x *= scalarFactor;
    this._y *= scalarFactor;
    return this;
  }

  scaled(scalarFactor) {
    return this.clone().scale(scalarFactor);
  }

  getUnitVector() {
    let magnitude = this.getMagnitude();
    return new Vector(this._x / magnitude, this._y / magnitude);
  }

  static dotProduct(vector1, vector2) {
    return vector1._x*vector2._x + vector1._y*vector2._y;
  }

  dottedInto(vector) {
    let unitVector = vector.getUnitVector();
    let magnitude = Vector.dotProduct(this, unitVector);
    return unitVector.scale(magnitude);
  }

}

module.exports = Vector;
