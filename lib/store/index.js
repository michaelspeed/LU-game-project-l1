import Store from "./store.js";
import state from "./appState.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

export default new Store({
  state,
  actions,
  mutations,
})
