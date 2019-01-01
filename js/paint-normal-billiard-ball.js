const paintCircle = require('./paint-circle');

const MAX_SOLID_NUMBER = 8;
const STRIPED_BALL_BACKGROUND_COLOR = 'white';
const LINE_CAP_STYLE = 'round';
const NUMBER_TO_COLOR_MAP = Object.freeze({
  1: 'yellow',
  2: 'blue',
  3: 'red',
  4: 'pink',
  5: 'orange',
  6: 'lime',
  7: 'tan',
  8: 'black',
  9: 'yellow',
  10: 'blue',
  11: 'red',
  12: 'pink',
  13: 'orange',
  14: 'lime',
  15: 'tan',
});
const lineWidthAsFractionOfRadius = 0.55;

function paintNormalBilliardBall(ctx, normalBilliardBall) {
  if (isSolidBilliardBall(normalBilliardBall)) {
    paintSolidBilliardBall(ctx, normalBilliardBall);
  } else {
    paintStripedBilliardBall(ctx, normalBilliardBall);
  }
}

function isSolidBilliardBall(normalBilliardBall) {
  return normalBilliardBall.number <= MAX_SOLID_NUMBER;
}

function paintSolidBilliardBall(ctx, normalBilliardBall) {
  let color = NUMBER_TO_COLOR_MAP[normalBilliardBall.number];
  paintCircle(ctx, normalBilliardBall.ball.circle, color);
}

function paintStripedBilliardBall(ctx, normalBilliardBall) {
  paintCircle(ctx, normalBilliardBall.ball.circle,
              STRIPED_BALL_BACKGROUND_COLOR);
  let stripeColor = NUMBER_TO_COLOR_MAP[normalBilliardBall.number];
  paintBilliardBallStripe(ctx, normalBilliardBall.ball.circle, stripeColor);
}

function paintBilliardBallStripe(ctx, circle, color) {
  let lineWidth = 2 * (circle.radius * lineWidthAsFractionOfRadius);
  let distanceFromCenter = circle.radius - (lineWidth / 2);
  /* Horizontal stripe */
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(circle.center.x - distanceFromCenter,
             circle.center.y);
  ctx.lineTo(circle.center.x + distanceFromCenter,
             circle.center.y);
  ctx.stroke();
}

module.exports = paintNormalBilliardBall;
