import { defineEventHandler, createEventStream } from 'h3';
import { getSmartEntities } from '../../util/smart-entities';

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  const interval = setInterval(async () => {
    const smartEntities = await getSmartEntities();
    // TODO can this also be JSON instead of a string?
    await eventStream.push(JSON.stringify(smartEntities));
  }, 5_000);

  eventStream.onClosed(async () => {
    clearInterval(interval);
    await eventStream.close();
  });

  return eventStream.send();
});
