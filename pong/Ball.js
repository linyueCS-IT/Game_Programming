export default class Ball {
  /**
   * Represents a ball which will bounce back and forth between paddles
   * and walls until it passes a left or right boundary of the screen,
   * scoring a point for the opponent.
   *
   * @param {Number} x The ball's X coordinate.
   * @param {Number} y The ball's Y coordinate.
   * @param {Number} width The ball's width.
   * @param {Number} height The ball's height.
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.dx = 200;
    this.dy = 200;
  }

  /**
   * Position the ball at the specified coordinates
   * and generate a new random velocity.
   *
   * @param {Number} x The X coordinate.
   * @param {Number} y The Y coordinate.
   */
  reset(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 200;
    this.dy = 200;
  }

  /**
   * Update our paddle based on its DX and DY only if we're in play state;
   * scale the velocity by dt so movement is framerate-independent.
   *
   * @param {Number} dt Time since the last frame.
   */
  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
  }

  /**
   * Draw the ball to the screen.
   *
   * @param {CanvasRenderingContext2D} context
   */
  render(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
