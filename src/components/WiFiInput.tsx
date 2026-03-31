import { useState } from 'react';
import { WifiConfig } from '../types';

interface Props {
  value: WifiConfig;
  onChange: (updates: Partial<WifiConfig>) => void;
}

export default function WiFiInput({ value, onChange }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
          Network Name (SSID)
        </label>
        <input
          type="text"
          value={value.ssid}
          onChange={(e) => onChange({ ssid: e.target.value })}
          placeholder="MyNetwork"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={value.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder="Enter password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-16 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
          Encryption
        </label>
        <select
          value={value.encryption}
          onChange={(e) => onChange({ encryption: e.target.value as WifiConfig['encryption'] })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value.hidden}
          onChange={(e) => onChange({ hidden: e.target.checked })}
          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">Hidden network</span>
      </label>
    </div>
  );
}
