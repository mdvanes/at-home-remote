import { defineEventHandler } from 'h3';
import { appendFileSync } from 'node:fs';

const log = (...msg: string[]): void => {
  try {
    console.log(...msg);
    const timestamp = new Date().toISOString();
    const fileMsg = [`\n[${timestamp}]`, ...msg];
    appendFileSync('data/log.txt', fileMsg.join('\t'));
  } catch (err) {
    console.log(err);
  }
};

// http://localhost:5173/api/webhooks/homesec/toggle
export default defineEventHandler((event) => {
  log(event.toString());

  log('headers:', JSON.stringify(event.node.req.headers, null, 2));
  log(
    'origin:',
    (event.node.req.headers.origin ?? '').toString(),
    typeof event.node.req.headers.origin
  );
  // @ ts-ignore
  //console.log(event.node.req.client);
  return { message: 'Toggle!' };
});

// TODO try out security measures here!
// HTTPS
// Compare origin / IP / mac address?
