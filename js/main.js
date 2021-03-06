const Board = require('./model/board');
const BoardPainter = require('./paint/board-painter');

let ctx;
let ctx_loaded = false;

let board;
let boardPainter;

window.onload = run;

function run() {
  setup();
  if (!ctx_loaded) {
    return;
  }
  console.log(board);
  animate();
}

function setup() {
  load_ctx();
  init_board();
}

function load_ctx() {
  const canvas_name = 'billiards-canvas';
  let canvas = document.getElementById(canvas_name);

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

function init_board() {
  board = Board.createDefault();
  boardPainter = BoardPainter.createDefault();
}

function animate() {
  tick();
  draw();
  setTimeout(animate, 20);
}

function tick() {
  board.tick();
}

function draw() {
  boardPainter.paintBoard(ctx, board);
}
