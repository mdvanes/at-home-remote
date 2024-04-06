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

// http://localhost:5173/api/webhooks/homesec/toggle
export default defineEventHandler(async (event) => {
  log(event.toString());
  console.log(process.env['DOMOTICZ_URI']);

  log('headers:', JSON.stringify(event.node.req.headers, null, 2));
  log(
    'origin:',
    (event.node.req.headers.origin ?? '').toString(),
    typeof event.node.req.headers.origin
  );

  const DOMOTICZ_URI = process.env['DOMOTICZ_URI'];
  const DOMOTICZ_SWITCH_ID = process.env['DOMOTICZ_SWITCH_ID'];
  const newState = 'Toggle';
  const switchType = 'switchlight';
  // const newState = state === "on" ? "On" : "Off";
  const targetUri = `${DOMOTICZ_URI}/json.htm?type=command&param=${switchType}&idx=${DOMOTICZ_SWITCH_ID}&switchcmd=${newState}`;
  try {
    const response = await (await fetch(targetUri)).json();
    log('RESPONSE', response);
  } catch (err) {
    log('ERROR', (err as Error).message);
  }

  // @ ts-ignore
  //console.log(event.node.req.client);
  return { message: 'Toggle!' };
});

// TODO try out security measures here!
// HTTPS
// Compare origin / IP / mac address?
