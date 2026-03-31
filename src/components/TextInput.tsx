import { generateRandomPhrase } from '../utils/randomPhrases';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Content
        </label>
        <span className="text-xs text-gray-400">
          {value.length} characters
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text for QR code..."
        rows={4}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
      <button
        onClick={() => onChange(generateRandomPhrase())}
        className="mt-2 px-3.5 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-200 transition-colors"
      >
        Generate Random
      </button>
    </div>
  );
}
