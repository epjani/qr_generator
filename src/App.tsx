import { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ContentPanel from './components/ContentPanel';
import PreviewPanel from './components/PreviewPanel';
import HistoryPanel from './components/HistoryPanel';
import type { QrState, HistoryEntry } from './types';
import { DEFAULT_STATE } from './types';
import { encodeWifi } from './utils/wifiEncoder';
import { loadHistory, saveEntry, removeEntry, clearHistory } from './utils/history';

function getLabel(state: QrState): string {
  switch (state.contentType) {
    case 'text':
      return state.text || '';
    case 'url':
      return state.url || '';
    case 'wifi':
      return state.wifi.ssid || '';
  }
}

function getQrValue(state: QrState): string {
  switch (state.contentType) {
    case 'text':
      return state.text;
    case 'url':
      return state.url;
    case 'wifi':
      return encodeWifi(state.wifi);
  }
}

function getThumbnail(canvas: HTMLCanvasElement): string {
  const thumb = document.createElement('canvas');
  thumb.width = 64;
  thumb.height = 64;
  const ctx = thumb.getContext('2d');
  if (ctx) {
    ctx.drawImage(canvas, 0, 0, 64, 64);
  }
  return thumb.toDataURL('image/png');
}

function App() {
  const [state, setState] = useState<QrState>(DEFAULT_STATE);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const lastSavedValueRef = useRef<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const updateState = (updates: Partial<QrState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const updateOptions = (updates: Partial<QrState['options']>) => {
    setState(prev => ({
      ...prev,
      options: { ...prev.options, ...updates },
    }));
  };

  const updateWifi = (updates: Partial<QrState['wifi']>) => {
    setState(prev => ({
      ...prev,
      wifi: { ...prev.wifi, ...updates },
    }));
  };

  const saveCurrentToHistory = useCallback(() => {
    const value = getQrValue(state);
    if (!value.trim() || value === lastSavedValueRef.current) return;

    const canvas = canvasContainerRef.current?.querySelector('canvas');
    if (!canvas) return;

    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      label: getLabel(state),
      contentType: state.contentType,
      state: structuredClone(state),
      timestamp: Date.now(),
      thumbnail: getThumbnail(canvas),
    };

    lastSavedValueRef.current = value;
    setHistory(saveEntry(entry));
  }, [state]);

  useEffect(() => {
    const value = getQrValue(state);
    if (!value.trim() || value === lastSavedValueRef.current) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(saveCurrentToHistory, 10_000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state, saveCurrentToHistory]);

  const handleRestore = (restoredState: QrState) => {
    lastSavedValueRef.current = getQrValue(restoredState);
    setState(restoredState);
  };

  const handleRemove = (id: string) => {
    setHistory(removeEntry(id));
  };

  const handleClear = () => {
    setHistory(clearHistory());
  };

  return (
    <div className="min-h-dvh bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Header />
        <main className="flex flex-col lg:flex-row gap-8">
          {/* Left: Controls + History */}
          <div className="flex-1 lg:max-w-lg">
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
              <ContentPanel
                state={state}
                onContentTypeChange={(contentType) => updateState({ contentType })}
                onTextChange={(text) => updateState({ text })}
                onUrlChange={(url) => updateState({ url })}
                onWifiChange={updateWifi}
                onOptionsChange={updateOptions}
              />
            </div>

            <HistoryPanel
              entries={history}
              onRestore={handleRestore}
              onRemove={handleRemove}
              onClear={handleClear}
            />
          </div>

          {/* Right: Preview */}
          <div className="flex-1 flex items-start justify-center lg:sticky lg:top-8 lg:self-start">
            <PreviewPanel state={state} canvasContainerRef={canvasContainerRef} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
