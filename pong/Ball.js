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
  constructor(x, y, width, height, canvasHeight, canvasWidth) {
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
   * Expects a paddle as an argument and returns true or false,
   * depending on whether their rectangles overlap.
   *
   * @param {Object} paddle
   * @returns Whether or not there was a collision.
   */
  didCollide(paddle) {
    /**
     * First, check to see if the left edge of either is farther
     * to the right than the right edge of the other. Then check
     * to see if the bottom edge of either is higher than the top
     * edge of the other.
     */
    if (
      this.x < paddle.x + paddle.width &&
      paddle.x < this.x + this.width &&
      this.y < paddle.y + paddle.height &&
      paddle.y < this.y + this.height
    ) {
      return true; // We have a collision!
    }
    // If the above aren't true, they're overlapping.
    return false;
  }
  /**
   * Update our paddle based on its DX and DY only if we're in play state;
   * scale the velocity by dt so movement is framerate-independent.
   *
   * @param {Number} deltaTime Time since the last frame.
   * @param {Object} player1
   * @param {Object} player2
   */
  update(deltaTime, player1, player2) {
    /**
     * Detect ball collision with paddles, reversing dx if true and
     * slightly increasing it, then altering the dy based on the position
     * of collision
     */
    if (this.didCollide(player1) || this.didCollide(player2)) {
      this.dx *= -1;
    }

    // Detect upper and lower screen boundary collision and reverse if collided.
    if (this.y <= 0) {
      this.y = 0;
      this.dy *= -1;
    }
    // -this.height to account for the ball's size.
    if (this.y >= this.canvasHeight - 20) {
      this.y = this.canvasHeight - 20;
      this.dy *= -1;
    }
    this.x += this.dx * deltaTime;
    this.y += this.dy * deltaTime;
  }
  /**
   * Draw the ball to the screen.
   */
  render(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
