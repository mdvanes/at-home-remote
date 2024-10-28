export type PanelModes = 'Disarm' | 'Home Arm 1' | 'Full Arm';

export type Modes = PanelModes | 'Error';

export type ModesResponse = {
  mode: Modes;
};
