import { State, StateWithWritable } from '@at-home-remote/components';

export const getSmartEntities = async (): Promise<StateWithWritable[]> => {
  const HOMEASSISTANT_BASE_URL = process.env['HOMEASSISTANT_BASE_URL'];
  const HOMEASSISTANT_TOKEN = process.env['HOMEASSISTANT_TOKEN'];
  const HOMEASSISTANT_SWITCHES_ID = process.env['HOMEASSISTANT_SWITCHES_ID'];
  const HOMEASSISTANT_KRONABY_SWITCH_ID =
    process.env['HOMEASSISTANT_KRONABY_SWITCH_ID'];

  const url = `${HOMEASSISTANT_BASE_URL}/api/states/${HOMEASSISTANT_SWITCHES_ID}`;

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
    //   const x: SmartEntity[] = data.attributes.entity_id.map((id) => ({
    //     id: 1,
    //     name: id,
    //   }));
    //   console.log('data', x);

    const response1 = await fetch(`${HOMEASSISTANT_BASE_URL}/api/states`, {
      headers: {
        Authorization: `Bearer ${HOMEASSISTANT_TOKEN}`,
      },
    });
    const allHaStates = (await response1.json()) as State[];
    const entities = allHaStates
      .filter((state) => listOfIdsResponse.includes(state.entity_id!))
      .map((state) => ({
        ...state,
        writable: state.entity_id === HOMEASSISTANT_KRONABY_SWITCH_ID,
      }));

    return entities;
    // log('RESPONSE', response);
    //   const dummyResponse = await (await fetch(dummyTargetUri)).json();
    // log('DUMMY RESPONSE', dummyResponse);
  } catch (err) {
    console.error(err);
    // log('ERROR', (err as Error).message);
    return [];
  }
};
