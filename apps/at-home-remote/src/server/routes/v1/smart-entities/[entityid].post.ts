import { defineEventHandler, getRouterParam, readBody } from 'h3';
import { createLog } from '../../../../util/log';

const log = createLog('v1/smart-entities/[id]');

export default defineEventHandler(async (event) => {
  log(event.toString());

  const id = getRouterParam(event, 'entityid');
  const body = await readBody(event);
  log(id ?? '', 'BODY', body);

  const HOMEASSISTANT_BASE_URL = process.env['HOMEASSISTANT_BASE_URL'];
  const HOMEASSISTANT_TOKEN = process.env['HOMEASSISTANT_TOKEN'];
  // const HOMEASSISTANT_SWITCHES_ID = process.env['HOMEASSISTANT_SWITCHES_ID'];
  const HOMEASSISTANT_WRITABLE_SWITCH_IDS =
    process.env['HOMEASSISTANT_WRITABLE_SWITCH_IDS'];
  const writableSwitchIds = HOMEASSISTANT_WRITABLE_SWITCH_IDS?.split(',') ?? [];

  if (!id || !writableSwitchIds.includes(id)) {
    throw new Error('Invalid entity ID');
  }

  const url = `${HOMEASSISTANT_BASE_URL}/api/services/light/turn_${body.state.toLowerCase()}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
      },
      body: JSON.stringify({
        entity_id: id,
      }),
    });

    log('RESPONSE', response.status.toString(), response.statusText, url);

    const data = await response.json();
    log('RESPONSE DATA', data);
    // const data = (await response.json()) as {
    //   attributes: { entity_id: string[] };
    // };

    // return entities;

    return {};
  } catch (err) {
    log('toggle error:', err as string);
    return 'Error';
  }

  return {};
});
