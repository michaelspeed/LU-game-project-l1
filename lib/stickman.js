class StickMan {
  constructor(x, y, color, height) {
    this.x = x;
    this.color = color;
    this.y = y;
    this.height = height
  }

  // Renders while standing
  render(x, y, color) {
    this.color = color ? color : this.color;

    // compute the dimensions of the body parts
    const headDiameter = this.height * 0.2;
    const headRadius = headDiameter / 2;
    const bodyHeight = (this.height - headDiameter) * 0.4;
    const legHeight = this.height - headDiameter - bodyHeight;

    const legWidth = headDiameter * 0.5;
    const armWidth = headDiameter * 0.75;
    const armHeight = headDiameter * 1.8;
    const neckLength = headDiameter * 0.3;

    const headX = x ?? this.x;
    const headY = (y ?? this.y) - this.height + headRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(headX, headY, headDiameter);
    stroke(0);

    // body
    line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

    // arms
    const shoulderY = headY + headRadius + neckLength;
    line(headX, shoulderY, headX - armWidth, shoulderY + armHeight);
    line(headX, shoulderY, headX + armWidth, shoulderY + armHeight);

    // legs
    const legY = headY + headRadius + bodyHeight;
    line(headX, legY, headX - legWidth, legY + legHeight);
    line(headX, legY, headX + legWidth, legY + legHeight);
    pop();
  }

  // Renders while jumping
  renderJumpForward(x, y, color) {
    this.color = color ? color : this.color;

    // compute the dimensions of the body parts
    const headDiameter = this.height * 0.2;
    const headRadius = headDiameter / 2;
    const bodyHeight = (this.height - headDiameter) * 0.4;
    const legHeight = this.height - headDiameter - bodyHeight;

    const legWidth = headDiameter * 0.5;
    const armWidth = headDiameter * 0.75;
    const armHeight = headDiameter * 1.8;
    const neckLength = headDiameter * 0.3;

    const headX = x ?? this.x;
    const headY = (y ?? this.y) - this.height + headRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(headX, headY, headDiameter);
    stroke(0);

    // body
    line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

    // arms
    const shoulderY = headY + headRadius + neckLength;
    line(headX, shoulderY, headX - armWidth - jumpDelta, shoulderY + armHeight - jumpDelta);
    line(headX, shoulderY, headX + armWidth + jumpDelta, shoulderY + armHeight - jumpDelta);

    // legs
    const legY = headY + headRadius + bodyHeight;
    line(headX, legY, headX - legWidth - jumpDelta, legY + legHeight - jumpDelta);
    line(headX, legY, headX + legWidth + jumpDelta, legY + legHeight - jumpDelta);
    pop();
  }

  // Renders while walking left
  renderWalkLeft(x, y, color) {
    this.color = color ? color : this.color;

    // compute the dimensions of the body parts
    const headDiameter = this.height * 0.2;
    const headRadius = headDiameter / 2;
    const bodyHeight = (this.height - headDiameter) * 0.4;
    const legHeight = this.height - headDiameter - bodyHeight;

    const legWidth = headDiameter * 0.5;
    const armWidth = headDiameter * 0.75;
    const armHeight = headDiameter * 1.8;
    const neckLength = headDiameter * 0.3;

    const headX = x ?? this.x;
    const headY = this.y - this.height + headRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(headX, headY, headDiameter);
    stroke(0);

    // body
    line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

    // arms
    const shoulderY = headY + headRadius + neckLength;
    line(headX, shoulderY, headX - armWidth - walkDelta, shoulderY + armHeight - walkDelta);
    line(headX, shoulderY, headX + armWidth, shoulderY + armHeight);

    // legs
    const legY = headY + headRadius + bodyHeight;
    line(headX, legY, headX - legWidth - walkDelta, legY + legHeight);
    line(headX, legY, headX + legWidth, legY + legHeight);
    pop();
  }

  // Renders while walking right
  renderWalkRight(x, y, color) {
    this.color = color ? color : this.color;
    const headDiameter = this.height * 0.2;
    const headRadius = headDiameter / 2;
    const bodyHeight = (this.height - headDiameter) * 0.4;
    const legHeight = this.height - headDiameter - bodyHeight;

    const legWidth = headDiameter * 0.5;
    const armWidth = headDiameter * 0.75;
    const armHeight = headDiameter * 1.8;
    const neckLength = headDiameter * 0.3;

    const headX = x ?? this.x;
    const headY = (y ?? this.y) - this.height + headRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(headX, headY, headDiameter);
    stroke(0);

    // body
    line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

    // arms
    const shoulderY = headY + headRadius + neckLength;
    line(headX, shoulderY, headX - armWidth, shoulderY + armHeight);
    line(headX, shoulderY, headX + armWidth + walkDelta, shoulderY + armHeight);

    // legs
    const legY = headY + headRadius + bodyHeight;
    line(headX, legY, headX - legWidth, legY + legHeight);
    line(headX, legY, headX + legWidth + walkDelta, legY + legHeight);
    pop();
  }

  // Renders while jumping right
  renderJumpToRight(x, y, color) {
    this.color = color ? color : this.color;
    const headDiameter = this.height * 0.2;
    const headRadius = headDiameter / 2;
    const bodyHeight = (this.height - headDiameter) * 0.4;
    const legHeight = this.height - headDiameter - bodyHeight;

    const legWidth = headDiameter * 0.5;
    const armWidth = headDiameter * 0.75;
    const armHeight = headDiameter * 1.8;
    const neckLength = headDiameter * 0.3;

    const headX = (x ?? this.x);
    const headY = (y ?? this.y) - this.height + headRadius;

    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(headX, headY, headDiameter);
    stroke(0);

    // body
    line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

    // arms
    const shoulderY = headY + headRadius + neckLength;
    line(headX, shoulderY, headX - armWidth - jumpDelta, shoulderY + armHeight - jumpDelta);
    line(headX, shoulderY, headX + armWidth, shoulderY + armHeight);

    // legs
    const legY = headY + headRadius + bodyHeight;
    line(headX, legY, headX - legWidth - jumpDelta + walkDelta, legY + legHeight - jumpDelta - walkDelta);
    line(headX, legY, headX + legWidth + jumpDelta - walkDelta, legY + legHeight - jumpDelta + walkDelta);
    pop();
  }

  // Renders while jumping left
  renderJumpToLeft(x, y, color) {
    this.color = color ? color : this.color;
    const headDiameter = this.height * 0.2;
    const headRadius = headDiameter / 2;
    const bodyHeight = (this.height - headDiameter) * 0.4;
    const legHeight = this.height - headDiameter - bodyHeight;

    const legWidth = headDiameter * 0.5;
    const armWidth = headDiameter * 0.75;
    const armHeight = headDiameter * 1.8;
    const neckLength = headDiameter * 0.3;

    const headX = (x ?? this.x);
    const headY = (y ?? this.y) - this.height + headRadius;

    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(headX, headY, headDiameter);
    stroke(0);

    // body
    line(headX, headY + headRadius, headX, headY + headRadius + bodyHeight);

    // arms
    const shoulderY = headY + headRadius + neckLength;
    line(headX, shoulderY, headX - armWidth, shoulderY + armHeight);
    line(headX, shoulderY, headX + armWidth + jumpDelta, shoulderY + armHeight - jumpDelta);

    // legs
    const legY = headY + headRadius + bodyHeight;
    line(headX, legY, headX - legWidth - walkDelta , legY + legHeight - walkDelta);
    line(headX, legY, headX + legWidth + jumpDelta - walkDelta, legY + legHeight - jumpDelta - walkDelta);
    pop();
  }
}
