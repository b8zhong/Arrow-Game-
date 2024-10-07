/* global color, fill, rect, triangle */

/* 

I used this file to store any classes

*/

class ArrowOutline {
  constructor(direction, x, y) {
    // Class for the arrow outlines at the top of the screen during game play. They're dimensions are slightly larger than the arrows for points
    this.x = x;
    this.y = y;

    this.direction = direction;

    switch (this.direction) {
      case "left":
        this.t1x = x + 2;
        this.t1y = y - 4;
        this.t2x = x + 2;
        this.t2y = y + 84;
        this.t3x = x - 42;
        this.t3y = y + 40;
        this.rx = x;
        this.ry = y + 18;
        this.rwidth = 30;
        this.rheight = 44;
        this.color = color(33, 207, 71);
        break;
      case "right":
        this.t1x = x - 2;
        this.t1y = y - 4;
        this.t2x = x - 2;
        this.t2y = y + 84;
        this.t3x = x + 42;
        this.t3y = y + 40;
        this.rx = x - 30;
        this.ry = y + 18;
        this.rwidth = 30;
        this.rheight = 44;
        this.color = color(207, 33, 33);
        break;
      case "up":
        this.t1x = x - 6;
        this.t1y = y + 2;
        this.t2x = x + 40;
        this.t2y = y - 44;
        this.t3x = x + 86;
        this.t3y = y + 2;
        this.rx = x + 18;
        this.ry = y;
        this.rwidth = 44;
        this.rheight = 30;
        this.color = color(33, 85, 207);
        break;
      case "down":
        this.t1x = x - 6;
        this.t1y = y - 17;
        this.t2x = x + 40;
        this.t2y = y + 29;
        this.t3x = x + 86;
        this.t3y = y - 17;
        this.rx = x + 18;
        this.ry = y - 42;
        this.rwidth = 44;
        this.rheight = 30;
        this.color = color(207, 201, 33);
        break;
    }
  }

  drawArrow() {
    fill(this.color);
    triangle(this.t1x, this.t1y, this.t2x, this.t2y, this.t3x, this.t3y);
    rect(this.rx, this.ry, this.rwidth, this.rheight);
  }
}

class ArrowPoint {
  constructor(direction, x, y, speed) {
    // Class for the arrows flying up to the top of the screen during game play.
    this.x = x;
    this.y = y;

    this.direction = direction;

    switch (this.direction) {
      case "left":
        this.t1x = x;
        this.t1y = y;
        this.t2x = x;
        this.t2y = y + 80;
        this.t3x = x - 40;
        this.t3y = y + 40;
        this.rx = x;
        this.ry = y + 20;
        this.rwidth = 28;
        this.rheight = 40;
        this.color = color(224, 255, 225);
        break;
      case "right":
        this.t1x = x;
        this.t1y = y;
        this.t2x = x;
        this.t2y = y + 80;
        this.t3x = x + 40;
        this.t3y = y + 40;
        this.rx = x - 28;
        this.ry = y + 20;
        this.rwidth = 28;
        this.rheight = 40;
        this.color = color(255, 227, 224);
        break;
      case "up":
        this.t1x = x;
        this.t1y = y;
        this.t2x = x + 40;
        this.t2y = y - 40;
        this.t3x = x + 80;
        this.t3y = y;
        this.rx = x + 20;
        this.ry = y - 3;
        this.rwidth = 40;
        this.rheight = 28;
        this.color = color(212, 228, 255);
        break;
      case "down":
        this.t1x = x;
        this.t1y = y - 15;
        this.t2x = x + 40;
        this.t2y = y + 25;
        this.t3x = x + 80;
        this.t3y = y - 15;
        this.rx = x + 20;
        this.ry = y - 39;
        this.rwidth = 40;
        this.rheight = 28;
        this.color = color(255, 253, 186);
        break;
    }

    this.speed = speed;
  }

  drawArrow() {
    fill(this.color);
    triangle(this.t1x, this.t1y, this.t2x, this.t2y, this.t3x, this.t3y);
    rect(this.rx, this.ry, this.rwidth, this.rheight);
  }

  moveUp() {
    this.y -= this.speed;
    this.updateY();
  }

  resetY(start) {
    this.y = start;
    this.updateY();
  }

  isTooHigh() {
    // Checks if the arrow has reached the top of the screen
    switch (this.direction) {
      case "left":
      case "right":
        return this.y <= 30;
      case "up":
      case "down":
        return this.y <= 70;
    }
    return false;
  }

  updateY() {
    switch (this.direction) {
      case "left":
        this.t1y = this.y;
        this.t2y = this.y + 80;
        this.t3y = this.y + 40;
        this.ry = this.y + 20;
        break;
      case "right":
        this.t1y = this.y;
        this.t2y = this.y + 80;
        this.t3y = this.y + 40;
        this.ry = this.y + 20;
        break;
      case "up":
        if (this.y == 600) this.y = 650;
        this.t1y = this.y;
        this.t2y = this.y - 40;
        this.t3y = this.y;
        this.ry = this.y;
        break;
      case "down":
        if (this.y == 600) this.y = 650;
        this.t1y = this.y - 15;
        this.t2y = this.y + 25;
        this.t3y = this.y - 15;
        this.ry = this.y - 40;
        break;
    }
  }
}

class EnterStatus {
  constructor(text, score, color) {
    // Class for the point levels for scoring. See constructors in script.js
    this.text = text;
    this.score = score;
    this.color = color;
    this.count = 0;
  }

  getText() {
    return this.text;
  }

  getScore() {
    return this.score;
  }

  getColor() {
    return this.color;
  }

  getCount() {
    return this.count;
  }

  addCount() {
    this.count += 1;
  }
}
