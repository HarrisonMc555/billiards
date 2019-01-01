const Circle = require('./circle');
paintCircle = require('./paint-circle');

const TABLE_TOP_COLOR = require('./table-top-color');
const HOLE_COLOR = 'black';
const SURROUNDING_AREA_WIDTH_FRACTION = 0.5;
const SURROUNDING_AREA_FACTOR = 1 + SURROUNDING_AREA_WIDTH_FRACTION;

function paintHole(ctx, hole) {
  let circle = hole.circle;
  let surroundingRadius = circle.radius * SURROUNDING_AREA_FACTOR;
  let surroundingCircle = new Circle(circle.center, surroundingRadius);
  paintCircle(ctx, surroundingCircle, TABLE_TOP_COLOR);
  paintCircle(ctx, circle, HOLE_COLOR);
}

module.exports = paintHole;
