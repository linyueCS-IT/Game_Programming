/**
 * We initialize our game by grabbing the `canvas` element from
 * the DOM located in `index.html` and getting the `context` object
 * from it.
 */
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d") || new CanvasRenderingContext2D(); // How I draw
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute("tabindex", 1); // Allows the canvas to receive user input. // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// This will be used to calculate delta time in `gameLoop()`.
let lastTime = 0;

// Initialize score variables for rendering on the screen and keeping track of the winner.
let player1Score = 0;
let player2Score = 0;

// Load a custom font to use.
const myFont = new FontFace("Bytesized", "url(./Bytesized-Regular.ttf)");
myFont.load().then((font) => {
  document.fonts.add(font);
});

// Paddle positions on the Y axis (they can only move up or down).
let player1Y = 30;
let player2Y = CANVAS_HEIGHT - 230;

// Speed at which we will move our paddle; multiplied by `dt` in `update()`.
const PADDLE_SPEED = 1000;

// Keep track of what keys were pressed/unpressed.
const keys = {};

// Set the appropriate key in our `keys` object to `true` if a key was pressed.
canvas.addEventListener("keydown", (event) => {
  keys[event.key] = true;
});

// Set the appropriate key in our `keys` object to `false` if a key was unpressed.
canvas.addEventListener("keyup", (event) => {
  keys[event.key] = false;
});

/**
 * This function is the heartbeat of the application. It is called
 * 60 times per second (depending on your monitor's refresh rate) and
 * it is what we will use to drive our game's animations. The way
 * that this function is called 60 times per second is by using JavaScript's
 * `requestAnimationFrame()` API.
 * @param {Number} currentTime currentTime How much time has elapsed since the age loaded.
 */
function gameLoop(currentTime = 0) {
  // Calculates delta time and converts it to seconds instead of milliseconds.
  const deltaTime = (currentTime - lastTime) / 1000;

  update(deltaTime);
  lastTime = currentTime;
  requestAnimationFrame(gameLoop); // This like "while true"
}

/**
 * This function is called by `gameLoop()` at each frame of program execution;
 * `dt` (i.e., DeltaTime) will be the elapsed time in seconds since the last
 * frame, and we can use this to scale any changes in our game for even behavior
 * across frame rates. This is where the logic of our game will be executed.
 * @param  {Number} deltaTime How much time has elapsed since the last time this was called.
 */
function update(deltaTime) {
  // textX = textX + 100 * dt;
  // if (textX > CANVAS_WIDTH){
  //     textX = 0
  // }

  if (keys.w) {
    // player1Y -= PADDLE_SPEED * dt;
    player1Y = Math.max(0, player1Y - PADDLE_SPEED * deltaTime);
  }

  if (keys.s) {
    // player1Y += PADDLE_SPEED * dt
    player1Y = Math.min(
      CANVAS_HEIGHT - 200,
      player1Y + PADDLE_SPEED * deltaTime
    );
  }

  if (keys.ArrowUp) {
    // player2Y -= PADDLE_SPEED * dt;
    player2Y = Math.max(0, player2Y - PADDLE_SPEED * deltaTime);
  }

  if (keys.ArrowDown) {
    // player2Y += PADDLE_SPEED * dt
    player2Y = Math.min(
      CANVAS_HEIGHT - 200,
      player2Y + PADDLE_SPEED * deltaTime
    );
  }

  render();
}

function render() {
  /**
   * Erase whatever was previously on the canvas so that we can start
   * fresh each frame. It does this by drawing a "clear" rectangle starting
   * from the origin to the extremities of the canvas.
   */
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Set font configuration.
  context.font = "100px Bytesized";
  context.textBaseline = "middle";
  context.textAlign = "center";

  /**
   * The paddles are simply rectangles we draw on the screen at certain
   * points, as is the ball.
   */

  // Render scores at the top of the screen.
  context.fillText(`${player1Score}`, CANVAS_WIDTH * 0.25, 75);
  context.fillText(`${player2Score}`, CANVAS_WIDTH * 0.75, 75);
  // Left paddle
  context.fillRect(30, player1Y, 20, 200); // x, y, width, height

  // Ball
  context.fillRect(CANVAS_WIDTH * 0.5 - 10, CANVAS_HEIGHT * 0.5 - 10, 20, 20);

  // Right paddle
  context.fillRect(CANVAS_WIDTH - 50, player2Y, 20, 200);
}

gameLoop();
canvas.focus();
