import { defineEventHandler, EventHandlerRequest } from 'h3';
import { StateWithWritable } from '@at-home-remote/components';
import { getSmartEntities } from '../../../util/smart-entities';

export default defineEventHandler<
  EventHandlerRequest,
  Promise<StateWithWritable[]>
>(async () => {
  return getSmartEntities();
});
