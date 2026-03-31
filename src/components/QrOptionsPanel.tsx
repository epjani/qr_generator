import { useState } from 'react';
import type { QrOptions } from '../types';

interface Props {
  value: QrOptions;
  onChange: (updates: Partial<QrOptions>) => void;
}

export default function QrOptionsPanel({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-border-subtle pt-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-xs font-display font-semibold text-fg-muted uppercase tracking-widest hover:text-neon-purple-light transition-colors cursor-pointer"
      >
        <span
          className={`text-neon-cyan transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        >
          &#9654;
        </span>
        QR Options
        <span className="flex-1 h-px bg-gradient-to-r from-border-subtle to-transparent ml-2" />
      </button>

      {isOpen && (
        <div className="mt-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-display text-fg-dim uppercase tracking-wider block mb-1.5">
                Error Correction
              </label>
              <select
                value={value.errorCorrection}
                onChange={(e) => onChange({ errorCorrection: e.target.value as QrOptions['errorCorrection'] })}
                className="input-retro w-full rounded-lg px-3 py-2 text-sm"
              >
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-display text-fg-dim uppercase tracking-wider block mb-1.5">
                Size: <span className="text-neon-cyan">{value.size}px</span>
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
              <label className="text-xs font-display text-fg-dim uppercase tracking-wider block mb-1.5">
                Foreground
              </label>
              <div className="flex items-center gap-2.5 input-retro rounded-lg px-3 py-2">
                <input
                  type="color"
                  value={value.fgColor}
                  onChange={(e) => onChange({ fgColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer"
                />
                <span className="text-sm text-fg-muted font-mono">{value.fgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-display text-fg-dim uppercase tracking-wider block mb-1.5">
                Background
              </label>
              <div className="flex items-center gap-2.5 input-retro rounded-lg px-3 py-2">
                <input
                  type="color"
                  value={value.bgColor}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer"
                />
                <span className="text-sm text-fg-muted font-mono">{value.bgColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-display text-fg-dim uppercase tracking-wider block mb-1.5">
              Margin: <span className="text-neon-cyan">{value.margin}</span>
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
