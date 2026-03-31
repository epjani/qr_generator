import { useState } from 'react';
import type { QrOptions } from '../types';

interface Props {
  value: QrOptions;
  onChange: (updates: Partial<QrOptions>) => void;
}

export default function QrOptionsPanel({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-border pt-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-fg-secondary hover:text-fg transition-colors cursor-pointer"
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        Options
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-fg-secondary block mb-1.5">
                Error Correction
              </label>
              <select
                value={value.errorCorrection}
                onChange={(e) => onChange({ errorCorrection: e.target.value as QrOptions['errorCorrection'] })}
                className="input-field w-full rounded-lg px-3 py-2 text-sm"
              >
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-fg-secondary block mb-1.5">
                Size: <span className="text-fg tabular-nums">{value.size}px</span>
              </label>
              <input
                type="range"
                min={128}
                max={512}
                step={8}
                value={value.size}
                onChange={(e) => onChange({ size: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-fg-secondary block mb-1.5">
                Foreground
              </label>
              <div className="flex items-center gap-2.5 input-field rounded-lg px-3 py-2">
                <input
                  type="color"
                  value={value.fgColor}
                  onChange={(e) => onChange({ fgColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer"
                />
                <span className="text-sm text-fg-secondary tabular-nums">{value.fgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-fg-secondary block mb-1.5">
                Background
              </label>
              <div className="flex items-center gap-2.5 input-field rounded-lg px-3 py-2">
                <input
                  type="color"
                  value={value.bgColor}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer"
                />
                <span className="text-sm text-fg-secondary tabular-nums">{value.bgColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-fg-secondary block mb-1.5">
              Margin: <span className="text-fg tabular-nums">{value.margin}</span>
            </label>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={value.margin}
              onChange={(e) => onChange({ margin: Number(e.target.value) })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
