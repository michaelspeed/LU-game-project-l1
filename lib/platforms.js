function platform(x, y, length) {
  return {
    x,
    y,
    length,
    draw: () => {
      fill(178, 34, 34);
      rect(x, y, length, 10);
    }
  }
}

function generatePlatforms(numberOfPlatforms) {
    const platforms = []
    for (let i = 0; i < numberOfPlatforms; i++) {
        const x = random(-6000, 6000)
        const y = random(0, height / 2)
        const length = random(100, 150)
        platforms.push(platform(x, y, length))
    }
    return platforms
}
