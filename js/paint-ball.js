const Point = require('./point');
const Circle = require('./circle');
const PaintCircle = require('./paint-circle');

const HIGHLIGHT_OFFSET_X_FRACTION = 0.35;
const HIGHLIGHT_OFFSET_Y_FRACTION = -0.35;
const HIGHLIGHT_RADIUS_FRACTION = 0.15;
const COLOR_STOPS = [
  [0.0, 'rgba(255, 255, 255, 0.9)'],
  [0.8, 'rgba(100, 100, 100, 0.1)'],
  [1.0, 'rgba( 50,  50,  50, 0.4)'],
];

function paintBall(ctx, ball) {
  paintBallShadow(ctx, ball);
  // ...
}

function paintBallShadow(ctx, ball) {
  let innerCircleXOffset = ball.radius * HIGHLIGHT_OFFSET_X_FRACTION;
  let innerCircleYOffset = ball.radius * HIGHLIGHT_OFFSET_Y_FRACTION;
  let innerCircleCenter = new Point(ball.center.x + innerCircleXOffset,
                                    ball.center.y + innerCircleYOffset);
  let innerCircleRadius = ball.radius * HIGHLIGHT_RADIUS_FRACTION;
  let innerCircle = new Circle(innerCircleCenter, innerCircleRadius);

  let outerCircle = ball.circle;
  
  let gradient = ctx.createRadialGradient(
    innerCircle.center.x, innerCircle.center.y, innerCircle.radius,
    outerCircle.center.x, outerCircle.center.y, outerCircle.radius);

  COLOR_STOPS.forEach(colorStop => {
    let [position, color] = colorStop;
    gradient.addColorStop(position, color);
  });

  // ctx.fillStyle = gradient;
  paintCircle(ctx, ball.circle, gradient);
}

module.exports = paintBall;
