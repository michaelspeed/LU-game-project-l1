function drawClouds({x, y}) {
  fill(255);
  ellipse(x,y,150,50);
  ellipse(x - 50,y + 25,50,30);
  ellipse(x + 50,y + 15,50,30);
}
