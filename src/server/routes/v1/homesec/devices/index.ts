import { defineEventHandler } from 'h3';

// http://localhost:5173/api/v1/homesec/devices
export default defineEventHandler(async () => {
  console.log(`GET to /api/v1/homesec/devices`);

  // this.logger.verbose(`[${req.user.name}] GET to /api/homesec/devices`);

  const baseUrl = 'baseUrl';
  const username = 'username';
  const password = 'password';

  try {
    const url = `${baseUrl}/action/deviceListGet`;

    const headers = new Headers();
    headers.set(
      'Authorization',
      'Basic ' + Buffer.from(username + ':' + password).toString('base64')
    );

    const x = await (await fetch(url, { headers })).json();
    console.log(x);

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
    //   return response;
  } catch (err) {
    console.log(err);
    //   this.logger.error(err);
    //   throw new HttpException(
    //       "failed to receive downstream data",
    //       HttpStatus.INTERNAL_SERVER_ERROR
    //   );
  }

  return { message: 'Devices!' };
});
