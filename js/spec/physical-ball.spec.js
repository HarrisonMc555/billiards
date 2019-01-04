'use strict';

const Point = require('../model/point');
const Circle = require('../model/circle');
const Velocity = require('../model/velocity');
const PhysicalBall = require('../model/physical-ball');
// const Util = require('./util');
// const jasmine = require('jasmine');

describe('PhysicalBall', function() {

  // beforeEach(function() {
  //   jasmine.addCustomEqualityTester(Util.pointEquality);
  //   jasmine.addCustomEqualityTester(Util.circleEquality);
  //   jasmine.addCustomEqualityTester(Util.velocityEquality);
  //   jasmine.addCustomEqualityTester(Util.physicalBallEquality);
  //   jasmine.addCustomEqualityTester(Util.rectangleEquality);
  //   jasmine.addCustomEqualityTester(Util.axisAlignedLineEquality);
  // });

  it('create', function() {
    let ball = defaultBall();
    expect(ball).toBe(defaultBall());
    // expect(ball.circle).toBe(defaultCircle());
    // expect(ball.center).toBe(defaultCenter());
    // expect(ball.mass).toBe(defaultMass());
    // expect(ball.velocity).toBe(defaultVelocity());
  });
  
});

function defaultBall() {
  let center = defaultCenter();
  let mass = defaultMass();
  let velocity = defaultVelocity();
  return new PhysicalBall(center, mass, velocity);
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
