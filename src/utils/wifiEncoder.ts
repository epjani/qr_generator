import { WifiConfig } from '../types';

export function encodeWifi(config: WifiConfig): string {
  const type = config.encryption;
  const ssid = escapeSpecial(config.ssid);
  const password = escapeSpecial(config.password);
  const hidden = config.hidden ? 'true' : 'false';

  return `WIFI:T:${type};S:${ssid};P:${password};H:${hidden};;`;
}

function escapeSpecial(value: string): string {
  return value.replace(/([\\;,":"])/g, '\\$1');
}
