import { generateRandomUrl } from '../utils/randomPhrases';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function UrlInput({ value, onChange }: Props) {
  const isInvalid = value.length > 0 && !isValidUrl(value);

  return (
    <div>
      <label className="text-xs font-display font-semibold text-neon-purple-light uppercase tracking-widest block mb-2">
        URL
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="> https://example.com"
        className={`input-retro w-full rounded-lg px-4 py-3 text-sm ${
          isInvalid ? 'border-neon-pink/60 shadow-[0_0_10px_rgba(255,0,110,0.15)]' : ''
        }`}
      />
      {isInvalid && (
        <p className="text-xs text-neon-pink mt-1.5 font-mono neon-text-pink">
          // ERROR: Invalid URL format
        </p>
      )}
      <button
        onClick={() => onChange(generateRandomUrl())}
        className="btn-neon mt-3 px-4 py-2 text-xs font-display font-semibold uppercase tracking-wider bg-card-elevated border border-border-subtle rounded-lg text-neon-cyan hover:border-neon-cyan/40 hover:shadow-[0_0_10px_rgba(0,255,255,0.15)] transition-all cursor-pointer"
      >
        Randomize
      </button>
    </div>
  );
}

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}
