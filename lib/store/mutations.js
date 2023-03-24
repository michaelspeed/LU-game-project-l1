import appState from "./appState.js";
import {generateClouds} from "../clouds.js";
import {generateMountains} from "../mountain.js";

export default {
  INIT_APPLICATION(state, payload) {
    state = {...appState, ...payload}
    state.clouds = generateClouds(100)
    state.mountains = generateMountains(30)
    return state;
  }
}
