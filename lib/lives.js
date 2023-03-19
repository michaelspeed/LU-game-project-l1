function drawLives(){
  fill(255, 0, 0)
  noStroke()
  textSize(20)
  text(`Lives: ${lives}`, 20, 60)
}

function checkLives(){
  if (state.isPlummeting) {
    lives -= 1
  }
  if (lives <= 0) {
    gameState.isGameOver = true
  }
}
