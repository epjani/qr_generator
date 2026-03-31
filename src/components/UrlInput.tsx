import { generateRandomUrl } from '../utils/randomPhrases';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function UrlInput({ value, onChange }: Props) {
  const isInvalid = value.length > 0 && !isValidUrl(value);

  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
        URL
      </label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com"
        className={`w-full border rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isInvalid ? 'border-amber-400' : 'border-gray-200'
        }`}
      />
      {isInvalid && (
        <p className="text-xs text-amber-500 mt-1">
          This doesn't look like a valid URL
        </p>
      )}
      <button
        onClick={() => onChange(generateRandomUrl())}
        className="mt-2 px-3.5 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-200 transition-colors"
      >
        Generate Random
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
