import {commit} from "./store/appState.js";

export function characterIsFalling(state, platforms) {
  if (state.floorPos_y > state.gameChar_y) {
    const filterPlatforms = platforms.filter(platform => platform.checkIfIsAtTop(state.gameChar_y, state.gameChar_x))
    if (filterPlatforms.length > 0) {
        commit(state, {isFalling: false, gameChar_y: filterPlatforms[0].y})
    }
    if (state.floorPos_y === state.gameChar_y + 2) {
      commit(state, {isFalling: false, gameChar_y: state.floorPos_y})
    } else {
      commit(state, {gameChar_y: state.gameChar_y + 2})
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

export function resetMovement(state) {
  commit(state, {isLeft: false, isRight: false})
}

export function moveLeft(state, walkDelta) {
  if (state.gameChar_y !== state.floorPos_y) {
    const filterPlatforms = state.platforms.filter(platform => {
      const standingOnPlatform = platform.checkIfIsAtTop(state.gameChar_y, state.gameChar_x)
      if (standingOnPlatform) {
        return platform
      }
    })
    if (filterPlatforms.length === 0) {
      commit(state, {isFalling: true})
    } else {
      commit(state, {gameChar_x: state.gameChar_x - walkDelta, cameraPosX: state.cameraPosX - walkDelta})
    }
  } else {
    commit(state, {gameChar_x: state.gameChar_x - walkDelta, cameraPosX: state.cameraPosX - walkDelta})
  }
}

export function moveRight(state, walkDelta) {
  if (state.gameChar_y !== state.floorPos_y) {
    const filterPlatforms = state.platforms.filter(platform => {
      const standingOnPlatform = platform.checkIfIsAtTop(state.gameChar_y, state.gameChar_x)
      if (standingOnPlatform) {
        return platform
      }
    })
    if (filterPlatforms.length === 0) {
      commit(state, {isFalling: true})
    } else {
      commit(state, {gameChar_x: state.gameChar_x + walkDelta, cameraPosX: state.cameraPosX + walkDelta})
    }
  } else {
    commit(state, {gameChar_x: state.gameChar_x + walkDelta, cameraPosX: state.cameraPosX + walkDelta})
  }
}
