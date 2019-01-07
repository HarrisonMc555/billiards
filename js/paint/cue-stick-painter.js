'use strict';

const PhysicalBallPaintUtils = require('./physical-ball-paint-utils');
const BilliardBallsPaintUtils = require('./billiard-balls-paint-utils');
const PaintUtil = require('./paint-util');
const CueStickPaintUtils = require('./cue-stick-paint-utils');

class CueStickPainter {
  
  constructor(cueStickPaintFunction) {
    this.cueStickPaintFunction = cueStickPaintFunction;
  }

  paintCueStick(ctx, cueStick) {
    this.cueStickPaintFunction(ctx, cueStick);
  }

  static createDefault() {
    return new CueStickPainter(CueStickPaintUtils.paintCueStick);
  }

}

module.exports = CueStickPainter;
