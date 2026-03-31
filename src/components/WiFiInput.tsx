import { useState } from 'react';
import type { WifiConfig } from '../types';

interface Props {
  value: WifiConfig;
  onChange: (updates: Partial<WifiConfig>) => void;
}

export default function WiFiInput({ value, onChange }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-fg block mb-1.5">
          Network Name (SSID)
        </label>
        <input
          type="text"
          value={value.ssid}
          onChange={(e) => onChange({ ssid: e.target.value })}
          placeholder="MyNetwork"
          className="input-field w-full rounded-lg px-3.5 py-2.5 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-fg block mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={value.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder="Enter password"
            className="input-field w-full rounded-lg px-3.5 py-2.5 pr-16 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-medium text-primary hover:text-primary-hover transition-colors cursor-pointer"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-fg block mb-1.5">
          Encryption
        </label>
        <select
          value={value.encryption}
          onChange={(e) => onChange({ encryption: e.target.value as WifiConfig['encryption'] })}
          className="input-field w-full rounded-lg px-3.5 py-2.5 text-sm"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer group">
        <input
          type="checkbox"
          checked={value.hidden}
          onChange={(e) => onChange({ hidden: e.target.checked })}
          className="w-4 h-4 rounded"
        />
        <span className="text-sm text-fg-secondary group-hover:text-fg transition-colors">
          Hidden network
        </span>
      </label>
    </div>
  );
}
