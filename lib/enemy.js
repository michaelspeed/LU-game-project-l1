// draw enemy
export function enemy(x, y, length) {
  const range = 100;
  let currentX = x;
  let movement = 1;
  const draw = () => {
    update()
    fill(128, 0, 0);
    ellipse(currentX, y, length, 10);
  }
  const update = () => {
    currentX += movement;
    if (currentX >= x + range) {
      movement = -1;
    } else if (currentX <= x - range) {
      movement = 1;
    }
  }
  const contact = (gameChar_x, gameChar_y, sounds) => {
    const isInContact = dist(gameChar_x, gameChar_y, currentX, y) < length / 2
    if (isInContact) {
      sounds.hit.play()
    }
    return isInContact
  }
  return {
    draw,
    update,
    contact
  }
}

// generate enemies
export function generateEnemies(numberOfEnemies, floorPos_y) {
  const enemies = []
  for (let i = 0; i < numberOfEnemies / 2; i++) {
    const x = random(500, 6000)
    const y = floorPos_y
    const length = random(10, 14)
    enemies.push(enemy(x, y, length))
  }
  for (let i = 0; i < numberOfEnemies / 2; i++) {
    const x = random(-6000, -500)
    const y = floorPos_y
    const length = random(10, 14)
    enemies.push(enemy(x, y, length))
  }
  return enemies
}
