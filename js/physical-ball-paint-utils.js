/* Exports */
const PhysicalBallPaintUtils = {
  'paintHighlights': paintPhysicalBallHighlights,
  'paintShadow': paintPhysicalBallShadow,
};


/* Constants */
const Point = require('./point');
const Circle = require('./circle');
const PaintCircle = require('./paint-circle');

const HIGHLIGHT_OFFSET_X_FRACTION = 0.4;
const HIGHLIGHT_OFFSET_Y_FRACTION = -0.4;
const HIGHLIGHT_RADIUS_FRACTION = 0.15;
const COLOR_STOPS = [
  [0.0, 'rgba(255, 255, 255, 0.7)'],
  [0.8, 'rgba(100, 100, 100, 0.1)'],
  [1.0, 'rgba( 50,  50,  50, 0.4)'],
];

const SHADOW_OFFSET_X_FRACTION = 0.2;
const SHADOW_OFFSET_Y_FRACTION = 0.2;
const SHADOW_RADIUS_FRACTION = 0.15;
const SHADOW_COLOR = 'rgba(0, 0, 0.5)';


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

  COLOR_STOPS.forEach(colorStop => {
    let [position, color] = colorStop;
    gradient.addColorStop(position, color);
  });

  // ctx.fillStyle = gradient;
  paintCircle(ctx, physicalBall.circle, gradient);
}

function paintPhysicalBallShadow(ctx, physicalBall) {
  let shadowXOffset = physicalBall.radius * HIGHLIGHT_OFFSET_X_FRACTION;
  let shadowYOffset = physicalBall.radius * HIGHLIGHT_OFFSET_Y_FRACTION;
  let shadowCenter = new Point(physicalBall.center.x + shadowXOffset,
                                    physicalBall.center.y + shadowYOffset);
  let shadowRadius = physicalBall.radius * HIGHLIGHT_RADIUS_FRACTION;
  let circle = new Circle(shadowCenter, shadowRadius);

  paintCircle(ctx, circle, SHADOW_COLOR);
}

module.exports = PhysicalBallPaintUtils;
