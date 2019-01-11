'use strict';

const paintCircle = require('./paint-circle');
const Circle = require('../geometry2d/circle');

/* Utils */
const BilliardBallsPaintUtils = {
  'paintCueBall': paintCueBall,
  'paintNormalBilliardBall': paintNormalBilliardBall,
};

/* Cue Ball */
const CUE_BALL_COLOR = 'white';

function paintCueBall(ctx, cueBall) {
  paintCircle(ctx, cueBall.circle, CUE_BALL_COLOR);
}

/* Normal Billiard Balls */
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
const LINE_WIDTH_AS_FRACTION_OF_RADIUS = 0.55;
const ANGLE_OFFSET = 60 * Math.PI / 180;
const TOP_ANGLE = 270 * Math.PI / 180;
const BOTTOM_ANGLE = 90 * Math.PI / 180;
const TOP_START_ANGLE = TOP_ANGLE - ANGLE_OFFSET;
const TOP_END_ANGLE = TOP_ANGLE + ANGLE_OFFSET;
const BOTTOM_START_ANGLE = BOTTOM_ANGLE - ANGLE_OFFSET;
const BOTTOM_END_ANGLE = BOTTOM_ANGLE + ANGLE_OFFSET;
const ANTICLOCKWISE = false;

const NUMBER_CIRCLE_RADIUS_FRACTION = 0.3;
const NUMBER_CIRCLE_COLOR = 'white';
const NUMBER_CIRCLE_TEXT_FONT = '9px sans-serif';
const NUMBER_CIRCLE_TEXT_COLOR = 'black';

function paintNormalBilliardBall(ctx, normalBilliardBall) {
  if (isSolidBilliardBall(normalBilliardBall)) {
    paintSolidBilliardBall(ctx, normalBilliardBall);
  } else {
    paintStripedBilliardBall(ctx, normalBilliardBall);
  }
  paintNumberCircle(ctx, normalBilliardBall);
}

function isSolidBilliardBall(normalBilliardBall) {
  return normalBilliardBall.number <= MAX_SOLID_NUMBER;
}

function paintSolidBilliardBall(ctx, normalBilliardBall) {
  let color = NUMBER_TO_COLOR_MAP[normalBilliardBall.number];
  paintCircle(ctx, normalBilliardBall.circle, color);
}

function paintStripedBilliardBall(ctx, normalBilliardBall) {
  let stripeColor = NUMBER_TO_COLOR_MAP[normalBilliardBall.number];
  paintCircle(ctx, normalBilliardBall.circle, stripeColor);
  paintBilliardBallOutsideStripe(ctx, normalBilliardBall.circle);
}

function paintBilliardBallOutsideStripe(ctx, circle) {
  ctx.beginPath();
  ctx.arc(circle.center.x, circle.center.y, circle.radius, TOP_START_ANGLE,
          TOP_END_ANGLE, ANTICLOCKWISE);
  ctx.fillStyle = STRIPED_BALL_BACKGROUND_COLOR;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(circle.center.x, circle.center.y, circle.radius, BOTTOM_START_ANGLE,
          BOTTOM_END_ANGLE, ANTICLOCKWISE);
  ctx.fillStyle = STRIPED_BALL_BACKGROUND_COLOR;
  ctx.fill();
}

function paintBilliardBallStripe(ctx, circle, color) {
  let lineWidth = 2 * (circle.radius * LINE_WIDTH_AS_FRACTION_OF_RADIUS);
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

function paintNumberCircle(ctx, normalBilliardBall) {
  let radius = normalBilliardBall.radius * NUMBER_CIRCLE_RADIUS_FRACTION;
  let numberCircle = new Circle(normalBilliardBall.center, radius);
  paintCircle(ctx, numberCircle, NUMBER_CIRCLE_COLOR);

  let numberString = '' + normalBilliardBall.number;
  ctx.font = NUMBER_CIRCLE_TEXT_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = NUMBER_CIRCLE_TEXT_COLOR;

  /* Try transforming text... */
  /* This works! */
  // ctx.translate(normalBilliardBall.center.x, normalBilliardBall.center.y);
  // ctx.scale(1, 0.5);
  // ctx.translate(-normalBilliardBall.center.x, -normalBilliardBall.center.y);
  // ctx.translate(0, normalBilliardBall.radius / 2);

  /* Hack since text isn't exactly centered */
  let x = normalBilliardBall.center.x;
  let y = normalBilliardBall.center.y + radius*0.1;

  ctx.fillText(numberString, x, y);

  // ctx.resetTransform();
}

module.exports = BilliardBallsPaintUtils;
