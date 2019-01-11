'use strict';

const Velocity = require('./velocity');
const AxisDirection = require('../geometry2d/axis-direction');
const MathUtil = require('../util/math-util');

class PhysicalBall {

  constructor(circle, mass, velocity) {
    this.circle = circle;
    this.mass = mass;
    this.velocity = velocity;
  }

  getNextCircle() {
    let circle = this.circle.cloned();
    circle.move(this.velocity.x, this.velocity.y);
    return circle;
  }

  maybeCollideWithWall(wall) {
    if (this.willCollideWithWall(wall)) {
      // console.log(this, 'bouncing off', wall);
      this.bounceOffWall(wall);
      return true;
    }
    return false;
  }

  willCollideWithWall(wall) {
    let nextCircle = this.getNextCircle();
    return nextCircle.collidesWithAxisAlignedLine(wall);
  }

  bounceOffWall(wall) {
    if (wall.direction === AxisDirection.RIGHT) {
      this.velocity.y = -this.velocity.y;
    } else if (wall.direction === AxisDirection.DOWN) {
      this.velocity.x = -this.velocity.x;
    } else {
      throw 'Invalid axis direction';
    }
  }

  maybeCollideWithPhysicalBall(physicalBall) {
    // console.log('maybeCollideWithPhysicalBall');
    let thisNextCircle = this.getNextCircle();
    let otherNextCircle = physicalBall.getNextCircle();
    if (thisNextCircle.collidesWithCircle(otherNextCircle)) {
      // console.log('bouncing off ball:', this, physicalBall);
      // console.log('bouncing off ball:');
      this.bounceOffPhysicalBall(physicalBall);
      // console.log('done bouncing off ball...');
      return true;
    }
    // console.log('NOT bouncing off ball:', this, physicalBall);
    // console.log('NOT bouncing off ball:');
    // if (this.collidesWithPhysicalBall(physicalBall)) {
    //   console.log(this, 'bouncing off', physicalBall);
    //   this.bounceOffPhysicalBall(physicalBall);
    //   return true;
    // }
    return false;
  }

  collidesWithPhysicalBall(physicalBall) {
    return this.circle.collidesWithCircle(physicalBall.circle);
  }

  willCollideWithPhysicalBall(physicalBall) {
    let thisNextCircle = this.getNextCircle();
    let otherNextCircle = physicalBall.getNextCircle();
    return thisNextCircle.collidesWithCircle(otherNextCircle);
  }

  bounceOffPhysicalBall(physicalBall) {
    // console.log('bounceOffPhysicalBall');
    /* I have derived this equation. I believe it is correct. */
    let ball1 = this;
    let ball2 = physicalBall;
    let m1 = ball1.mass;
    let m2 = ball2.mass;
    // let v1i = ball1.velocity.getMagnitude();
    // let v2i = ball2.velocity.getMagnitude();
    let v1ix = ball1.velocity.x;
    let v1iy = ball1.velocity.y;
    let v2ix = ball2.velocity.x;
    let v2iy = ball2.velocity.y;

    let theta1 = ball1.center.angleTo(ball2.center);
    // let theta2 = ball2.center.angleTo(ball1.center);
    let theta2 = MathUtil.oppositeAngle(theta1);

    // let deltaV1 = (2 * m2 * Math.abs(v1i - v2i)) / (m1 + m2);
    // let deltaV2 = (2 * m1 * Math.abs(v2i - v1i)) / (m1 + m2);

    let deltaX = ball2.center.x - ball1.center.x;
    let deltaV1x;
    let deltaV1y;
    if (deltaX === 0) {
      // console.log('special');
      deltaV1x = 0;
      deltaV1y = (m1 - m2)/(m1 + m2) * v1iy +
        2*m1/(m1 + m2) * v2iy;
    } else {
      // console.log('normal');
      let numerator = 2*m2*(v2ix - v1ix + Math.tan(theta1)*(v2iy - v1iy));
      let denominator = (MathUtil.sec(theta1) * MathUtil.sec(theta1)) *
          (m1 + m2);
      deltaV1x = numerator / denominator;
      deltaV1y = deltaV1x * Math.tan(theta1);
      // console.log('numerator', numerator);
      // console.log('denominator', denominator);
      // deltaV1x = 2*m2*(v2ix - v1ix + Math.tan(theta1)*(v2iy - v1iy)) /
      //     ((1/Math.cos(theta1))^2 * (m1 + m2));
      // deltaV1y = deltaV1x * Math.tan(theta1);
    }
    let deltaV2x = -m1/m2*deltaV1x;
    let deltaV2y = -m1/m2*deltaV1y;
    // console.log('deltaV1x', deltaV1x);
    // console.log('deltaV1y', deltaV1y);
    // console.log('deltaV2x', deltaV2x);
    // console.log('deltaV2y', deltaV2y);

    let v1fx = v1ix + deltaV1x;
    let v1fy = v1iy + deltaV1y;
    let v2fx = v2ix + deltaV2x;
    let v2fy = v2iy + deltaV2y;
    // console.log('theta1', theta1);
    // console.log('theta2', theta2);

    // console.log('old ball1 velocity:', this.velocity);
    // console.log('old ball2 velocity:', physicalBall.velocity);
    this.velocity = new Velocity(v1fx, v1fy);
    physicalBall.velocity = new Velocity(v2fx, v2fy);
    // console.log('new ball1 velocity:', this.velocity);
    // console.log('new ball2 velocity:', physicalBall.velocity);
  }

  move() {
    this.circle.move(this.velocity.x, this.velocity.y);
  }

  moving() {
    return this.velocity.getMagnitudeSquared() != 0;
  }

  roundVelocity(roundingFactor) {
    this.velocity.round(roundingFactor);
  }

  roundPosition(roundingFactor) {
    this.center.round(roundingFactor);
  }

  stopIfReallySlow(minSpeed) {
    this.velocity.stopIfReallySlow(minSpeed);
  }

  get center() {
    return this.circle.center;
  }

  get radius() {
    return this.circle.radius;
  }

}

module.exports = PhysicalBall;
