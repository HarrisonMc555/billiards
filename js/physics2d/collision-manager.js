'use strict';

const ArrayUtil = require('../util/array-util');
const SetUtil = require('../util/set-util');

class CollisionManager {

  constructor(walls, balls) {
    this.walls = walls;
    this.balls = balls;
  }

  doAllCollisions() {
    let allCollidedBalls = [];
    let recentlyCollidedBalls = new Set();
    this.collideBalls(recentlyCollidedBalls, this.balls);
    this.updateCollidedBalls(recentlyCollidedBalls, allCollidedBalls);
    let index = 0;
    while (!SetUtil.empty(recentlyCollidedBalls)) {
      let prevCollidedBalls = recentlyCollidedBalls;
      recentlyCollidedBalls = new Set();
      this.collideBalls(recentlyCollidedBalls, prevCollidedBalls);
      this.updateCollidedBalls(recentlyCollidedBalls, allCollidedBalls);
      index += 1;
      if (index > 20) {
        console.log("Too many times...");
        break;
      }
      console.log("index: ", index);
    }
    console.log("done.");
    // return ArrayUtil.count(allCollidedBalls);
    let count = ArrayUtil.count(allCollidedBalls);
    return count;
  }

  collideBalls(recentlyCollidedBalls, balls) {
    let ballsHitWalls = this.ballsHitWalls(this.balls);
    SetUtil.extend(recentlyCollidedBalls, ballsHitWalls);
    let ballsHitBalls = this.ballsHitBalls(this.balls);
    SetUtil.extend(recentlyCollidedBalls, ballsHitBalls);
  }

  updateCollidedBalls(recentlyCollidedBalls, allCollidedBalls) {
    allCollidedBalls.push(...recentlyCollidedBalls);
  }

  ballsHitWalls(balls) {
    return balls.filter(ball => this.ballHitWalls(ball));
  }

  ballHitWalls(ball) {
    let wallsHit = this.walls.filter(wall =>
                                     this.ballHitWall(ball, wall));
    return !ArrayUtil.empty(wallsHit);
  }

  ballHitWall(ball, wall) {
    return ball.maybeCollideWithWall(wall);
  }

  ballsHitBalls(balls) {
    let recentlyCollidedBalls = new Set();
    // balls.forEach(
    //   (ball, index, array) =>
    //     SetUtil.extend(recentlyCollidedBalls,
    //                    this.ballHitBalls(ball, array.slice(index + 1)))
    // );
    balls.forEach(
      (ball, index, array) =>
        SetUtil.extend(recentlyCollidedBalls,
                       // this.ballHitBalls(ball, array.slice(index + 1)))
                       this.ballHitBalls(ball, array))
    );
    return recentlyCollidedBalls;
  }

  ballHitBalls(ball, otherBalls) {
    let recentlyCollidedBalls = new Set();
    otherBalls.forEach(otherBall => {
      if (this.ballHitBall(ball, otherBall)) {
        SetUtil.extend(recentlyCollidedBalls, [ball, otherBall]);
      }
    });
    return recentlyCollidedBalls;
  }

  ballHitBall(ball1, ball2) {
    return ball1.maybeCollideWithBall(ball2);
  }

}

module.exports = CollisionManager;
