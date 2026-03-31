import { useState } from 'react';
import Header from './components/Header';
import { QrState, DEFAULT_STATE } from './types';

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
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex flex-col md:flex-row">
        <div className="flex-1 p-8 border-r border-gray-100">
          {/* ContentPanel will go here */}
          <p className="text-gray-400">Content panel placeholder</p>
        </div>
        <div className="flex-1 p-8 bg-gray-50 flex flex-col items-center justify-center min-h-[400px]">
          {/* PreviewPanel will go here */}
          <p className="text-gray-400">Preview panel placeholder</p>
        </div>
      </main>
    </div>
  );
}

export default App;
