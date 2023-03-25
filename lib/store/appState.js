import {generateClouds} from "../clouds.js";
import {generateMountains} from "../mountain.js";
import {generateTrees} from "../tree.js";
import {generateCollectables} from "../collectable.js";
import {generatePlatforms} from "../platforms.js";
import {generateEnemies} from "../enemy.js";

export default {
  gameChar_x: 0,
  gameChar_y: 0,
  floorPos_y: 0,

  isLeft: false,
  isRight: false,
  isFalling: false,
  isPlummeting:false,
  isJumping: false,
  jumpState: {
    initial: 0,
    final: 1,
  },

  collectables: [],
  canyons: [],
  trees_x: [],
  clouds: [],
  mountains: [],
  platforms: [],
  enemies: [],

  cameraPosX: 0,

  game_score: 0,

  flagpole: {x_pos: 100, isReached: false},

  lives: 3,

  finished: false,
  gameOver: false,
}

export function initApplication(appState, jumpDelta) {
  const floorPos_y = height * 3 / 4;
  const clouds = generateClouds(100)
  const mountains = generateMountains(30)
  const trees = generateTrees(60)
  const collectables = generateCollectables(50, floorPos_y)
  const platforms = generatePlatforms(50, collectables, jumpDelta, floorPos_y)
  const enemies = generateEnemies(30, floorPos_y)
  return {
    ...appState,
    clouds,
    mountains,
    trees_x: trees,
    collectables,
    platforms,
    floorPos_y: floorPos_y,
    gameChar_x: width / 2,
    gameChar_y: height * 3 / 4,
    enemies,
  }
}

export function dispatcher(target, p, newValue, receiver) {
  target[p] = newValue
  return true
}

export function commit(targetObject, payload) {
  return Object.assign(targetObject, payload)
}
