import type { ContentType } from '../types';

const tabs: { value: ContentType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'url', label: 'URL' },
  { value: 'wifi', label: 'WiFi' },
];

interface Props {
  active: ContentType;
  onChange: (type: ContentType) => void;
}

export default function ContentTypeTabs({ active, onChange }: Props) {
  return (
    <div className="flex border-b-2 border-gray-100 mb-5">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 text-sm font-semibold -mb-[2px] transition-colors ${
            active === tab.value
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
