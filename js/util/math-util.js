/**
 * Computes x mod n
 * x arbitrary integer
 * n natural number
 */
const mod = (x, n) => (x % n + n) % n;

const FULL_CIRCLE = 2 * Math.PI;
const HALF_CIRCLE = Math.PI;
const QUARTER_CIRCLE = Math.PI / 2;

const oppositeAngle = (angle) => mod(angle + HALF_CIRCLE, FULL_CIRCLE);

const rightAngleTo = (angle) => mod(angle + QUARTER_CIRCLE, FULL_CIRCLE);

const atan2positive = (num, den) => mod(Math.atan2(num, den), FULL_CIRCLE);

const roundToNearestMultiple = function(number, factor) {
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

const MathUtil = Object.freeze({
  mod: mod,
  oppositeAngle: oppositeAngle,
  atan2positive: atan2positive,
  roundToNearestMultiple: roundToNearestMultiple,
});

module.exports = MathUtil;
