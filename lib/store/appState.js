export default {
  gameChar_x: 0,
  gameChar_y: 0,
  floorPos_y: 0,

  characterState: {
    isLeft: false,
    isRight: false,
    isFalling: false,
    isPlummeting:false,
  },

  collectables: [],
  canyons: [],
  trees_x: [],
  clouds: [],
  mountains: [],
  platforms: [],

  cameraPosX: 0,

  game_score: 0,

  flagpole: {x_pos: 100, isReached: false},

  lives: 3,

  finished: false,
  gameOver: false,
}
