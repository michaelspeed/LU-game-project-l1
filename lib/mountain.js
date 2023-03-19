function drawMountains({x, height}) {
  const y = floorPos_y - height
  fill(220);
  triangle(x, y, x + 150, floorPos_y, x - 150, floorPos_y);
  fill(128);
  triangle(x, y, x + 90, floorPos_y, x - 150, floorPos_y);
  fill(200);
  triangle(x + 50, y + 50, x + 150, floorPos_y, x + 80, floorPos_y);
  fill(128);
  triangle(x + 50, y + 50, x, floorPos_y, x + 80, floorPos_y);
}
