const paintCircle = require('./paint-circle');
const MAX_SOLID_NUMBER;
const STRIPED_BALL_BACKGROUND_COLOR = 'white';
const NUMBER_TO_COLOR_MAP = {
  1: 'yellow',
  2: 'blue',
  3: 'red',
  4: 'pink',
  5: 'orange',
  6: 'green',
  7: 'tan',
  8: 'black',
  9: 'yellow',
  10: 'blue',
  11: 'red',
  12: 'pink',
  13: 'orange',
  14: 'green',
  15: 'tan',
  16: 'black',
};
const lineWidthAsFractionOfRadius = 0.5;

function paintNormalBilliardBall(ctx, ball) {
  if (isSolidBilliardBall(ball)) {
    paintSolidBilliardBall(ctx, ball);
  } else {
    paintStripedBilliardBall(ctx, ball);
  }
}

function isSolidBilliardBall(ctx, ball) {
  return ball.number <= 8;
}

function paintSolidBilliardBall(ctx, ball) {
  let color = NUMBER_TO_COLOR_MAP[ball.number];
  paintCircle(ctx, ball.circle, color);
}

function paintStripedBilliardBall(ctx, ball) {
  paintCircle(ctx, ball.circle, STRIPED_BALL_BACKGROUND_COLOR);
  let stripeColor = NUMBER_TO_COLOR_MAP[ball.number];
  paintBilliardBallStripe(ctx, ball.circle, stripeColor);
}

function paintBilliardBallStripe(ctx, circle, color) {
  let lineRadius = circle.radius * lineWidthAsFractionOfRadius;
  let distanceFromCenter = circle.radius - lineRadius;
  /* Horizontal stripe */
  ctx.beginPath();
  ctx.strokeStyle(color);
  ctx.moveTo(circle.center.x - distanceFromCenter,
             circle.center.y);
  ctx.lineTo(circle.center.x + distanceFromCenter,
             circle.center.y);
  ctx.stroke();
}

module.exports = paintNormalBilliardBall;
