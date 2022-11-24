import { gitReleaseSource } from "./utils.js";

export const ACTIONS = {
  TMPL() {
    (async () => {
      await gitReleaseSource();
    })();
  },
};
