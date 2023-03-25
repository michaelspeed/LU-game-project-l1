export default class StickMan {
  constructor(x, y, color, height, jumpDelta, walkDelta) {
    this.x = x;
    this.color = color;
    this.y = y;
    this.height = height
    this.walkDelta = walkDelta
    this.jumpDelta = jumpDelta
  }

  // Renders while standing
  render(x, y, color) {
    this.color = color ? color : this.color;

    // body parts
    const stickManHeadDiameter = this.height * 0.2;
    const stickManHeadRadius = stickManHeadDiameter / 2;
    const stickManBodyHeight = (this.height - stickManHeadDiameter) * 0.4;
    const stickManLegHeight = this.height - stickManHeadDiameter - stickManBodyHeight;

    const stickManLegWidth = stickManHeadDiameter * 0.5;
    const stickManArmWidth = stickManHeadDiameter * 0.75;
    const stickManArmHeight = stickManHeadDiameter * 1.8;
    const stickManNeckLength = stickManHeadDiameter * 0.3;

    const stickManheadX = x ?? this.x;
    const stickManheadY = (y ?? this.y) - this.height + stickManHeadRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(stickManheadX, stickManheadY, stickManHeadDiameter);
    stroke(0);

    // body
    line(stickManheadX, stickManheadY + stickManHeadRadius, stickManheadX, stickManheadY + stickManHeadRadius + stickManBodyHeight);

    // arms
    const shoulderY = stickManheadY + stickManHeadRadius + stickManNeckLength;
    line(stickManheadX, shoulderY, stickManheadX - stickManArmWidth, shoulderY + stickManArmHeight);
    line(stickManheadX, shoulderY, stickManheadX + stickManArmWidth, shoulderY + stickManArmHeight);

    // legs
    const legY = stickManheadY + stickManHeadRadius + stickManBodyHeight;
    line(stickManheadX, legY, stickManheadX - stickManLegWidth, legY + stickManLegHeight);
    line(stickManheadX, legY, stickManheadX + stickManLegWidth, legY + stickManLegHeight);
    pop();
  }

  // Renders while jumping
  renderJumpForward(x, y, color) {
    this.color = color ? color : this.color;

    // body parts
    const stickManHeadDiameter = this.height * 0.2;
    const stickManHeadRadius = stickManHeadDiameter / 2;
    const stickManBodyHeight = (this.height - stickManHeadDiameter) * 0.4;
    const stickManLegHeight = this.height - stickManHeadDiameter - stickManBodyHeight;

    const stickManLegWidth = stickManHeadDiameter * 0.5;
    const stickManArmWidth = stickManHeadDiameter * 0.75;
    const stickManArmHeight = stickManHeadDiameter * 1.8;
    const stickManNeckLength = stickManHeadDiameter * 0.3;

    const stickManheadX = x ?? this.x;
    const stickManheadY = (y ?? this.y) - this.height + stickManHeadRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(stickManheadX, stickManheadY, stickManHeadDiameter);
    stroke(0);

    // body
    line(stickManheadX, stickManheadY + stickManHeadRadius, stickManheadX, stickManheadY + stickManHeadRadius + stickManBodyHeight);

    // arms
    const shoulderY = stickManheadY + stickManHeadRadius + stickManNeckLength;
    line(stickManheadX, shoulderY, stickManheadX - stickManArmWidth, shoulderY + stickManArmHeight);
    line(stickManheadX, shoulderY, stickManheadX + stickManArmWidth, shoulderY + stickManArmHeight);

    // legs
    const legY = stickManheadY + stickManHeadRadius + stickManBodyHeight;
    line(stickManheadX, legY, stickManheadX - stickManLegWidth, legY + stickManLegHeight);
    line(stickManheadX, legY, stickManheadX + stickManLegWidth, legY + stickManLegHeight);
    pop();
  }

  // Renders while walking left
  renderWalkLeft(x, y, color) {
    this.color = color ? color : this.color;
    const stickManHeadDiameter = this.height * 0.2;
    const stickManHeadRadius = stickManHeadDiameter / 2;
    const stickManBodyHeight = (this.height - stickManHeadDiameter) * 0.4;
    const stickManLegHeight = this.height - stickManHeadDiameter - stickManBodyHeight;

    const stickManLegWidth = stickManHeadDiameter * 0.5;
    const stickManArmWidth = stickManHeadDiameter * 0.75;
    const stickManArmHeight = stickManHeadDiameter * 1.8;
    const stickManNeckLength = stickManHeadDiameter * 0.3;

    const stickManheadX = x ?? this.x;
    const stickManheadY = (y ?? this.y) - this.height + stickManHeadRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(stickManheadX, stickManheadY, stickManHeadDiameter);
    stroke(0);

    // body
    line(stickManheadX, stickManheadY + stickManHeadRadius, stickManheadX, stickManheadY + stickManHeadRadius + stickManBodyHeight);

    // arms
    const shoulderY = stickManheadY + stickManHeadRadius + stickManNeckLength;
    line(stickManheadX, shoulderY, stickManheadX - stickManArmWidth - this.walkDelta, shoulderY + stickManArmHeight - this.walkDelta);
    line(stickManheadX, shoulderY, stickManheadX + stickManArmWidth, shoulderY + stickManArmHeight);

    // legs
    const legY = stickManheadY + stickManHeadRadius + stickManBodyHeight;
    line(stickManheadX, legY, stickManheadX - stickManLegWidth - this.walkDelta, legY + stickManLegHeight);
    line(stickManheadX, legY, stickManheadX + stickManLegWidth, legY + stickManLegHeight);
    pop();
  }

  // Renders while walking right
  renderWalkRight(x, y, color) {
    this.color = color ? color : this.color;
    const stickManHeadDiameter = this.height * 0.2;
    const stickManHeadRadius = stickManHeadDiameter / 2;
    const stickManBodyHeight = (this.height - stickManHeadDiameter) * 0.4;
    const stickManLegHeight = this.height - stickManHeadDiameter - stickManBodyHeight;

    const stickManLegWidth = stickManHeadDiameter * 0.5;
    const stickManArmWidth = stickManHeadDiameter * 0.75;
    const stickManArmHeight = stickManHeadDiameter * 1.8;
    const stickManNeckLength = stickManHeadDiameter * 0.3;

    const stickManheadX = x ?? this.x;
    const stickManheadY = (y ?? this.y) - this.height + stickManHeadRadius;

    // draw the stickman
    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(stickManheadX, stickManheadY, stickManHeadDiameter);
    stroke(0);

    // body
    line(stickManheadX, stickManheadY + stickManHeadRadius, stickManheadX, stickManheadY + stickManHeadRadius + stickManBodyHeight);

    // arms
    const shoulderY = stickManheadY + stickManHeadRadius + stickManNeckLength;
    line(stickManheadX, shoulderY, stickManheadX - stickManArmWidth, shoulderY + stickManArmHeight);
    line(stickManheadX, shoulderY, stickManheadX + stickManArmWidth + this.walkDelta, shoulderY + stickManArmHeight);

    // legs
    const legY = stickManheadY + stickManHeadRadius + stickManBodyHeight;
    line(stickManheadX, legY, stickManheadX - stickManLegWidth, legY + stickManLegHeight);
    line(stickManheadX, legY, stickManheadX + stickManLegWidth + this.walkDelta, legY + stickManLegHeight);
    pop();
  }

  // Renders while jumping right
  renderJumpToRight(x, y, color) {
    this.color = color ? color : this.color;
    const stickManHeadDiameter = this.height * 0.2;
    const stickManHeadRadius = stickManHeadDiameter / 2;
    const stickManBodyHeight = (this.height - stickManHeadDiameter) * 0.4;
    const stickManLegHeight = this.height - stickManHeadDiameter - stickManBodyHeight;

    const stickManLegWidth = stickManHeadDiameter * 0.5;
    const stickManArmWidth = stickManHeadDiameter * 0.75;
    const stickManArmHeight = stickManHeadDiameter * 1.8;
    const stickManNeckLength = stickManHeadDiameter * 0.3;

    const stickManheadX = (x ?? this.x);
    const stickManheadY = (y ?? this.y) - this.height + stickManHeadRadius;

    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(stickManheadX, stickManheadY, stickManHeadDiameter);
    stroke(0);

    // body
    line(stickManheadX, stickManheadY + stickManHeadRadius, stickManheadX, stickManheadY + stickManHeadRadius + stickManBodyHeight);

    // arms
    const shoulderY = stickManheadY + stickManHeadRadius + stickManNeckLength;
    line(stickManheadX, shoulderY, stickManheadX - stickManArmWidth, shoulderY + stickManArmHeight);
    line(stickManheadX, shoulderY, stickManheadX + stickManArmWidth + this.walkDelta, shoulderY + stickManArmHeight);

    // legs
    const legY = stickManheadY + stickManHeadRadius + stickManBodyHeight;
    line(stickManheadX, legY, stickManheadX - stickManLegWidth, legY + stickManLegHeight);
    line(stickManheadX, legY, stickManheadX + stickManLegWidth + this.walkDelta, legY + stickManLegHeight);
    pop();
  }

  // Renders while jumping left
  renderJumpToLeft(x, y, color) {
    this.color = color ? color : this.color;
    const stickManHeadDiameter = this.height * 0.2;
    const stickManHeadRadius = stickManHeadDiameter / 2;
    const stickManBodyHeight = (this.height - stickManHeadDiameter) * 0.4;
    const stickManLegHeight = this.height - stickManHeadDiameter - stickManBodyHeight;

    const stickManLegWidth = stickManHeadDiameter * 0.5;
    const stickManArmWidth = stickManHeadDiameter * 0.75;
    const stickManArmHeight = stickManHeadDiameter * 1.8;
    const stickManNeckLength = stickManHeadDiameter * 0.3;

    const stickManheadX = (x ?? this.x);
    const stickManheadY = (y ?? this.y) - this.height + stickManHeadRadius;

    push();
    fill(this.color);
    strokeWeight(3);

    // head
    circle(stickManheadX, stickManheadY, stickManHeadDiameter);
    stroke(0);

    // body
    line(stickManheadX, stickManheadY + stickManHeadRadius, stickManheadX, stickManheadY + stickManHeadRadius + stickManBodyHeight);

    // arms
    const shoulderY = stickManheadY + stickManHeadRadius + stickManNeckLength;
    line(stickManheadX, shoulderY, stickManheadX - stickManArmWidth - this.walkDelta, shoulderY + stickManArmHeight - this.walkDelta);
    line(stickManheadX, shoulderY, stickManheadX + stickManArmWidth, shoulderY + stickManArmHeight);

    // legs
    const legY = stickManheadY + stickManHeadRadius + stickManBodyHeight;
    line(stickManheadX, legY, stickManheadX - stickManLegWidth - this.walkDelta , legY + stickManLegHeight - this.walkDelta);
    line(stickManheadX, legY, stickManheadX + stickManLegWidth, legY + stickManLegHeight);
    pop();
  }
}
