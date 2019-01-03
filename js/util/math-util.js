'use strict';

const MathUtil = Object.freeze({
  mod: mod,
  oppositeAngle: oppositeAngle,
  rightAngleTo: rightAngleTo,
  atan2positive: atan2positive,
  roundToNearestMultiple: roundToNearestMultiple,
});

module.exports = MathUtil;

const FULL_CIRCLE = 2 * Math.PI;
const HALF_CIRCLE = Math.PI;
const QUARTER_CIRCLE = Math.PI / 2;

function oppositeAngle(angle) {
  return mod(angle + HALF_CIRCLE, FULL_CIRCLE);
}

function rightAngleTo(angle) {
  return mod(angle + QUARTER_CIRCLE, FULL_CIRCLE);
}

function atan2positive(num, den) {
  return mod(Math.atan2(num, den), FULL_CIRCLE);
}

/**
 * Computes x mod n
 * x arbitrary integer
 * n natural number
 */
function mod(x, n) {
  return (x % n + n) % n;
}

function roundToNearestMultiple(number, factor) {
  if (factor === 0) {
    return number;
  }
  let divided = number / factor;
  let minMultiples = Math.floor(divided);
  let remainderFraction = divided - minMultiples;
  if (remainderFraction < 0.5) {
    return factor * minMultiples;
  } else {
    return factor * (minMultiples + 1);
  }
};
