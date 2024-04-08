import { defineEventHandler } from 'h3';
import { createLog } from '../../../../../util/log';
import { challengeUserAgent } from '../../../../../util/challenge';

const log = createLog('homesec/toggle');

// Dev mode: curl http://localhost:5173/api/webhooks/homesec/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/homesec/toggle
export default defineEventHandler(async (event) => {
  log(event.toString());

  const DOMOTICZ_URI = process.env['DOMOTICZ_URI'];
  const DOMOTICZ_SWITCH_ID = process.env['DOMOTICZ_SWITCH_ID'];
  console.log('DOMOTICZ_URI', DOMOTICZ_URI);

  challengeUserAgent(log, event.node.req.headers);

  log(
    'origin:',
    (event.node.req.headers.origin ?? '').toString(),
    typeof event.node.req.headers.origin
  );

  const newState = 'Toggle';
  const switchType = 'switchlight';
  const targetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_SWITCH_ID}&switchcmd=${newState}`;
  try {
    const response = await (await fetch(targetUri)).json();
    log('RESPONSE', response);
  } catch (err) {
    log('ERROR', (err as Error).message);
  }

  return { message: 'Toggle!' };
});
