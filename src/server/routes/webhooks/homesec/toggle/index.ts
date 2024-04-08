import { defineEventHandler, createError } from 'h3';
import { createLog } from '../../../../../util/log';
import { challengeUserAgent } from '../../../../../util/challenge';
import {
  PcondformModes,
  type HomesecPanelResponse,
} from '../../../../../util/types';

const log = createLog('homesec/toggle');

// Dev mode: curl http://localhost:5173/api/webhooks/homesec/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/homesec/toggle
export default defineEventHandler(
  async (event): Promise<HomesecPanelResponse> => {
    log(event.toString());

    const HOMESEC_URI = process.env['HOMESEC_URI'];
    const HOMESEC_USER = process.env['HOMESEC_USER'];
    const HOMESEC_PASS = process.env['HOMESEC_PASS'];

    challengeUserAgent(log, event.node.req.headers);

    try {
      const url = `${HOMESEC_URI}/action/panelCondGet`;

      const headers = new Headers();
      headers.set(
        'Authorization',
        'Basic ' +
          Buffer.from(HOMESEC_USER + ':' + HOMESEC_PASS).toString('base64')
      );

      const response: HomesecPanelResponse = await (
        await fetch(url, { headers })
      ).json();
      log(JSON.stringify(response, null, 2));

      const togglePostUrl = `${HOMESEC_URI}/action/panelCondPost`;
      const newMode =
        response.updates.mode_a1 !== 'Disarm'
          ? PcondformModes.Disarm
          : // TODO should be Arm instead of HomeArm
            PcondformModes.HomeArm;

      log('newMode', newMode);

      // TODO probably other response type
      // const toggleResponse: HomesecPanelResponse = await (
      //   await fetch(url, {
      //     headers,
      //     method: 'POST',
      //     body: JSON.stringify({ area: 1, mode: newMode }),
      //   })
      // ).json();
      // log(JSON.stringify(response, null, 2));

      return response;
    } catch (err) {
      console.log(err);

      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid downstream response',
      });
    }

    // const newState = 'Toggle';
    // const switchType = 'switchlight';
    // const targetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_SWITCH_ID}&switchcmd=${newState}`;
    // try {
    //   const response = await (await fetch(targetUri)).json();
    //   log('RESPONSE', response);
    // } catch (err) {
    //   log('ERROR', (err as Error).message);
    // }

    // return { message: 'Toggle!' };
  }
);
