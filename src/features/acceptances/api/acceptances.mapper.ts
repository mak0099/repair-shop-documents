// features/acceptances/api/acceptances.mapper.ts

import { Acceptance } from "../types/acceptance";

export const acceptanceMapper = {
  toUI(server: Acceptance): Acceptance {
    return {
      ...server,
    };
  },

  toServer(ui: Acceptance): Acceptance {
    return {
      ...ui,
    };
  },
};
