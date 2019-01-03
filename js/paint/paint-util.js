const MathUtil = require('../util/math-util');

const PaintUtil = Object.freeze({
  paintArrow: paintArrow,
  paintVelocity: paintVelocity,
});

module.exports = PaintUtil;

// const ARROW_LINE_WIDTH_AS_FRACTION_OF_LENGTH = 0.05;
const ARROW_LINE_WIDTH = 5;
const ARROW_HEAD_WIDTH = 10;
function paintArrow(ctx, start, end) {
  dx = end.x - start.x;
  dy = end.y - start.y;
  length = start.getDistanceTo(end);
  // width = length * ARROW_LINE_WIDTH_AS_FRACTION_OF_LENGTH;
  width = ARROW_LINE_WIDTH;

  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  ctx.lineCap = 'butt';

  /* Draw line */
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  /* Draw head */
  let lineTheta = math.atan2(dy, dx);
  let headTheta1 = MathUtil.rightAngleTo(lineTheta);
  let headTheta2 = MathUtil.oppositeAngle(headTheta1);
  let headCrossX = end.x - ARROW_HEAD_WIDTH*Math.cos(lineTheta);
  let headCrossY = end.y - ARROW_HEAD_WIDTH*Math.sin(lineTheta);
  let headPoint1X = headCrossX - ARROW_HEAD_WIDTH/2*Math.cos(headTheta1);
  let headPoint1Y = headCrossY - ARROW_HEAD_WIDTH/2*Math.sin(headTheta1);
  let headPoint2X = headCrossX - ARROW_HEAD_WIDTH/2*Math.cos(headTheta2);
  let headPoint2Y = headCrossY - ARROW_HEAD_WIDTH/2*Math.sin(headTheta2);

  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(headPoint1X, headPoint1Y);
  ctx.lineTo(headPoint2X, headPoint2Y);
  ctx.fill();
}

function paintVelocity(ctx, physicalBall) {
  let start = physicalBall.center;
  let velocity = physicalBall.velocity;
  let end = start.createPointOffsetBy(velocity.x, velocity.y);
  paintArrow(ctx, start, end);
}
