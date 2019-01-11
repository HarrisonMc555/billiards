'use strict';

const MathUtil = require('../util/math-util');

const TIP_RADIUS = 5;
const END_RADIUS = 10;

const TIP_LENGTH = 5;
const FERRULE_LENGTH = 20;
const TOP_HALF_LENGTH = 100;
const BOTTOM_HALF_LENGTH = 100;
const BUMPER_LENGTH = 10;

const TIP_CUM_LENGTH = 0 + TIP_LENGTH;
const FERRULE_CUM_LENGTH = TIP_CUM_LENGTH + FERRULE_LENGTH;
const TOP_HALF_CUM_LENGTH = FERRULE_CUM_LENGTH + TOP_HALF_LENGTH;
const BOTTOM_HALF_CUM_LENGTH = TOP_HALF_CUM_LENGTH + BOTTOM_HALF_LENGTH;
const BUMPER_CUM_LENGTH = BOTTOM_HALF_CUM_LENGTH + BUMPER_LENGTH;
const TOTAL_LENGTH = BUMPER_CUM_LENGTH;

const TIP_PRE_LENGTH = 0;
const FERRULE_PRE_LENGTH = TIP_CUM_LENGTH;
const TOP_HALF_PRE_LENGTH = FERRULE_CUM_LENGTH;
const BOTTOM_HALF_PRE_LENGTH = TOP_HALF_CUM_LENGTH;
const BUMPER_PRE_LENGTH = BOTTOM_HALF_CUM_LENGTH;

const TIP_COLOR = 'black';
const FERRULE_COLOR = 'white';
const TOP_HALF_COLOR = 'khaki';
const BOTTOM_HALF_COLOR = 'saddlebrown';
const BUMPER_COLOR = 'black';

/* Exports */
const CueStickPaintUtils = {
  'paintCueStick': paintCueStick,
};

module.exports = CueStickPaintUtils;

function paintCueStick(ctx, cueStick) {
  // console.log('paintCueStick');
  paintTip(ctx, cueStick);
  paintFerrule(ctx, cueStick);
  paintTopHalf(ctx, cueStick);
  paintBottomHalf(ctx, cueStick);
  paintBumper(ctx, cueStick);
}

function paintTip(ctx, cueStick) {
  paintCueStickPortion(ctx, cueStick, TIP_PRE_LENGTH, TIP_CUM_LENGTH,
                       TIP_COLOR);
}

function paintFerrule(ctx, cueStick) {
  paintCueStickPortion(ctx, cueStick, FERRULE_PRE_LENGTH, FERRULE_CUM_LENGTH,
                       FERRULE_COLOR);
}

function paintTopHalf(ctx, cueStick) {
  paintCueStickPortion(ctx, cueStick, TOP_HALF_PRE_LENGTH, TOP_HALF_CUM_LENGTH,
                       TOP_HALF_COLOR);
}

function paintBottomHalf(ctx, cueStick) {
  paintCueStickPortion(ctx, cueStick, BOTTOM_HALF_PRE_LENGTH,
                       BOTTOM_HALF_CUM_LENGTH, BOTTOM_HALF_COLOR);
}

function paintBumper(ctx, cueStick) {
  paintCueStickPortion(ctx, cueStick, BUMPER_PRE_LENGTH, BUMPER_CUM_LENGTH,
                       BUMPER_COLOR);
}

function paintCueStickPortion(ctx, cueStick, startLength, endLength, color) {
  let startCenterX = cueStick.tip.x + startLength*Math.cos(cueStick.angle);
  let startCenterY = cueStick.tip.y + startLength*Math.sin(cueStick.angle);
  let endCenterX = cueStick.tip.x + endLength*Math.cos(cueStick.angle);
  let endCenterY = cueStick.tip.y + endLength*Math.sin(cueStick.angle);

  let rightAngle = MathUtil.rightAngleTo(cueStick.angle);
  let startRadius = TIP_RADIUS +
      (END_RADIUS - TIP_RADIUS) * (startLength / TOTAL_LENGTH);
  let endRadius = TIP_RADIUS +
      (END_RADIUS - TIP_RADIUS) * (endLength / TOTAL_LENGTH);

  let startUpperX = startCenterX - startRadius*Math.cos(rightAngle);
  let startUpperY = startCenterY + startRadius*Math.sin(rightAngle);
  let startLowerX = startCenterX + startRadius*Math.cos(rightAngle);
  let startLowerY = startCenterY - startRadius*Math.sin(rightAngle);
  let endUpperX = endCenterX - endRadius*Math.cos(rightAngle);
  let endUpperY = endCenterY + endRadius*Math.sin(rightAngle);
  let endLowerX = endCenterX + endRadius*Math.cos(rightAngle);
  let endLowerY = endCenterY - endRadius*Math.sin(rightAngle);

  ctx.beginPath();
  ctx.moveTo(startUpperX, startUpperY);
  ctx.lineTo(endUpperX, endUpperY);
  ctx.lineTo(endLowerX, endLowerY);
  ctx.lineTo(startLowerX, startLowerY);
  ctx.lineTo(startUpperX, startUpperY);
  ctx.fillStyle = color;
  ctx.fill();
}
