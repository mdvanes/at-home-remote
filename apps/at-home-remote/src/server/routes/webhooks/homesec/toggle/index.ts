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

const updateDummySensor = async (state: 'on' | 'off') => {
  const HOMEASSISTANT_BASE_URL = process.env['HOMEASSISTANT_BASE_URL'];
  const HOMEASSISTANT_TOKEN = process.env['HOMEASSISTANT_TOKEN'];
  const HOMEASSISTANT_DUMMY_HOMESEC_ID =
    process.env['HOMEASSISTANT_DUMMY_HOMESEC_ID'];

  const url = `${HOMEASSISTANT_BASE_URL}/api/services/input_boolean/turn_${state}`;

  try {
    const response1 = await fetch(
      `${HOMEASSISTANT_BASE_URL}/api/states/${HOMEASSISTANT_DUMMY_HOMESEC_ID}`,
      {
        headers: {
          Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
        },
      }
    );
    const data1 = await response1.json();
    log('DUMMY RESPONSE', data1);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
      },
      body: JSON.stringify({
        entity_id: HOMEASSISTANT_DUMMY_HOMESEC_ID,
      }),
    });

    log('RESPONSE', url, response.status.toString(), response.statusText);

    const data = await response.json();
    log('RESPONSE DATA', data);

    return {};
  } catch (err) {
    log('toggle error:', err as string);
    return 'Error';
  }
};

// Dev mode: curl http://localhost:4200/api/webhooks/homesec/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/homesec/toggle
export default defineEventHandler(
  async (event): Promise<HomesecPanelPostResponse> => {
    log(event.toString());

    challengeUserAgent(log, event.node.req.headers);

    const response = await homeSecFetch<HomesecPanelResponse>(
      '/action/panelCondGet',
      log
    );

    const HOMESEC_ARM_STATE = process.env['HOMESEC_ARM_STATE'];

    const armState =
      HOMESEC_ARM_STATE === 'HomeArm1'
        ? PcondformModes.HomeArm1
        : PcondformModes.Arm;

    const newMode =
      response.updates.mode_a1 !== 'Disarm' ? PcondformModes.Disarm : armState;

    log('newMode', newMode);

    const toggleResponse = await homeSecFetch<HomesecPanelPostResponse>(
      '/action/panelCondPost',
      log,
      {
        method: 'POST',
        body: `area=1&mode=${newMode}`,
      }
    );

    // To be able to send Notification from Home Assistant
    const newState = newMode === PcondformModes.Disarm ? 'off' : 'on';
    updateDummySensor(newState);

    // const dummyTargetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_DUMMY_HOMESEC_ID}&switchcmd=${newState}`;
    // try {
    //   const dummyResponse = await (await fetch(dummyTargetUri)).json();
    //   log('DUMMY RESPONSE', dummyResponse);
    // } catch (err) {
    //   log('ERROR', (err as Error).message);
    // }

    return toggleResponse;
    // return { result: 1, message: 'Updated successfully.' };
  }
);
