import { ILog } from './log';
import { createError } from 'h3';

export const homeSecFetch = async <T>(
  path: string,
  log: ILog,
  init?: RequestInit
): Promise<T> => {
  const logId = `homeSecFetch [${path}]:`;
  const HOMESEC_URI = process.env['HOMESEC_URI'];
  const HOMESEC_USER = process.env['HOMESEC_USER'];
  const HOMESEC_PASS = process.env['HOMESEC_PASS'];

  try {
    const url = `${HOMESEC_URI}${path}`;

    const headers = new Headers();
    headers.set(
      'Authorization',
      'Basic ' +
        Buffer.from(HOMESEC_USER + ':' + HOMESEC_PASS).toString('base64')
    );

    const response: T = await (await fetch(url, { ...init, headers })).json();
    log(logId, JSON.stringify(response, null, 2));

    return response;
  } catch (err) {
    log(logId, err as string);

    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid downstream response',
    });
  }
};
