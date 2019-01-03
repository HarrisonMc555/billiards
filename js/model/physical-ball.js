const Velocity = require('./velocity');
const AxisDirection = require('./axis-direction');
const MathUtil = require('../util/math-util');

class PhysicalBall {

  constructor(circle, mass, velocity) {
    this.circle = circle;
    this.mass = mass;
    this.velocity = velocity;
  }

  maybeCollideWithWall(wall) {
    if (this.collidesWithWall(wall)) {
      console.log(this, 'bouncing off', wall);
      this.bounceOffWall(wall);
      return true;
    }
    return false;
  }

  collidesWithWall(wall) {
    return this.circle.collidesWithAxisAlignedLine(wall);
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
    if (this.collidesWithPhysicalBall(physicalBall)) {
      console.log(this, 'bouncing off', physicalBall);
      this.bounceOffPhysicalBall(physicalBall);
      return true;
    }
    return false;
  }

  collidesWithPhysicalBall(physicalBall) {
    return this.circle.collidesWithCircle(physicalBall.circle);
  }

  bounceOffPhysicalBall(physicalBall) {
    /* I have derived this equation. I believe it is correct. */
    let ball1 = this;
    let ball2 = physicalBall;
    let m1 = ball1.mass;
    let m2 = ball2.mass;
    let v1i = ball1.velocity.getMagnitude();
    let v2i = ball2.velocity.getMagnitude();
    let v1ix = ball1.velocity.x;
    let v1iy = ball1.velocity.y;
    let v2ix = ball2.velocity.x;
    let v2iy = ball2.velocity.y;

    let theta1 = ball1.center.angleTo(ball2.center);
    // let theta2 = ball2.center.angleTo(ball1.center);
    let theta2 = MathUtil.oppositeAngle(theta1);

    let deltaV1 = (2 * m2 * Math.abs(v1i - v2i)) / (m1 + m2);
    let deltaV2 = (2 * m1 * Math.abs(v2i - v1i)) / (m1 + m2);

    let deltaX = ball2.center.x - ball1.center.x;
    let deltaV1x;
    let deltaV1y;
    if (deltaX === 0) {
      deltaV1x = 0;
      deltaV1y = (m1 - m2)/(m1 + m2) * v1iy +
        2*m1/(m1 + m2) * v2iy;
    } else {
      deltaV1x = 2*m2*(v2ix - v1ix + Math.tan(theta1)*(v2iy - v1iy)) /
          ((1/Math.cos(theta1))^2 * (m1 + m2));
      deltaV1y = deltaV1x * Math.tan(theta1);
    }
    let deltaV2x = -m1/m2*deltaV1x;
    let deltaV2y = -m1/m2*deltaV1y;

    let v1fx = v1ix - deltaV1*Math.cos(theta1);
    let v1fy = v1iy - deltaV1*Math.sin(theta1);
    let v2fx = v2ix - deltaV2*Math.cos(theta2);
    let v2fy = v2iy - deltaV2*Math.sin(theta2);

    this.velocity = new Velocity(v1fx, v1fy);
    physicalBall.velocity = new Velocity(v2fx, v2fy);
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
