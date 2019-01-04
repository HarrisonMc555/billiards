'use strict';

const Point = require('../model/point');
const Circle = require('../model/circle');
const Rectangle = require('../model/rectangle');
const AxisAlignedLine = require('../model/axis-aligned-line');
const AxisDirection = require('../model/axis-direction');
const Velocity = require('../model/velocity');
const PhysicalBall = require('../model/physical-ball');
const Util = require('./util');

describe('PhysicalBall', function() {

  beforeEach(function() {
    Util.addCustomEqualityTesters();
  });

  it('create', function() {
    let ball = defaultBall();
    expect(ball).toEqual(defaultBall());
    expect(ball.circle).toEqual(defaultCircle());
    expect(ball.circle.center).toEqual(defaultCenter());
    expect(ball.circle.center.x).toBe(defaultCenter().x);
    expect(ball.circle.center.y).toBe(defaultCenter().y);
    expect(ball.circle.radius).toBe(defaultCircle().radius);
    expect(ball.mass).toBe(defaultMass());
    expect(ball.velocity).toEqual(defaultVelocity());
    expect(ball.velocity.x).toBe(defaultVelocity().x);
    expect(ball.velocity.y).toBe(defaultVelocity().y);
  });

  it('getNextCircle when not moving', function() {
    let ball = defaultBall();
    ball.velocity = new Velocity(0, 0);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle).toEqual(nextCircle);
  });
  
  it('getNextCircle when moving in x', function() {
    let ball = defaultBall();
    ball.velocity = new Velocity(3, 0);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle.center.x + 3).toBe(nextCircle.center.x);
    expect(ball.circle.center.y).toBe(nextCircle.center.y);
  });
  
  it('getNextCircle when moving in y', function() {
    let ball = defaultBall();
    ball.velocity = new Velocity(0, -2);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle.center.y - 2).toBe(nextCircle.center.y);
    expect(ball.circle.center.x).toBe(nextCircle.center.x);
  });
  
  it('getNextCircle when moving in both directions', function() {
    let ball = defaultBall();
    ball.velocity = new Velocity(-4, 5);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle.center.x - 4).toBe(nextCircle.center.x);
    expect(ball.circle.center.y + 5).toBe(nextCircle.center.y);
  });

  it('won\'t collide with far away wall', function() {
    let ball = getMovingUpRightBall();
    let wall = getFarAwayWall();
    expect(ball.willCollideWithWall(wall)).toBe(false);
  });

  it('will collide with touching wall', function() {
    let ball = getMovingUpRightBall();
    let wall = getTopTouchingWall();
    expect(ball.willCollideWithWall(wall)).toBe(true);
  });

  it('won\'t collide with far away wall', function() {
    let ball = getMovingUpRightBall();
    let wall = getFarAwayWall();
    expect(ball.maybeCollideWithWall(wall)).toBe(false);
    /* Should not change velocity */
    expect(ball.velocity).toEqual(getUpRightVelocity());
  });

  it('will collide with touching wall', function() {
    let ball = getMovingUpRightBall();
    let wall = getTopTouchingWall();
    expect(ball.maybeCollideWithWall(wall)).toBe(true);
    /* SHOULD change velocity */
    expect(ball.velocity).not.toEqual(getUpRightVelocity());
    /* Should bounce vertically */
    expect(ball.velocity.y).toBe(- getUpRightVelocity().y);
    expect(ball.velocity.x).toBe(getUpRightVelocity().x);
  });

  // it('don\'t collide with far away wall', function() {
  //   let ball = defaultBall();
  //   let wall = getFarAwayWall();
  //   expect(ball.maybeCollideWithWall(wall)).toBe(false);
  //   /* Should not change velocity */
  //   expect(ball.velocity).toEqual(defaultVelocity());
  // });
  
  // it('collide with touching wall', function() {
  //   let ball = defaultBall();
  //   ball.velocity = getUpRightVelocity();
  //   let wall = getTopTouchingWall();
  //   expect(ball.maybeCollideWithWall(wall)).toBe(true);
  //   /* Should change velocity */
  //   expect(ball.velocity).not.toEqual(getUpRightVelocity());
  //   /* Should bounce vertically */
  //   expect(ball.velocity.y).toBe(- getUpRightVelocity().y);
  //   expect(ball.velocity.x).toBe(getUpRightVelocity().x);
  // });
  
});

function defaultBall() {
  let circle = defaultCircle();
  let mass = defaultMass();
  let velocity = defaultVelocity();
  return new PhysicalBall(circle, mass, velocity);
}

function defaultCircle() {
  let center = defaultCenter();
  let radius = 1;
  return new Circle(center, radius);
}

function defaultCenter() {
  let x = 0;
  let y = 0;
  return new Point(x, y);
}

function defaultVelocity() {
  return new Velocity(0, 0);
}

function defaultMass() {
  return 1;
}

function getFarAwayWall() {
  let corner = getFarAwayCorner();
  return new AxisAlignedLine(corner, AxisDirection.RIGHT, 500);
}

function getFarAwayCorner() {
  return new Point(1234, 5678);
}

function getTopTouchingWall() {
  let ball = getMovingUpRightBall();
  let corner = ball.circle.center.createPointOffsetBy(-50, ball.velocity.y);
  return new AxisAlignedLine(corner, AxisDirection.RIGHT, 100);
}

function getMovingUpRightBall() {
  let ball = defaultBall();
  ball.velocity = getUpRightVelocity();
  return ball;
}

function getUpRightVelocity() {
  return new Velocity(1, 1);
}
