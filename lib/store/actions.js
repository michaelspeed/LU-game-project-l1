import {INIT_APPLICATION} from "./types.js";

export default {
  initApp(context, payload) {
    context.setter(INIT_APPLICATION, payload);
  }
}
