import { defineEventHandler } from 'h3';
import { createLog } from '../../../../util/log';
import { challengeUserAgent } from '../../../../util/challenge';

const log = createLog('switches/toggle');

// Dev mode: curl http://localhost:4200/api/webhooks/switches/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/switches/toggle
export default defineEventHandler(async (event) => {
  log(event.toString());

  const DOMOTICZ_URI = process.env['DOMOTICZ_URI'];
  const DOMOTICZ_SWITCH_ID = process.env['DOMOTICZ_SWITCH_ID'];
  const DOMOTICZ_DUMMY_SWITCH_ID = process.env['DOMOTICZ_DUMMY_SWITCH_ID'];
  console.log('DOMOTICZ_URI', DOMOTICZ_URI);

  //   log(
  //     'user agent header:',
  //     ALLOW_USER_AGENT ?? 'undefined',
  //     event.node.req.headers['user-agent'] ?? ''
  //   );

  //   if (
  //     ALLOW_USER_AGENT &&
  //     ALLOW_USER_AGENT !== event.node.req.headers['user-agent']
  //   ) {
  //     throw new Error('Invalid User Agent');
  //   }
  challengeUserAgent(log, event.node.req.headers);

  //   log(
  //     'origin:',
  //     (event.node.req.headers.origin ?? '').toString(),
  //     typeof event.node.req.headers.origin
  //   );

  const newState = 'Toggle';
  const switchType = 'switchlight';
  const targetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_SWITCH_ID}&switchcmd=${newState}`;
  const dummyTargetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_DUMMY_SWITCH_ID}&switchcmd=${newState}`;
  try {
    const response = await (await fetch(targetUri)).json();
    log('RESPONSE', response);
    const dummyResponse = await (await fetch(dummyTargetUri)).json();
    log('DUMMY RESPONSE', dummyResponse);
  } catch (err) {
    log('ERROR', (err as Error).message);
  }

  return { message: 'Toggle!' };
});
