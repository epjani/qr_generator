import { generateRandomPhrase } from '../utils/randomPhrases';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-display font-semibold text-neon-purple-light uppercase tracking-widest">
          Content
        </label>
        <span className="text-xs font-mono text-fg-dim">
          {value.length} <span className="text-neon-cyan/50">chars</span>
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="> Enter text for QR code..."
        rows={4}
        className="input-retro w-full rounded-lg px-4 py-3 text-sm resize-none"
      />
      <button
        onClick={() => onChange(generateRandomPhrase())}
        className="btn-neon mt-3 px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider bg-card-elevated border border-border-subtle rounded-lg text-neon-cyan hover:border-neon-cyan/40 hover:shadow-[0_0_10px_rgba(0,255,255,0.15)] transition-all cursor-pointer"
      >
        Randomize
      </button>
    </div>
  );
}
