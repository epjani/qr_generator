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
    <div className="flex gap-1 p-1 bg-bg-tertiary rounded-lg mb-6">
      {tabs.map(tab => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 cursor-pointer
              ${isActive
                ? 'bg-surface text-fg shadow-sm'
                : 'text-fg-muted hover:text-fg-secondary'
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
