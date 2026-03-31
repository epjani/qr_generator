import { useState } from 'react';
import type { QrOptions } from '../types';

interface Props {
  value: QrOptions;
  onChange: (updates: Partial<QrOptions>) => void;
}

export default function QrOptionsPanel({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 transition-colors"
      >
        <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>
          ▶
        </span>
        QR Options
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Error Correction</label>
              <select
                value={value.errorCorrection}
                onChange={(e) => onChange({ errorCorrection: e.target.value as QrOptions['errorCorrection'] })}
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Size: {value.size}px
              </label>
              <input
                type="range"
                min={128}
                max={512}
                step={8}
                value={value.size}
                onChange={(e) => onChange({ size: Number(e.target.value) })}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Foreground</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2.5 py-1.5 bg-gray-50">
                <input
                  type="color"
                  value={value.fgColor}
                  onChange={(e) => onChange({ fgColor: e.target.value })}
                  className="w-5 h-5 rounded border-0 cursor-pointer"
                />
                <span className="text-sm text-gray-800">{value.fgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Background</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2.5 py-1.5 bg-gray-50">
                <input
                  type="color"
                  value={value.bgColor}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-5 h-5 rounded border-0 cursor-pointer"
                />
                <span className="text-sm text-gray-800">{value.bgColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Margin: {value.margin}
            </label>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={value.margin}
              onChange={(e) => onChange({ margin: Number(e.target.value) })}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
