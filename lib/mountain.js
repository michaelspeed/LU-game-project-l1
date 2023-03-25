export function drawMountains({x, height, appState}) {
  const y = appState.floorPos_y - height
  fill(220);
  triangle(x, y, x + 150, appState.floorPos_y, x - 150, appState.floorPos_y);
  fill(128);
  triangle(x, y, x + 90, appState.floorPos_y, x - 150, appState.floorPos_y);
  fill(200);
  triangle(x + 50, y + 50, x + 150, appState.floorPos_y, x + 80, appState.floorPos_y);
  fill(128);
  triangle(x + 50, y + 50, x, appState.floorPos_y, x + 80, appState.floorPos_y);
}

export function generateMountains(numberOfMountains) {
  const mountains = []
  for (let i = 0; i < numberOfMountains; i++) {
    const x = random(-6000, 6000)
    const height = random(150, 300)
    mountains.push({x, height})
  }
  return mountains
}
