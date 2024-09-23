import { defineEventHandler } from 'h3';
import type { HomesecDevicesResponse } from '../../../../../util/types';
import { createLog } from '../../../../../util/log';
import { homeSecFetch } from '../../../../../util/homeSecFetch';

const log = createLog('v1/homesec/devices');

// Dev mode: curl http://localhost:5173/api/v1/homesec/devices
// Docker compose: curl -k https://username:password@localhost:3044/api/v1/homesec/devices
export default defineEventHandler(
  async (event): Promise<HomesecDevicesResponse> => {
    log(event.toString());

    const response = await homeSecFetch<HomesecDevicesResponse>(
      '/action/deviceListGet',
      log
    );

    return response;
  }
);
