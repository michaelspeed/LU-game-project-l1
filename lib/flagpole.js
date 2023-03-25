export function drawFlagPole(flagpole, floorPos_y){
  push()
  strokeWeight(5);
  stroke(150);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  noStroke();
  fill(255, 0, 0);
  rect(flagpole.x_pos, floorPos_y - (flagpole.isReached ? 250 : 50), 50, 50);
  pop()
}

export function checkFlagpole(appState){
  if (appState.flagpole.isReached) return
  const d = abs(appState.gameChar_x - appState.flagpole.x_pos)
  if (d < 15) {
    appState.flagpole.isReached = true;
  }
}
