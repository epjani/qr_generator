import { useState } from 'react';
import type { WifiConfig } from '../types';

interface Props {
  value: WifiConfig;
  onChange: (updates: Partial<WifiConfig>) => void;
}

export default function WiFiInput({ value, onChange }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-display font-semibold text-neon-purple-light uppercase tracking-widest block mb-2">
          Network Name (SSID)
        </label>
        <input
          type="text"
          value={value.ssid}
          onChange={(e) => onChange({ ssid: e.target.value })}
          placeholder="> MyNetwork"
          className="input-retro w-full rounded-lg px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-display font-semibold text-neon-purple-light uppercase tracking-widest block mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={value.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder="> Enter password"
            className="input-retro w-full rounded-lg px-4 py-3 pr-20 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-display font-semibold uppercase tracking-wider text-neon-cyan hover:text-neon-cyan/80 transition-colors cursor-pointer"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-display font-semibold text-neon-purple-light uppercase tracking-widest block mb-2">
          Encryption
        </label>
        <select
          value={value.encryption}
          onChange={(e) => onChange({ encryption: e.target.value as WifiConfig['encryption'] })}
          className="input-retro w-full rounded-lg px-4 py-3 text-sm"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </div>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={value.hidden}
          onChange={(e) => onChange({ hidden: e.target.checked })}
          className="w-4 h-4 rounded border-border-subtle"
        />
        <span className="text-sm text-fg-muted group-hover:text-fg transition-colors">
          Hidden network
        </span>
      </label>
    </div>
  );
}
