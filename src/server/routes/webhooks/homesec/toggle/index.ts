import { defineEventHandler } from 'h3';
import { createLog } from '../../../../../util/log';
import { challengeUserAgent } from '../../../../../util/challenge';
import {
  HomesecPanelPostResponse,
  PcondformModes,
  type HomesecPanelResponse,
} from '../../../../../util/types';
import { homeSecFetch } from '../../../../../util/homeSecFetch';

const log = createLog('homesec/toggle');

// Dev mode: curl http://localhost:5173/api/webhooks/homesec/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/homesec/toggle
export default defineEventHandler(
  async (event): Promise<HomesecPanelPostResponse> => {
    log(event.toString());

    challengeUserAgent(log, event.node.req.headers);

    const switchType = 'switchlight';
    const DOMOTICZ_URI = process.env['DOMOTICZ_URI'];
    const DOMOTICZ_DUMMY_HOMESEC_ID = process.env['DOMOTICZ_DUMMY_HOMESEC_ID'];

    const response = await homeSecFetch<HomesecPanelResponse>(
      '/action/panelCondGet',
      log
    );

    const newMode =
      response.updates.mode_a1 !== 'Disarm'
        ? PcondformModes.Disarm
        : PcondformModes.Arm;

    log('newMode', newMode);

    const toggleResponse = await homeSecFetch<HomesecPanelPostResponse>(
      '/action/panelCondPost',
      log,
      {
        method: 'POST',
        body: `area=1&mode=${newMode}`,
      }
    );

    const newState = newMode === PcondformModes.Disarm ? 'Off' : 'On';
    const dummyTargetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_DUMMY_HOMESEC_ID}&switchcmd=${newState}`;
    try {
      const dummyResponse = await (await fetch(dummyTargetUri)).json();
      log('DUMMY RESPONSE', dummyResponse);
    } catch (err) {
      log('ERROR', (err as Error).message);
    }

    return toggleResponse;
  }
);
