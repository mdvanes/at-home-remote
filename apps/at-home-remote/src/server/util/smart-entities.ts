import { State, StateWithWritable } from '@at-home-remote/components';
import { createLog } from '../../util/log';

export const getSmartEntities = async (
  path?: string
): Promise<StateWithWritable[] | 'Error'> => {
  const log = createLog(path ?? 'smartEntities');

  const HOMEASSISTANT_BASE_URL = process.env['HOMEASSISTANT_BASE_URL'];
  const HOMEASSISTANT_TOKEN = process.env['HOMEASSISTANT_TOKEN'];
  const HOMEASSISTANT_SWITCHES_ID = process.env['HOMEASSISTANT_SWITCHES_ID'];
  const HOMEASSISTANT_WRITABLE_SWITCH_IDS =
    process.env['HOMEASSISTANT_WRITABLE_SWITCH_IDS'];
  const writableSwitchIds = HOMEASSISTANT_WRITABLE_SWITCH_IDS?.split(',') ?? [];

  const url = `${HOMEASSISTANT_BASE_URL}/api/states/${HOMEASSISTANT_SWITCHES_ID}`;
  const logId = `getSmartEntities [${url}]`;

  log(logId);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
      },
    });
    const data = (await response.json()) as {
      attributes: { entity_id: string[] };
    };
    const listOfIdsResponse = data.attributes.entity_id;

    // log(logId, JSON.stringify(listOfIdsResponse, null, 2));

    const url1 = `${HOMEASSISTANT_BASE_URL}/api/states`;
    const response1 = await fetch(url1, {
      headers: {
        Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
      },
    });
    const allHaStates = (await response1.json()) as State[];
    const entities = allHaStates
      .filter((state) =>
        listOfIdsResponse.includes(state.entity_id ?? 'undefined')
      )
      .map((state) => ({
        ...state,
        writable: Boolean(
          state.entity_id && writableSwitchIds.includes(state.entity_id)
        ),
      }));

    // log(
    //   `getSmartEntities [${url1}]`,
    //   JSON.stringify(
    //     entities.map((en) => `${en.entity_id} => ${en.state}`),
    //     null,
    //     2
    //   )
    // );

    return entities;
  } catch (err) {
    log(logId, err as string);
    return 'Error';
  }
};
