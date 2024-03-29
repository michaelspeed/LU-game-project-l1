// draw collectable
export function drawCollectable({x_pos, y_pos, size, isFound}){
  if (!isFound) {
    fill(255,215, 0);
    ellipse(x_pos, y_pos, size, size);
    fill(100, 155, 255);
    ellipse(x_pos, y_pos, size - 10, size - 10);
  }
}

// generate collectables
export function generateCollectables(numberOfCollectables, floorPos_y) {
    const collectables = []
    for (let i = 0; i < numberOfCollectables; i++) {
        const x_pos = random(-6000, 6000)
        const y_pos = random(100, floorPos_y)
        const size = 30
        collectables.push({x_pos, y_pos, size, isFound: false})
    }
    return collectables
}
