/* Exports */
const PhysicalBallPaintUtils = {
  'paintHighlights': paintPhysicalBallHighlights,
  'paintShadow': paintPhysicalBallShadow,
};


/* Constants */
const Point = require('../model/point');
const Circle = require('../model/circle');
const PaintCircle = require('./paint-circle');

const HIGHLIGHT_OFFSET_X_FRACTION = 0.4;
const HIGHLIGHT_OFFSET_Y_FRACTION = -0.3;
const HIGHLIGHT_RADIUS_FRACTION = 0.15;
const HIGHLIGHT_COLOR_STOPS = [
  [0.00, 'rgba(255, 255, 255, 0.65)'],
  [0.35, 'rgba(150, 150, 150, 0.4)'],
  [0.70, 'rgba(150, 150, 150, 0.4)'],
  [0.90, 'rgba(100, 100, 100, 0.4)'],
  [1.00, 'rgba( 50,  50,  50, 0.4)'],
];

const SHADOW_OFFSET_X_FRACTION = -0.4;
const SHADOW_OFFSET_Y_FRACTION = 0.3;
const SHADOW_RADIUS_FRACTION = 1.0;
const SHADOW_COLOR_STOPS = [
  [0.5, 'rgba(0, 0, 0, 0.2)'],
  [1.0, 'rgba(0, 0, 0, 0.0)'],
];


/* Functions */
function paintPhysicalBallHighlights(ctx, physicalBall) {
  let innerCircleXOffset = physicalBall.radius * HIGHLIGHT_OFFSET_X_FRACTION;
  let innerCircleYOffset = physicalBall.radius * HIGHLIGHT_OFFSET_Y_FRACTION;
  let innerCircleCenter = new Point(physicalBall.center.x + innerCircleXOffset,
                                    physicalBall.center.y + innerCircleYOffset);
  let innerCircleRadius = physicalBall.radius * HIGHLIGHT_RADIUS_FRACTION;
  let innerCircle = new Circle(innerCircleCenter, innerCircleRadius);

  let outerCircle = physicalBall.circle;
  
  let gradient = ctx.createRadialGradient(
    innerCircle.center.x, innerCircle.center.y, innerCircle.radius,
    outerCircle.center.x, outerCircle.center.y, outerCircle.radius);

  HIGHLIGHT_COLOR_STOPS.forEach(colorStop => {
    let [position, color] = colorStop;
    return gradient.addColorStop(position, color);
  });

  // ctx.fillStyle = gradient;
  paintCircle(ctx, physicalBall.circle, gradient);
}

function paintPhysicalBallShadow(ctx, physicalBall) {
  let shadowXOffset = physicalBall.radius * SHADOW_OFFSET_X_FRACTION;
  let shadowYOffset = physicalBall.radius * SHADOW_OFFSET_Y_FRACTION;
  let shadowCenter = new Point(physicalBall.center.x + shadowXOffset,
                               physicalBall.center.y + shadowYOffset);
  let shadowRadius = physicalBall.radius * SHADOW_RADIUS_FRACTION;
  let circle = new Circle(shadowCenter, shadowRadius);

  let gradient = ctx.createRadialGradient(
    circle.center.x, circle.center.y, circle.radius / 2,
    circle.center.x, circle.center.y, circle.radius);

  SHADOW_COLOR_STOPS.forEach(colorStop => {
    let [position, color] = colorStop;
    return gradient.addColorStop(position, color);
  });

  ctx.fillStyle = 'black';
  paintCircle(ctx, circle, gradient);
}

module.exports = PhysicalBallPaintUtils;
