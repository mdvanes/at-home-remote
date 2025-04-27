import { defineEventHandler, createEventStream } from 'h3';
import { getSmartEntities } from '../../../../util/smart-entities';

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  // It seems SSE needs these headers, and maybe SSL. But h3 SSE support is experimental. So use long polling as a fallback.
  // header("X-Accel-Buffering: no");
  // header("Content-Type: text/event-stream");
  // header("Cache-Control: no-cache");

  const interval = setInterval(async () => {
    const smartEntities = await getSmartEntities();
    // TODO data must be string, but it is possible to send different events over the same eventStream, e.g.:
    // import { defineEventHandler, createEventStream, EventStreamMessage } from 'h3';
    // eventStream.push({ event: 'smart-entities', data: '' } as EventStreamMessage);
    // eventStream.push({ event: 'home-sec', data: '' } as EventStreamMessage);
    await eventStream.push(JSON.stringify(smartEntities));
  }, 5_000);

  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });

  return eventStream.send();
});
