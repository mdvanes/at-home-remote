import { defineEventHandler } from 'h3';
import { createLog } from '../../../../../util/log';
import { challengeUserAgent } from '../../../../../util/challenge';
import {
  PcondformModes,
  type HomesecPanelResponse,
} from '../../../../../util/types';
import { homeSecFetch } from '../../../../../util/homeSecFetch';

const log = createLog('homesec/toggle');

// Dev mode: curl http://localhost:5173/api/webhooks/homesec/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/homesec/toggle
export default defineEventHandler(
  async (event): Promise<HomesecPanelResponse> => {
    log(event.toString());

    challengeUserAgent(log, event.node.req.headers);

    const response = await homeSecFetch<HomesecPanelResponse>(
      '/action/panelCondGet',
      log
    );

    const newMode =
      response.updates.mode_a1 !== 'Disarm'
        ? PcondformModes.Disarm
        : // TODO should be Arm instead of HomeArm
          PcondformModes.HomeArm;

    log('newMode', newMode);
    // TODO probably other response type
    const toggleResponse = await homeSecFetch<HomesecPanelResponse>(
      '/action/panelCondPost',
      log,
      {
        method: 'POST',
        body: JSON.stringify({ area: 1, mode: newMode }),
      }
    );
    return toggleResponse;
  }
);
