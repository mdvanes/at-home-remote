import { defineEventHandler } from 'h3';
import type { HomesecPanelResponse } from '../../../../util/types';
import { createLog } from '../../../../util/log';
import { homeSecFetch } from '../../../../util/homeSecFetch';
import { ModesResponse } from '@at-home-remote/components';

const log = createLog('v1/homesec/state');

// Dev mode: curl http://localhost:4200/api/v1/homesec/state
// Docker compose: curl -k https://username:password@localhost:3044/api/v1/homesec/state
export default defineEventHandler(async (event): Promise<ModesResponse> => {
  log(event.toString());

  try {
    const response = await homeSecFetch<HomesecPanelResponse>(
      '/action/panelCondGet',
      log
    );

    return { mode: response.updates.mode_a1 };
  } catch (err) {
    log(err as string);
    return { mode: 'Error' };
  }
});
