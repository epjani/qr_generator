import type { HistoryEntry, QrState } from '../types';

interface Props {
  entries: HistoryEntry[];
  onRestore: (state: QrState) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatTime(ts: number): string {
  const date = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '...' : str;
}

const typeLabels: Record<string, string> = {
  text: 'Text',
  url: 'URL',
  wifi: 'WiFi',
};

export default function HistoryPanel({ entries, onRestore, onRemove, onClear }: Props) {
  if (entries.length === 0) return null;

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-fg">
          History
        </h2>
        <button
          onClick={onClear}
          className="text-xs text-fg-muted hover:text-error transition-colors cursor-pointer"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-2">
        {entries.map(entry => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-bg-secondary transition-colors group"
          >
            <button
              onClick={() => onRestore(entry.state)}
              className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer text-left"
            >
              <img
                src={entry.thumbnail}
                alt=""
                className="w-10 h-10 rounded border border-border flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-fg truncate">
                  {truncate(entry.label, 40)}
                </p>
                <p className="text-xs text-fg-muted">
                  {typeLabels[entry.contentType]} &middot; {formatTime(entry.timestamp)}
                </p>
              </div>
            </button>
            <button
              onClick={() => onRemove(entry.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-fg-muted hover:text-error transition-all cursor-pointer flex-shrink-0"
              aria-label="Remove from history"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
