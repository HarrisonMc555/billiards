const Board = require('./board');
const BoardPainter = require('./board-painter');

var ctx;
var ctx_loaded = false;

window.onload = run;

function run() {
  load_ctx();
  if (!ctx_loaded) {
    return;
  }
  draw();
}

function load_ctx() {
  const canvas_name = 'billiards-canvas';
  var canvas = document.getElementById(canvas_name);

  if (!canvas) {
    console.log('Canvas element "' + canvas_name + '" not found');
  } else if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    ctx_loaded = true;
    console.log('success!');
    console.log('ctx = ' + ctx);
  } else {
    console.log('HTML canvas is not supported.');
  }
}

function draw() {
  let board = Board.createDefault();

  let boardPainter = BoardPainter.createDefault();
  boardPainter.paintBoard(ctx, board);

  console.log('board:', board);
}

let board = Board.createDefault();
