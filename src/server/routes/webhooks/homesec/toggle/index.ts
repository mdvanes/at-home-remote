import { defineEventHandler } from 'h3';
import { appendFileSync } from 'node:fs';

const log = (...msg: string[]): void => {
  try {
    const timestamp = new Date().toISOString();
    const newMsg = [`\n[${timestamp}]`, ...msg];
    console.log(...newMsg);
    appendFileSync('data/log.txt', newMsg.join('\t'));
  } catch (err) {
    console.log(err);
  }
};

// Dev mode: curl http://localhost:5173/api/webhooks/homesec/toggle
// Docker compose: curl -k https://username:password@localhost:3044/api/webhooks/homesec/toggle
export default defineEventHandler(async (event) => {
  log(event.toString());

  const ALLOW_USER_AGENT = process.env['ALLOW_USER_AGENT'];
  const DOMOTICZ_URI = process.env['DOMOTICZ_URI'];
  const DOMOTICZ_SWITCH_ID = process.env['DOMOTICZ_SWITCH_ID'];
  console.log('DOMOTICZ_URI', DOMOTICZ_URI);

  log(
    'user agent header:',
    ALLOW_USER_AGENT ?? 'undefined',
    event.node.req.headers['user-agent'] ?? ''
  );

  if (
    ALLOW_USER_AGENT &&
    ALLOW_USER_AGENT !== event.node.req.headers['user-agent']
  ) {
    throw new Error('Invalid User Agent');
  }

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

// TODO try out security measures here!
// HTTPS
// Compare user-agent
// Test Basic Authentication
