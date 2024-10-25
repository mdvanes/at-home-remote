import { defineEventHandler } from 'h3';
import { createLog } from '../../../../util/log';
import { challengeUserAgent } from '../../../../util/challenge';

const log = createLog('switches/toggle');

// Dev mode: curl http://localhost:4200/api/webhooks/switches/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/switches/toggle
export default defineEventHandler(async (event) => {
  // `[${req.user.name}] POST to /smart-entities/${entityId} with state: ${args.state}`
  log(event.toString());

  const HOMEASSISTANT_BASE_URL = process.env['HOMEASSISTANT_BASE_URL'];
  const HOMEASSISTANT_TOKEN = process.env['HOMEASSISTANT_TOKEN'];
  const HOMEASSISTANT_KRONABY_SWITCH_ID =
    process.env['HOMEASSISTANT_KRONABY_SWITCH_ID'] ?? '';
  console.log('HOMEASSISTANT_BASE_URL', HOMEASSISTANT_BASE_URL);

  challengeUserAgent(log, event.node.req.headers);

  //   log(
  //     'origin:',
  //     (event.node.req.headers.origin ?? '').toString(),
  //     typeof event.node.req.headers.origin
  //   );

  //   const newState = 'Toggle';
  //   const switchType = 'switchlight';
  //   const targetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_SWITCH_ID}&switchcmd=${newState}`;
  //   const dummyTargetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_DUMMY_SWITCH_ID}&switchcmd=${newState}`;
  try {
    const [entityType] = HOMEASSISTANT_KRONABY_SWITCH_ID.split('.');
    const pathType = entityType === 'light' ? 'light' : 'switch';
    // const body: PostServicesDomainServiceBody = { entity_id: HOMEASSISTANT_KRONABY_SWITCH_ID };
    const body = { entity_id: HOMEASSISTANT_KRONABY_SWITCH_ID };

    const response = await fetch(
      //   `${HOMEASSISTANT_BASE_URL}/api/services/${pathType}/turn_${args.state.toLowerCase()}`,
      `${HOMEASSISTANT_BASE_URL}/api/services/${pathType}/toggle`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
        },
        body: JSON.stringify(body),
      }
    );
    // (await response.json()) as PostServicesDomainServiceResponse;
    const data = await response.json();

    // const response = await (await fetch(targetUri)).json();
    log('RESPONSE DATA', data);
    // const dummyResponse = await (await fetch(dummyTargetUri)).json();
    // log('DUMMY RESPONSE', dummyResponse);
    return { state: data[0].state };
  } catch (err) {
    log('ERROR', (err as Error).message);
  }

  return { message: 'Toggle!' };
});
