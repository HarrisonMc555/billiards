const TABLE_TOP_COLOR = require('./table-top-color');

function paintTableTop(ctx, bounds) {
  ctx.fillStyle = TABLE_TOP_COLOR;
  ctx.fillRect(bounds.topLeft.x, bounds.topLeft.y, bounds.width,
               bounds.height);
}

module.exports = paintTableTop;
