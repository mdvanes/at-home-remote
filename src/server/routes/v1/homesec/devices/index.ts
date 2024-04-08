import { defineEventHandler, createError } from 'h3';
import type { HomesecDevicesResponse } from '../../../../../util/types';
import { createLog } from '../../../../../util/log';

const log = createLog('v1/homesec/toggle');

// http://localhost:5173/api/v1/homesec/devices
export default defineEventHandler(
  async (event): Promise<HomesecDevicesResponse> => {
    log(event.toString());

    const HOMESEC_URI = process.env['HOMESEC_URI'];
    const HOMESEC_USER = process.env['HOMESEC_USER'];
    const HOMESEC_PASS = process.env['HOMESEC_PASS'];

    try {
      const url = `${HOMESEC_URI}/action/deviceListGet`;

      const headers = new Headers();
      headers.set(
        'Authorization',
        'Basic ' +
          Buffer.from(HOMESEC_USER + ':' + HOMESEC_PASS).toString('base64')
      );

      const response: HomesecDevicesResponse = await (
        await fetch(url, { headers })
      ).json();
      console.log(response);

      //   const response1: HomesecPanelResponse = await got(
      //       `${this.baseUrl}/action/panelCondGet`,
      //       {
      //           username: this.username,
      //           password: this.password,
      //       }
      //   ).json();
      //   this.logger.log(response1);

      //   const response: HomesecDevicesResponse = await got(url, {
      //       username: this.username,
      //       password: this.password,
      //   }).json();
      //   // TODO this.logger.log(response);
      return response;
    } catch (err) {
      console.log(err);
      //   this.logger.error(err);
      //   throw new HttpException(
      //       "failed to receive downstream data",
      //       HttpStatus.INTERNAL_SERVER_ERROR
      //   );
      // throw new Error('Internal server error');
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid downstream response',
      });
    }
  }
);
