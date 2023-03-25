import {commit} from "./store/appState.js";

export function characterIsFalling(state, platforms) {
  if (state.isJumping) {
    commit(state, {isJumping: false})
  }
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

  if (state.floorPos_y < state.gameChar_y && !state.isPlummeting) {
    commit(state, {isFalling: false, isPlummeting: true})
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

export function characterIsPlummeting(state) {
  commit(state, {isFalling: false, gameChar_y: state.gameChar_y + 2})
  if (state.gameChar_y > height) {
    // reset the game
    commit(state, {isLeft: false, isRight: false, isFalling: false, isPlummeting: false, gameChar_y: state.floorPos_y, gameChar_x: width/2, cameraPosX: 0})
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
      commit(state, {isFalling: true, gameChar_x: state.gameChar_x - walkDelta, cameraPosX: state.cameraPosX - walkDelta})
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
      commit(state, {isFalling: true, gameChar_x: state.gameChar_x + walkDelta, cameraPosX: state.cameraPosX + walkDelta})
    } else {
      commit(state, {gameChar_x: state.gameChar_x + walkDelta, cameraPosX: state.cameraPosX + walkDelta})
    }
  } else {
    commit(state, {gameChar_x: state.gameChar_x + walkDelta, cameraPosX: state.cameraPosX + walkDelta})
  }
}

export function movements(state, stickman, walkDelta) {
  if(state.isLeft && state.isFalling) {
    // add your jumping-left code
    stickman.renderJumpToLeft(state.gameChar_x, state.gameChar_y, 'red')

  } else if(state.isRight && state.isFalling) {
    // add your jumping-right code
    stickman.renderJumpToRight(state.gameChar_x, state.gameChar_y, 'red')

  } else if(state.isLeft) {
    stickman.renderWalkLeft(state.gameChar_x, state.gameChar_y, 'blue', walkDelta)

  } else if(state.isRight) {
    // add your walking right code
    stickman.renderWalkRight(state.gameChar_x, state.gameChar_y, 'blue')

  } else if(state.isFalling || state.isPlummeting) {
    // add your jumping facing forwards code
    stickman.renderJumpForward(state.gameChar_x, state.gameChar_y, 'red')

  } else {
    // add your standing front facing code
    stickman.render(state.gameChar_x, state.gameChar_y, 'blue')
  }
}
