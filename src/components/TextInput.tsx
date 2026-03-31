import { generateRandomPhrase } from '../utils/randomPhrases';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-medium text-fg">
          Content
        </label>
        <span className="text-xs text-fg-muted tabular-nums">
          {value.length} chars
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text for QR code..."
        rows={4}
        className="input-field w-full rounded-lg px-3.5 py-2.5 text-sm resize-none"
      />
      <button
        onClick={() => onChange(generateRandomPhrase())}
        className="mt-3 px-3.5 py-2 text-xs font-medium text-primary hover:text-primary-hover border border-border rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
      >
        Randomize
      </button>
    </div>
  );
}
