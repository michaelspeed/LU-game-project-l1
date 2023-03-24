import {INIT_APPLICATION} from "./types.js";

export default {
  initApp(context, payload) {
    context.commit(INIT_APPLICATION, payload);
  }
}
