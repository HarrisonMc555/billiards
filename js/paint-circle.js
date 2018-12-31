const FULL_CIRCLE_RADIANS = 2 * Math.PI;
const START_ANGLE = 0;
const END_ANGLE = FULL_CIRCLE_RADIANS;
const ANTICLOCKWISE = false;

function paintCircle(ctx, circle, color) {
  ctx.beginPath();
  ctx.arc(circle.center.x, circle.center.y, circle.radius,
          START_ANGLE, END_ANGLE, ANTICLOCKWISE);
  ctx.fillStyle = color;
  ctx.fill();
}

module.exports = paintCircle;
