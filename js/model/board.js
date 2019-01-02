const Table = require('./table');
const BilliardBalls = require('./billiard-balls');
const ArrayUtil = require('../util/array-util');

const COLLISION_SLOWDOWN_REDUCE_FACTOR = 0.1;
const COLLISION_SLOWDOWN_FACTOR = 1 - COLLISION_SLOWDOWN_REDUCE_FACTOR;
const FRICTION_REDUCE_FACTOR = 0.01;
const FRICTION_FACTOR = 1 - FRICTION_REDUCE_FACTOR;
const ROUNDING_FACTOR = 0.0001;
const MIN_SPEED = 0.1;

class Board {

  constructor(table, billiardBalls) {
    this.table = table;
    this.billiardBalls = billiardBalls;
    this._anyStillMoving = true;
  }

  getAllPhysicalBalls() {
    return this.billiardBalls.getAllPhysicalBalls();
  }

  tick() {
    if (this._anyStillMoving) {
      this.moveAllPhysicalBalls();
      this._anyStillMoving = this.areAnyStillMoving();
      if (!this._anyStillMoving) {
        console.log('everything stopped moving!');
      }
    }
  }

  hitCueBall() {
    this.billiardBalls.cueBall.velocity.x += 2;
    this.billiardBalls.cueBall.velocity.y += 1;
  }

  moveAllPhysicalBalls() {
    this.updateVelocities();
    this.updatePositions();
    this.roundValues();
    /* With just rounding, we'll never get to zero */
    this.stopReallySlowBalls();
  }

  updateVelocities() {
    let allPhyiscalBalls = this.billiardBalls.getAllPhysicalBalls();
    let collidedArray = allPhyiscalBalls.map(
      (physicalBall, index, array) => {
        let otherPhysicalBalls = array.slice(index + 1);
        return this.updateVelocityFromCollisions(physicalBall,
                                                 otherPhysicalBalls);
      });
    collidedArray.forEach((collided, index) => {
      if (collided) {
        this.applyCollisionSlowdown(allPhyiscalBalls[index]);
      }
    });
    allPhyiscalBalls.forEach(physicalBall => this.applyFriction(physicalBall));
  }

  updateVelocityFromCollisions(physicalBall, otherPhysicalBalls) {
    let hitWall = this.updateVelocityFromHittingWalls(physicalBall);
    let hitBall = this.updateVelocityFromHittingBalls(physicalBall,
                                                      otherPhysicalBalls);
    return hitWall || hitBall;
  }

  updateVelocityFromHittingWalls(physicalBall) {
    let collidedArray = this.table.getWalls().map(
      wall => physicalBall.maybeCollideWithWall(wall));
    return ArrayUtil.someTruthy(collidedArray);
  }

  updateVelocityFromHittingBalls(physicalBall, otherPhysicalBalls) {
    let collidedArray = otherPhysicalBalls.map(
      otherPhysicalBall => physicalBall.maybeCollideWithPhysicalBall(
        otherPhysicalBall));
    return ArrayUtil.someTruthy(collidedArray);
  }

  applyCollisionSlowdown(physicalBall) {
    physicalBall.velocity.scale(COLLISION_SLOWDOWN_FACTOR);
  }

  applyFriction(physicalBall) {
    physicalBall.velocity.scale(FRICTION_FACTOR);
  }

  updatePositions() {
    let allPhysicalBalls = this.billiardBalls.getAllPhysicalBalls();
    allPhysicalBalls.forEach(physicalBall =>
                             this.updatePosition(physicalBall));
  }

  updatePosition(physicalBall) {
    physicalBall.circle.move(physicalBall.velocity.x, physicalBall.velocity.y);
  }

  areAnyStillMoving() {
    let allPhysicalBalls = this.billiardBalls.getAllPhysicalBalls();
    return allPhysicalBalls.some(physicalBall => physicalBall.moving());
  }

  roundValues() {
    this.roundVelocities();
    this.roundPositions();
  }

  roundVelocities() {
    this.billiardBalls.getAllPhysicalBalls().forEach(
      physicalBall => physicalBall.roundVelocity(ROUNDING_FACTOR)
    );
  }

  roundPositions() {
    this.billiardBalls.getAllPhysicalBalls().forEach(
      physicalBall => physicalBall.roundPosition(ROUNDING_FACTOR)
    );
  }

  stopReallySlowBalls() {
    this.billiardBalls.getAllPhysicalBalls().forEach(
      physicalBall => physicalBall.stopIfReallySlow(MIN_SPEED)
    );
  }

  static createDefault() {
    return new Board(Table.createDefault(), BilliardBalls.createDefault());
  }

}

module.exports = Board;
