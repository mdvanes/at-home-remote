export interface State {
  entity_id?: string;
  state?: string;
  attributes?: {
    friendly_name?: string;
    device_class?: 'temperature' | 'humidity';
  };
}
