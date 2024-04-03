interface SensorRow {
  area: number;
  zone: number;
  type: number;
  type_f:
    | 'Door Contact'
    | 'Smoke Detector'
    | 'Keypad'
    | 'IR'
    | 'Remote Controller';
  name: string;
  cond: '';
  cond_ok: '0' | '1';
  battery: '';
  battery_ok: '0' | '1';
  tamper: '';
  tamper_ok: '0' | '1';
  bypass: 'No' | 'Yes';
  temp_bypass: '0' | '1';
  rssi: string; // "Strong, 9";
  status: '' | 'Door Close' | 'Door Open';
  id: string;
  su: number;
}

export interface HomesecDevicesResponse {
  senrows: SensorRow[];
}
