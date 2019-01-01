const Point = require('./point');
const Circle = require('./circle');
const Rectangle = require('./rectangle');
const Hole = require('./hole');
const HoleDirection = require('./hole-direction');
const Velocity = require('./velocity');
const Ball = require('./ball');
const CueBall = require('./cue-ball');
const NormalBilliardBall = require('./normal-billiard-ball');

/* Table Top */
const TABLE_TOP_LEFT_X = 0;
const TABLE_TOP_LEFT_Y = 0;
const TABLE_WIDTH = 1000;
const TABLE_HEIGHT = 500;

/* Balls */
const BALL_RADIUS = 20;
const BALL_MASS = 1;
const BALL_VELOCITY_X = 0;
const BALL_VELOCITY_Y = 0;

/* Cue Ball */
const CUE_BALL_X = TABLE_WIDTH / 4;
const CUE_BALL_Y = TABLE_HEIGHT / 2;
const CUE_BALL_RADIUS = BALL_RADIUS;
const CUE_BALL_MASS = BALL_MASS;
const CUE_BALL_VELOCITY_X = BALL_VELOCITY_X;
const CUE_BALL_VELOCITY_Y = BALL_VELOCITY_Y;

/* Normal Billiard Balls */
const DEGREES_OFFSET_IN_FORMATION = 30;
const RADIUS_TO_X_OFFSET_IN_FORMATION_FACTOR = Math.sqrt(3);
const X_OFFSET = BALL_RADIUS * RADIUS_TO_X_OFFSET_IN_FORMATION_FACTOR;
const Y_OFFSET = BALL_RADIUS;
const RACK_X = TABLE_WIDTH * 3 / 4;
const RACK_Y = TABLE_HEIGHT / 2;

const NORMAL_BILLIARD_BALL_RADIUS = BALL_RADIUS;
const NORMAL_BILLIARD_BALL_MASS = BALL_MASS;
const NORMAL_BILLIARD_BALL_VELOCITY_X = BALL_VELOCITY_X;
const NORMAL_BILLIARD_BALL_VELOCITY_Y = BALL_VELOCITY_Y;
const NORMAL_BILLIARD_BALLS_DATA = [
  [ 1, [RACK_X + 0*X_OFFSET, RACK_Y + 0*Y_OFFSET]],

  [ 9, [RACK_X + 1*X_OFFSET, RACK_Y + 1*Y_OFFSET]],
  [10, [RACK_X + 1*X_OFFSET, RACK_Y - 1*Y_OFFSET]],

  [ 3, [RACK_X + 2*X_OFFSET, RACK_Y + 2*Y_OFFSET]],
  [ 8, [RACK_X + 2*X_OFFSET, RACK_Y + 0*Y_OFFSET]],
  [ 2, [RACK_X + 2*X_OFFSET, RACK_Y - 2*Y_OFFSET]],

  [13, [RACK_X + 3*X_OFFSET, RACK_Y + 3*Y_OFFSET]],
  [12, [RACK_X + 3*X_OFFSET, RACK_Y + 1*Y_OFFSET]],
  [ 4, [RACK_X + 3*X_OFFSET, RACK_Y - 1*Y_OFFSET]],
  [11, [RACK_X + 3*X_OFFSET, RACK_Y - 3*Y_OFFSET]],

  [ 7, [RACK_X + 4*X_OFFSET, RACK_Y + 4*Y_OFFSET]],
  [15, [RACK_X + 4*X_OFFSET, RACK_Y + 2*Y_OFFSET]],
  [ 6, [RACK_X + 4*X_OFFSET, RACK_Y + 0*Y_OFFSET]],
  [14, [RACK_X + 4*X_OFFSET, RACK_Y - 2*Y_OFFSET]],
  [ 5, [RACK_X + 4*X_OFFSET, RACK_Y - 4*Y_OFFSET]],
];

/* Hole */
const HOLE_RADIUS = BALL_RADIUS * 1.2;
const HOLES_DATA = [
  [HoleDirection.TOP_LEFT      ,[TABLE_WIDTH * 0 / 2, 0]],
  [HoleDirection.TOP_MIDDLE    ,[TABLE_WIDTH * 1 / 2, 0]],
  [HoleDirection.TOP_RIGHT     ,[TABLE_WIDTH * 2 / 2, 0]],
  [HoleDirection.BOTTOM_LEFT   ,[TABLE_WIDTH * 0 / 2, TABLE_HEIGHT]],
  [HoleDirection.BOTTOM_MIDDLE ,[TABLE_WIDTH * 1 / 2, TABLE_HEIGHT]],
  [HoleDirection.BOTTOM_RIGHT  ,[TABLE_WIDTH * 2 / 2, TABLE_HEIGHT]],
];

/* All together now */
class Defaults {

  static createTableBounds() {
    let topLeft = new Point(TABLE_TOP_LEFT_X, TABLE_TOP_LEFT_Y);
    return new Rectangle(topLeft, TABLE_WIDTH, TABLE_HEIGHT);
  }

  static createHoles() {
    return HOLES_DATA.map(data => {
      let [direction, [x, y]] = data;
      let center = new Point(x, y);
      let circle = new Circle(center, HOLE_RADIUS);
      return new Hole(circle, direction);
    });
  }

  static createHoleRadius() {
    return HOLE_RADIUS;
  }

  static createBallRadius() {
    return BALL_RADIUS;
  }

  static createCueBall() {
    let center = new Point(CUE_BALL_X, CUE_BALL_Y);
    let circle = new Circle(center, CUE_BALL_RADIUS);
    let velocity = new Velocity(CUE_BALL_VELOCITY_X, CUE_BALL_VELOCITY_Y);
    let ball = new Ball(circle, CUE_BALL_MASS, velocity);
    return new CueBall(ball);
  }

  static createNormalBilliardBalls() {
    return NORMAL_BILLIARD_BALLS_DATA.map(data => {
      let [number, [x, y]] = data;
      let center = new Point(x, y);
      let circle = new Circle(center, NORMAL_BILLIARD_BALL_RADIUS);
      let velocity = new Velocity(NORMAL_BILLIARD_BALL_VELOCITY_X,
                                  NORMAL_BILLIARD_BALL_VELOCITY_Y);
      let ball = new Ball(circle, NORMAL_BILLIARD_BALL_MASS, velocity);
      let normal_billiard_ball = new NormalBilliardBall(ball, number);
      return normal_billiard_ball;
    });
  }

}

module.exports = Defaults;
