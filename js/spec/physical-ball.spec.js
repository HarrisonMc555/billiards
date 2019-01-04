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

  let ball;
  let ball1;
  let ball2;

  beforeEach(function() {
    Util.addCustomEqualityTesters();
    ball = defaultBall();
    ball1 = defaultBall();
    ball2 = defaultBall();
    spyOn(ball1, 'bounceOffPhysicalBall').and.callThrough();
  });

  it('create', function() {
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
    ball.velocity = new Velocity(0, 0);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle).toEqual(nextCircle);
  });
  
  it('getNextCircle when moving in x', function() {
    ball.velocity = new Velocity(3, 0);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle.center.x + 3).toBe(nextCircle.center.x);
    expect(ball.circle.center.y).toBe(nextCircle.center.y);
  });
  
  it('getNextCircle when moving in y', function() {
    ball.velocity = new Velocity(0, -2);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle.center.y - 2).toBe(nextCircle.center.y);
    expect(ball.circle.center.x).toBe(nextCircle.center.x);
  });
  
  it('getNextCircle when moving in both directions', function() {
    ball.velocity = new Velocity(-4, 5);
    let nextCircle = ball.getNextCircle();
    expect(ball.circle.center.x - 4).toBe(nextCircle.center.x);
    expect(ball.circle.center.y + 5).toBe(nextCircle.center.y);
  });

  it('won\'t collide with far away wall', function() {
    ball = getMovingUpRightBall();
    let wall = getFarAwayWall();
    expect(ball.willCollideWithWall(wall)).toBe(false);
  });

  it('will collide with touching wall', function() {
    ball = getMovingUpRightBall();
    let wall = getTopTouchingWall();
    expect(ball.willCollideWithWall(wall)).toBe(true);
  });

  it('won\'t collide with far away wall', function() {
    ball = getMovingUpRightBall();
    let wall = getFarAwayWall();
    expect(ball.maybeCollideWithWall(wall)).toBe(false);
    /* Should not change velocity */
    expect(ball.velocity).toEqual(getUpRightVelocity());
  });

  it('will collide with touching wall', function() {
    ball = getMovingUpRightBall();
    let wall = getTopTouchingWall();
    expect(ball.maybeCollideWithWall(wall)).toBe(true);
    /* SHOULD change velocity */
    expect(ball.velocity).not.toEqual(getUpRightVelocity());
    /* Should bounce vertically */
    expect(ball.velocity.y).toBe(- getUpRightVelocity().y);
    expect(ball.velocity.x).toBe(getUpRightVelocity().x);
  });

  it('moving ball hitting stationary ball head on switches velocities',
     function() {
       ball1.circle.center = new Point(0, 0);
       ball1.circle.radius = 1;
       ball1.mass = 1;
       ball1.velocity = new Velocity(1, 0);
       ball2.circle.center = new Point(2, 0);
       ball2.circle.radius = 1;
       ball2.mass = 1;
       ball2.velocity = new Velocity(0, 0);
       expect(ball1.velocity.x).toBe(1);
       expect(ball1.getNextCircle()).toEqual(new Circle(new Point(1, 0), 1));
       expect(ball2.getNextCircle()).toEqual(new Circle(new Point(2, 0), 1));
       expect(ball1.willCollideWithPhysicalBall(ball2)).toBe(true);
       expect(ball2.willCollideWithPhysicalBall(ball1)).toBe(true);
       expect(ball1.maybeCollideWithPhysicalBall(ball2)).toBe(true);
       expect(ball1.velocity).toEqual(new Velocity(0, 0));
       expect(ball2.velocity).toEqual(new Velocity(1, 0));
       expect(ball1.bounceOffPhysicalBall).toHaveBeenCalledWith(ball2);
       expect(ball1.bounceOffPhysicalBall).toHaveBeenCalledTimes(1);
     });
  
  it('moving ball hitting ball moving opposite direction head on switches ' +
     'velocities',
     function() {
       ball1.circle.center = new Point(0, 0);
       ball1.circle.radius = 1;
       ball1.mass = 1;
       ball1.velocity = new Velocity(1, 0);
       ball2.circle.center = new Point(3, 0);
       ball2.circle.radius = 1;
       ball2.mass = 1;
       ball2.velocity = new Velocity(-1, 0);
       expect(ball1.velocity.x).toBe(1);
       expect(ball1.getNextCircle()).toEqual(new Circle(new Point(1, 0), 1));
       expect(ball2.getNextCircle()).toEqual(new Circle(new Point(2, 0), 1));
       expect(ball1.willCollideWithPhysicalBall(ball2)).toBe(true);
       expect(ball2.willCollideWithPhysicalBall(ball1)).toBe(true);
       expect(ball1.maybeCollideWithPhysicalBall(ball2)).toBe(true);
       expect(ball1.velocity).toEqual(new Velocity(-1, 0));
       expect(ball2.velocity).toEqual(new Velocity(1, 0));
       expect(ball1.bounceOffPhysicalBall).toHaveBeenCalledWith(ball2);
     });
  
});

function defaultBall() {
  let circle = defaultCircle();
  let mass = defaultMass();
  let velocity = defaultVelocity();
  return new PhysicalBall(circle, mass, velocity);
}

function defaultCircle() {
  let center = defaultCenter();
  let radius = defaultRadius();
  return new Circle(center, radius);
}

function defaultRadius() {
  return 1;
}

function defaultCenter() {
  let x = defaultPositionX();
  let y = defaultPositionY();
  return new Point(x, y);
}

function defaultPositionX() {
  return 0;
}

function defaultPositionY() {
  return 0;
}

function defaultVelocity() {
  let x = defaultVelocityX();
  let y = defaultVelocityY();
  return new Velocity(x, y);
}

function defaultVelocityX() {
  return 0;
}

function defaultVelocityY() {
  return 0;
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

function getKineticEnergy(ball) {
  let velocity = ball.velocity.getMagnitude();
  return 0.5 * ball.mass * (velocity * velocity);
}

function getMomentumVector(ball) {
  return [ball.mass * ball.velocity.x, ball.mass * ball.velocity.y];
}
