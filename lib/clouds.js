// draw clouds
export function drawClouds({x, y}) {
  fill(255);
  ellipse(x,y,150,50);
  ellipse(x - 50,y + 25,50,30);
  ellipse(x + 50,y + 15,50,30);
  ellipse(x + 20,y - 20,50,30);
}

// generate clouds
export function generateClouds(numClouds) {
  const clouds = []
  for (let i = 0; i < numClouds; i++) {
    clouds.push({
      x: random(-6000, 6000),
      y: random(0, height / 3)
    })
  }
  return clouds
}
