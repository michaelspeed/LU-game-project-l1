function drawCanyon({x_pos, width}) {
  let deltaDiff = 220
  let alphaDiff = 10
  fill(0, 255, 0);
  quad(x_pos, 432, x_pos + width, 432, x_pos + width + deltaDiff, 1024,  x_pos - deltaDiff, 1024);
  fill(100, 120, 255);
  quad(x_pos + 10, 432, x_pos + width - 10, 432, x_pos + width + deltaDiff, 1024, x_pos - deltaDiff, 1024);
  fill(100, 155, 255);
  quad(x_pos, 432, x_pos + width, 432, x_pos + width - alphaDiff, 440, x_pos + alphaDiff, 440);
}

function generateCanyons(numberOfCanyons) {
    const canyons = []
    for (let i = 0; i < numberOfCanyons; i++) {
        const x_pos = random(200, 6000)
        const width = random(100, 200)
        canyons.push({x_pos, width})
    }
    return canyons
}
