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
    <div className="min-h-dvh bg-void relative overflow-hidden scanlines">
      {/* Ambient glow orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Retro perspective grid floor */}
      <div className="retro-grid" />

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 gap-8">
          {/* Left: Controls */}
          <div className="flex-1 lg:max-w-xl">
            <div className="card-3d bg-surface backdrop-blur-xl border border-border-subtle rounded-2xl p-6 sm:p-8 hud-corners">
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
