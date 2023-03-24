import appState from "./appState.js";

export default {
  INIT_APPLICATION(state, payload) {
    state = {...appState, ...payload}
    return state;
  }
}
