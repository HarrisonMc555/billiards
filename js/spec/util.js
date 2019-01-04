const Point = require('../model/point');
const Circle = require('../model/circle');
const Rectangle = require('../model/rectangle');
const AxisAlignedLine = require('../model/axis-aligned-line');
const Velocity = require('../model/velocity');
const PhysicalBall = require('../model/physical-ball');

const pointEquality = function(first, second) {
  if (first instanceof Point && second instanceof Point) {
    return pointsEqual(first, second);
  }
  return undefined;
};

function pointsEqual(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
}



const circleEquality = function(first, second) {
  if (first instanceof Circle && second instanceof Circle) {
    return circlesEqual(first, second);
  }
  return undefined;
};

function circlesEqual(circle1, circle2) {
  return pointsEqual(circle1.center, circle2.center) &&
    circle1.radius && circle2.radius;
}



const velocityEquality = function(first, second) {
  if (first instanceof Velocity && second instanceof Velocity) {
    return velocitiesEqual(first, second);
  }
  return undefined;
};

function velocitiesEqual(velocity1, velocity2) {
  return velocity1.x === velocity2.x && velocity1.y === velocity2.y;
}



const physicalBallEquality = function(first, second) {
  if (first instanceof PhysicalBall && second instanceof PhysicalBall) {
    return physicalBallsEqual(first, second);
  }
  return undefined;
};

function physicalBallsEqual(physicalBall1, physicalBall2) {
  return pointsEqual(physicalBall1.circle, physicalBall2.circle) &&
    physicalBall1.mass && physicalBall2.mass &&
    velocitiesEqual(physicalBall1.circle, physicalBall2.circle);
}



const rectangleEquality = function(first, second) {
  if (first instanceof Rectangle && second instanceof Rectangle) {
    return rectanglesEqual(first, second);
  }
  return undefined;
};

function rectanglesEqual(rectangle1, rectangle2) {
  return pointsEqual(rectangle1.topLeft, rectangle2.topLeft) &&
    rectangle1.width && rectangle2.width &&
    rectangle1.height && rectangle2.height;
}



const axisAlignedLineEquality = function(first, second) {
  if (first instanceof AxisAlignedLine && second instanceof AxisAlignedLine) {
    return axisAlignedLinesEqual(first, second);
  }
  return undefined;
};

function axisAlignedLinesEqual(axisAlignedLine1, axisAlignedLine2) {
  return pointsEqual(axisAlignedLine1.corner, axisAlignedLine2.corner) &&
    axisAlignedLine1.direction && axisAlignedLine2.direction &&
    axisAlignedLine1.length && axisAlignedLine2.length;
}


function addCustomEqualityTesters() {
  jasmine.addCustomEqualityTester(pointEquality);
  jasmine.addCustomEqualityTester(circleEquality);
  jasmine.addCustomEqualityTester(velocityEquality);
  jasmine.addCustomEqualityTester(physicalBallEquality);
  jasmine.addCustomEqualityTester(rectangleEquality);
  jasmine.addCustomEqualityTester(axisAlignedLineEquality);
}


const Util = Object.freeze({
  addCustomEqualityTesters: addCustomEqualityTesters,
  pointEquality: pointEquality,
  circleEquality: circleEquality,
  velocityEquality: velocityEquality,
  physicalBallEquality: physicalBallEquality,
  rectangleEquality: rectangleEquality,
  axisAlignedLineEquality: axisAlignedLineEquality,
});

module.exports = Util;
