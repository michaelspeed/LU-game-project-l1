import {commit} from "./store/appState.js";
import {drawLives} from "./lives.js";

// draw score
export function drawGameStates(appState) {
  if (appState.lives <= 0) {
    commit(appState, {gameOver: true})
    rect(appState.gameChar_x - 100, appState.gameChar_y - 100, 500, 100)
    fill(0, 192, 255)
    textSize(20)
    text(`Score ${appState.game_score}`, appState.gameChar_x, appState.gameChar_y - 80)
    textSize(50)
    text(`Game Over`, appState.gameChar_x, appState.gameChar_y - 20)
    restart()
  }

  if (appState.finished) {
    fill(124,255,0)
    textSize(50)
    rect(appState.gameChar_x - 100, appState.gameChar_y - 100, 500, 100)
    fill(0, 192, 255)
    text(`You Won!`, appState.gameChar_x, appState.gameChar_y - 20)
    restart()
  }
}

// show the restart button
export function restart() {
  const checkIfRestartButtonExists = document.getElementById('restart')
  if (checkIfRestartButtonExists) {
    return
  }
  const newElement = document.createElement('button')
  newElement.innerText = 'Restart'
  newElement.id = 'restart'
  newElement.addEventListener('click', () => {
    window.location.reload()
  })
  document.body.appendChild(newElement)
}

// draw score board
export function drawScoreBoard(appState) {
  rect(15, 10, 100, 55)
  drawLives(appState)
  drawGameScore(appState.game_score)
}

// draw score
export function drawGameScore(game_score) {
  fill(255)
  noStroke()
  textSize(20)
  text(`Score: ${game_score}`, 20, 30)
}

// check if game has won
export function checkIfGameHasWon(appState, sounds) {
  if (appState.flagpole.isReached && appState.game_score === 10) {
    if (!appState.finished) {
      sounds.finished.play()
      commit(appState, {finished: true})
    }
  }
}
