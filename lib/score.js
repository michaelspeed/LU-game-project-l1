function drawGameStates() {
  if (lives <= 0) {
    textSize(50)
    text(`Game Over`, 500, 100)
  }

  if (gameState.finished) {
    fill(124,255,0)
    textSize(50)
    text(`You Won!`, 500, 100)
  }
}

function drawGameScore() {
  fill(255)
  noStroke()
  textSize(20)
  text(`Score: ${game_score}`, 20, 30)
}

function checkIfGameHasWon() {
  if (flagpole.isReached && game_score === 3) {
    gameState.finished = true
  }
}
