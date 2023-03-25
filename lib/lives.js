export function drawLives(appState){
  fill(255, 0, 0)
  noStroke()
  textSize(20)
  text(`Lives: ${appState.lives}`, 20, 60)
}

export function checkLives(appState){
  if (appState.isPlummeting) {
    appState.lives -= 1
  }
  if (appState.lives <= 0) {
    appState.isGameOver = true
  }
  return appState
}
