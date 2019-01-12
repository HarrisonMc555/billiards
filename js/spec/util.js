const Point = require('../model/point');
const Circle = require('../model/circle');
const Rectangle = require('../model/rectangle');
const AxisAlignedLine = require('../model/axis-aligned-line');
const Velocity = require('../model/velocity');
const Ball = require('../mode../physics2d/ball');

const LEEWAY = 0.0001;

const pointEquality = function(first, second) {
  if (first instanceof Point && second instanceof Point) {
    return pointsEqual(first, second);
  }
  return undefined;
};

function pointsEqual(point1, point2) {
  return floatingEqual(point1.x, point2.x) &&
    floatingEqual(point1.y, point2.y);
}



const circleEquality = function(first, second) {
  if (first instanceof Circle && second instanceof Circle) {
    return circlesEqual(first, second);
  }
  return undefined;
};

function circlesEqual(circle1, circle2) {
  return pointsEqual(circle1.center, circle2.center) &&
    floatingEqual(circle1.radius, circle2.radius);
}



const velocityEquality = function(first, second) {
  if (first instanceof Velocity && second instanceof Velocity) {
    return velocitiesEqual(first, second);
  }
  return undefined;
};

function velocitiesEqual(velocity1, velocity2) {
  return floatingEqual(velocity1.x, velocity2.x) &&
    floatingEqual(velocity1.y, velocity2.y);
}



const ballEquality = function(first, second) {
  if (first instanceof Ball && second instanceof Ball) {
    return ballsEqual(first, second);
  }
  return undefined;
};

function ballsEqual(ball1, ball2) {
  return circlesEqual(ball1.circle, ball2.circle) &&
    floatingEqual(ball1.mass, ball2.mass) &&
    velocitiesEqual(ball1.velocity, ball2.velocity);
}



const rectangleEquality = function(first, second) {
  if (first instanceof Rectangle && second instanceof Rectangle) {
    return rectanglesEqual(first, second);
  }
  return undefined;
};

function rectanglesEqual(rectangle1, rectangle2) {
  return pointsEqual(rectangle1.topLeft, rectangle2.topLeft) &&
    floatingEqual(rectangle1.width, rectangle2.width) &&
    floatingEqual(rectangle1.height, rectangle2.height);
}



const axisAlignedLineEquality = function(first, second) {
  if (first instanceof AxisAlignedLine && second instanceof AxisAlignedLine) {
    return axisAlignedLinesEqual(first, second);
  }
  return undefined;
};

function axisAlignedLinesEqual(axisAlignedLine1, axisAlignedLine2) {
  return pointsEqual(axisAlignedLine1.corner, axisAlignedLine2.corner) &&
    axisAlignedLine1.direction == axisAlignedLine2.direction &&
    floatingEqual(axisAlignedLine1.length, axisAlignedLine2.length);
}


function addCustomEqualityTesters() {
  jasmine.addCustomEqualityTester(pointEquality);
  jasmine.addCustomEqualityTester(circleEquality);
  jasmine.addCustomEqualityTester(velocityEquality);
  jasmine.addCustomEqualityTester(ballEquality);
  jasmine.addCustomEqualityTester(rectangleEquality);
  jasmine.addCustomEqualityTester(axisAlignedLineEquality);
}


function floatingEqual(float1, float2) {
  return Math.abs(float1 - float2) < LEEWAY;
}


const Util = Object.freeze({
  addCustomEqualityTesters: addCustomEqualityTesters,
  pointEquality: pointEquality,
  circleEquality: circleEquality,
  velocityEquality: velocityEquality,
  ballEquality: ballEquality,
  rectangleEquality: rectangleEquality,
  axisAlignedLineEquality: axisAlignedLineEquality,
});

module.exports = Util;
