export function drawGameStates(appState) {
  if (appState.lives <= 0) {
    textSize(50)
    text(`Game Over`, 500, 100)
  }

  if (appState.finished) {
    fill(124,255,0)
    textSize(50)
    text(`You Won!`, 500, 100)
  }
}

export function drawGameScore(game_score) {
  fill(255)
  noStroke()
  textSize(20)
  text(`Score: ${game_score}`, 20, 30)
}

export function checkIfGameHasWon(appState) {
  if (appState.flagpole.isReached && appState.game_score === 3) {
    appState.gameState.finished = true
  }
}
