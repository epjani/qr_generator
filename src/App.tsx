import { useState } from 'react';
import Header from './components/Header';
import ContentPanel from './components/ContentPanel';
import PreviewPanel from './components/PreviewPanel';
import type { QrState } from './types';
import { DEFAULT_STATE } from './types';

function App() {
  const [state, setState] = useState<QrState>(DEFAULT_STATE);

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

  return (
    <div className="min-h-dvh bg-bg-secondary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Header />
        <main className="flex flex-col lg:flex-row gap-8">
          {/* Left: Controls */}
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
          </div>

          {/* Right: Preview */}
          <div className="flex-1 flex items-start justify-center lg:sticky lg:top-8 lg:self-start">
            <PreviewPanel state={state} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
