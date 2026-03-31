import { generateRandomUrl } from '../utils/randomPhrases';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function UrlInput({ value, onChange }: Props) {
  const isInvalid = value.length > 0 && !isValidUrl(value);

  return (
    <div>
      <label className="text-sm font-medium text-fg block mb-1.5">
        URL
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com"
        className={`input-field w-full rounded-lg px-3.5 py-2.5 text-sm ${
          isInvalid ? 'border-error focus:border-error focus:ring-error/10' : ''
        }`}
      />
      {isInvalid && (
        <p className="text-xs text-error mt-1.5">
          Please enter a valid URL
        </p>
      )}
      <button
        onClick={() => onChange(generateRandomUrl())}
        className="mt-3 px-3.5 py-2 text-xs font-medium text-primary hover:text-primary-hover border border-border rounded-lg hover:bg-primary-light transition-colors cursor-pointer"
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
