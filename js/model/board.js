'use strict';

const Table = require('./table');
const BilliardBalls = require('./billiard-balls');
const ArrayUtil = require('../util/array-util');
const SetUtil = require('../util/set-util');
const CollisionManager = require('../physics2d/collision-manager');

const COLLISION_SLOWDOWN_REDUCE_FACTOR = 0.1;
const COLLISION_SLOWDOWN_FACTOR = 1 - COLLISION_SLOWDOWN_REDUCE_FACTOR;
const FRICTION_REDUCE_FACTOR = 0.01;
const FRICTION_FACTOR = 1 - FRICTION_REDUCE_FACTOR;
const MIN_SPEED = 0.1;

class Board {

  constructor(table, billiardBalls) {
    this._table = table;
    this._billiardBalls = billiardBalls;
    this._anyStillMoving = true;
    this._debug = {};
  }

  get table() {
    return this._table;
  }

  get billiardBalls() {
    return this._billiardBalls;
  }

  getAllBalls() {
    return this.billiardBalls.getAllBalls();
  }

  tick() {
    if (this._anyStillMoving) {
      this.moveAllBalls();
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

  moveAllBalls() {
    let collidedBalls = this.updateVelocities();
    this.updatePositionsExcept(collidedBalls);
    /* If we don't do something, we'll never get to zero */
    this.stopReallySlowBalls();
  }

  updateVelocities() {
    let walls = this.table.walls();
    let allPhyiscalBalls = this.billiardBalls.getAllBalls();
    let collisionManager = new CollisionManager(walls, allPhyiscalBalls);
    let numberOfCollisions = collisionManager.doAllCollisions();
    numberOfCollisions.forEach(
      ([ball, numCollisions]) => this.applyCollisionSlowdown(ball,
                                                             numCollisions));

    // let collidedArray = allPhyiscalBalls.map(
    //   (ball, index, array) => {
    //     let otherBalls = array.slice(index + 1);
    //     return this.updateVelocityFromCollisions(ball,
    //                                              otherBalls);
    //     // let otherBalls = array.filter(
    //     //   otherBall => otherBall !== ball);
    //     // return this.updateVelocityFromCollisions(ball,
    //     //                                          otherBalls);
    //   });
    // collidedArray.forEach((collided, index) => {
    //   if (collided) {
    //     this.applyCollisionSlowdown(allPhyiscalBalls[index]);
    //   }
    // });
    allPhyiscalBalls.forEach(ball => this.applyFriction(ball));
    let collidedBallsArray = numberOfCollisions.map(entry => {
      let [ball, numCollisions] = entry;
      return ball;
    });
    let collidedBallsSet = new Set();
    SetUtil.extend(collidedBallsSet, collidedBallsArray);
    return collidedBallsSet;
  }

  updateVelocityFromCollisions(ball, otherBalls) {
    let hitWall = this.updateVelocityFromHittingWalls(ball);
    let hitBall = this.updateVelocityFromHittingBalls(ball,
                                                      otherBalls);
    return hitWall || hitBall;
  }

  updateVelocityFromHittingWalls(ball) {
    let collidedArray = this.table.walls().map(
      wall => ball.maybeCollideWithWall(wall));
    return ArrayUtil.someTruthy(collidedArray);
  }

  updateVelocityFromHittingBalls(ball, otherBalls) {
    let collidedArray = otherBalls.map(
      otherBall => ball.maybeCollideWithBall(
        otherBall));
    return ArrayUtil.someTruthy(collidedArray);
  }

  applyCollisionSlowdown(ball, numCollisions) {
    ball.velocity.scale(COLLISION_SLOWDOWN_FACTOR * numCollisions);
  }

  applyFriction(ball) {
    ball.velocity.scale(FRICTION_FACTOR);
  }

  updatePositionsExcept(collidedBalls) {
    let allBalls = this.billiardBalls.getAllBalls();
    let nonCollidedBalls = allBalls.filter(
      ball => !collidedBalls.has(ball));
    this.updatePositions(nonCollidedBalls);
    if (SetUtil.empty(collidedBalls)) {
      this._debug.collidedLast = false;
    } else {
      this._debug.collidedLast = true;
      // console.log('Done updating positions of collided balls');
    }
  }

  updatePositions(balls) {
    balls.forEach(ball =>
                          this.updatePosition(ball));
  }

  updatePosition(ball) {
    ball.circle.translate(ball.velocity.x, ball.velocity.y);
  }

  areAnyStillMoving() {
    let allBalls = this.billiardBalls.getAllBalls();
    return allBalls.some(ball => ball.moving());
  }

  stopReallySlowBalls() {
    this.billiardBalls.getAllBalls().forEach(
      ball => ball.stopIfReallySlow(MIN_SPEED)
    );
  }

  static createDefault() {
    return new Board(Table.createDefault(), BilliardBalls.createDefault());
  }

}

module.exports = Board;
