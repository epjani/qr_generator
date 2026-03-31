export interface WifiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface QrOptions {
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  fgColor: string;
  bgColor: string;
  margin: number;
  size: number;
}

export type ContentType = 'text' | 'url' | 'wifi';

export interface QrState {
  contentType: ContentType;
  text: string;
  url: string;
  wifi: WifiConfig;
  options: QrOptions;
}

export interface HistoryEntry {
  id: string;
  label: string;
  contentType: ContentType;
  state: QrState;
  timestamp: number;
  thumbnail: string;
}

export const DEFAULT_STATE: QrState = {
  contentType: 'text',
  text: '',
  url: '',
  wifi: {
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  },
  options: {
    errorCorrection: 'M',
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    margin: 4,
    size: 256,
  },
};
