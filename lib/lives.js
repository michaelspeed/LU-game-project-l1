import {commit} from "./store/appState.js";

// draw lives
export function drawLives(appState){
  fill(0, 255, 0)
  noStroke()
  textSize(20)
  text(`Lives: ${appState.lives}`, 20, 60)
}

// check lives for finished
export function checkLives(appState){
  if (appState.lives <= 0) {
    commit(appState, {isGameOver: true})
  }
}
