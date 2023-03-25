import {commit} from "./store/appState.js";

export function drawLives(appState){
  fill(255, 0, 0)
  noStroke()
  textSize(20)
  text(`Lives: ${appState.lives}`, 20, 60)
}

export function checkLives(appState){
  if (appState.isPlummeting) {
    commit(appState, {lives: appState - 1})
  }
  if (appState.lives <= 0) {
    commit(appState, {isGameOver: true})
  }
}
