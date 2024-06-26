import { ILog } from './log';
import { createError } from 'h3';

export const challengeUserAgent = (
  log: ILog,
  headers: {
    'user-agent'?: string;
  }
): boolean => {
  const ALLOW_USER_AGENT = process.env['ALLOW_USER_AGENT'];
  const userAgentHeader = headers['user-agent'];

  log(
    'user agent header:',
    ALLOW_USER_AGENT ?? 'undefined',
    userAgentHeader ?? ''
  );

  if (ALLOW_USER_AGENT && ALLOW_USER_AGENT !== userAgentHeader) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid User Agent' });
  }

  return true;
};
