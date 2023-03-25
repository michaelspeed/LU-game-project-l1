export function platform(x, y, length) {
  return {
    x,
    y,
    length,
    draw: () => {
      fill(178, 34, 34);
      rect(x, y, length, 10);
    },
    checkIfIsAtTop: (gameChar_y, gameChar_x) => {
      return (y - gameChar_y < 5) && (y + 5 ) > gameChar_y && gameChar_x > x && gameChar_x < x + length;
    }
  }
}

export function generatePlatforms(numberOfPlatforms, collectables, jumpDelta, floorPos_y) {
  const platforms = []

  const collectablesUnreachable = collectables.filter(collectable => {
    const distanceFromFloor = floorPos_y - collectable.y_pos
    return distanceFromFloor > jumpDelta
  })

  for (const collectable of collectablesUnreachable) {
    const numberOfPlatforms = parseInt(((floorPos_y - collectable.y_pos) / (jumpDelta - 20)).toString())
    for (let i = 1; i < numberOfPlatforms; i++) {
        const x = collectable.x_pos - (100 * i)
        const y = floorPos_y - ((jumpDelta - 20) * i)
        const length = random(100, 150)
        platforms.push(platform(x, y, length))
    }
  }

  for (let i = 0; i < numberOfPlatforms - collectablesUnreachable.length; i++) {
    const x = random(-6000, 6000)
    const y = random(0, height / 2)
    const length = random(100, 150)
    platforms.push(platform(x, y, length))

  }
  return platforms
}
