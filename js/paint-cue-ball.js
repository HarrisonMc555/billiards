const paintCircle = require('./paint-circle');
const CUE_BALL_COLOR = 'white';

function paintCueBall(ctx, cueBall) {
  paintCircle(ctx, cueBall.circle, CUE_BALL_COLOR);
}

module.exports = paintCueBall;
