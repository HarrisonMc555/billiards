paintCircle = require('./paint-circle');
const HOLE_COLOR = 'black';

function paintHole(ctx, hole) {
  paintCircle(ctx, hole.circle, HOLE_COLOR);
}

module.exports = paintHole;
