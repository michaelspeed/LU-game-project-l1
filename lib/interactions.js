import {commit} from "./store/appState.js";

export function characterIsFalling(state, jumpDelta) {
  if (state.floorPos_y > state.gameChar_y) {
    console.log(state.gameChar_y)
    if (state.floorPos_y === state.gameChar_y + 1) {
      commit(state, {isFalling: false, gameChar_y: state.floorPos_y})
    } else {
      commit(state, {gameChar_y: state.gameChar_y + 1})
    }
  }

  if (state.floorPos_y === state.gameChar_y) {
    commit(state, {isFalling: false})
  }
}
export function characterIsJumping(state, jumpDelta) {
  if (state.jumpState.final < state.gameChar_y) {
    commit(state, {gameChar_y: state.gameChar_y - (jumpDelta / 10)})
  }

  if (state.jumpState.final === state.gameChar_y) {
    commit(state, {isJumping: false, isFalling: true})
  }
}
