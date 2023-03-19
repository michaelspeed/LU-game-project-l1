function drawCollectable({x_pos, y_pos, size, isFound}){
  if (!isFound) {
    fill(255,215, 0);
    ellipse(x_pos, y_pos, size, size);
    fill(100, 155, 255);
    ellipse(x_pos, y_pos, size - 10, size - 10);
  }
}
