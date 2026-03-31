import type { ContentType } from '../types';

const tabs: { value: ContentType; label: string; icon: string }[] = [
  { value: 'text', label: 'Text', icon: 'T' },
  { value: 'url', label: 'URL', icon: '/' },
  { value: 'wifi', label: 'WiFi', icon: 'W' },
];

interface Props {
  active: ContentType;
  onChange: (type: ContentType) => void;
}

export default function ContentTypeTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map(tab => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`
              relative flex items-center gap-2 px-4 py-2.5 text-sm font-display font-semibold uppercase tracking-wider
              rounded-lg border transition-all duration-200 cursor-pointer
              ${isActive
                ? 'bg-neon-purple/20 border-neon-purple text-neon-purple-light neon-border shadow-[0_0_15px_rgba(124,58,237,0.2)]'
                : 'bg-transparent border-border-subtle text-fg-muted hover:border-neon-purple/40 hover:text-fg hover:bg-neon-purple/5'
              }
            `}
          >
            <span className={`
              w-6 h-6 flex items-center justify-center rounded text-xs font-bold font-mono
              ${isActive ? 'bg-neon-purple text-white' : 'bg-card-elevated text-fg-dim'}
            `}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
