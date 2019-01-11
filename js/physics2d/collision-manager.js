'use strict';

const ArrayUtil = require('../util/array-util');
const SetUtil = require('../util/set-util');

class CollisionManager {

  constructor(walls, physicalBalls) {
    this.walls = walls;
    this.physicalBalls = physicalBalls;
  }

  doAllCollisions() {
    let allCollidedBalls = [];
    let recentlyCollidedBalls = new Set();
    this.updateCollidedBalls(recentlyCollidedBalls, this.physicalBalls);
    this.updateAllCollidedBalls(recentlyCollidedBalls, allCollidedBalls);
    while (!SetUtil.empty(recentlyCollidedBalls)) {
      let prevCollidedBalls = recentlyCollidedBalls;
      recentlyCollidedBalls = new Set();
      this.updateCollidedBalls(recentlyCollidedBalls, prevCollidedBalls);
      this.updateAllCollidedBalls(recentlyCollidedBalls, allCollidedBalls);
    }
    // return ArrayUtil.count(allCollidedBalls);
    let count = ArrayUtil.count(allCollidedBalls);
    return count;
  }

  updateCollidedBalls(recentlyCollidedBalls, physicalBalls) {
    let ballsHitWalls = this.ballsHitWalls(this.physicalBalls);
    SetUtil.extend(recentlyCollidedBalls, ballsHitWalls);
    let ballsHitBalls = this.ballsHitBalls(this.physicalBalls);
    SetUtil.extend(recentlyCollidedBalls, ballsHitBalls);
  }

  updateAllCollidedBalls(recentlyCollidedBalls, allCollidedBalls) {
    allCollidedBalls.push(...recentlyCollidedBalls);
  }

  ballsHitWalls(physicalBalls) {
    return physicalBalls.filter(physicalBall =>
                                this.ballHitWalls(physicalBall));
  }

  ballHitWalls(physicalBall) {
    let wallsHit = this.walls.filter(wall =>
                                     this.ballHitWall(physicalBall, wall));
    return !ArrayUtil.empty(wallsHit);
  }

  ballHitWall(physicalBall, wall) {
    return physicalBall.maybeCollideWithWall(wall);
  }

  ballsHitBalls(physicalBalls) {
    let recentlyCollidedBalls = new Set();
    physicalBalls.forEach(
      (physicalBall, index, array) =>
        SetUtil.extend(recentlyCollidedBalls,
                       this.ballHitBalls(physicalBall, array.slice(index + 1)))
    );
    return recentlyCollidedBalls;
  }

  ballHitBalls(physicalBall, otherPhysicalBalls) {
    let recentlyCollidedBalls = new Set();
    otherPhysicalBalls.forEach(otherPhysicalBall => {
      if (this.ballHitBall(physicalBall, otherPhysicalBall)) {
        SetUtil.extend(recentlyCollidedBalls, [physicalBall, otherPhysicalBall]);
      }
    });
    return recentlyCollidedBalls;
  }

  ballHitBall(physicalBall1, physicalBall2) {
    return physicalBall1.maybeCollideWithPhysicalBall(physicalBall2);
  }

}

module.exports = CollisionManager;
