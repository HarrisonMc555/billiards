'use strict';

const WALL_COLOR = 'green';
const LINE_WIDTH = 1;

function paintWall(ctx, wall) {
  ctx.strokeStyle = WALL_COLOR;
  ctx.lineWidth = LINE_WIDTH;
  ctx.beginPath();
  ctx.moveTo(wall.begin.x, wall.begin.y);
  ctx.lineTo(wall.end.x, wall.end.y);
  ctx.stroke();
}

module.exports = paintWall;
