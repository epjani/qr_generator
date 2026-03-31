# QR Code Generator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a client-side QR code generator that supports text, URL, and WiFi content types with customizable appearance and PNG/SVG download.

**Architecture:** Single-page React app with all state at the App level. Content inputs feed into `qrcode.react` for live preview. No backend — purely static, deployed to Vercel.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, qrcode.react

---

## File Map

| File | Responsibility |
|------|---------------|
| `index.html` | Vite entry HTML |
| `vite.config.ts` | Vite config with React plugin |
| `tsconfig.json` | TypeScript config |
| `tailwind.config.js` | Tailwind config |
| `postcss.config.js` | PostCSS with Tailwind |
| `src/main.tsx` | React DOM render entry |
| `src/index.css` | Tailwind directives + global styles |
| `src/types.ts` | `QrState` interface and type definitions |
| `src/App.tsx` | Root component, state management, layout |
| `src/components/Header.tsx` | Title and subtitle |
| `src/components/ContentTypeTabs.tsx` | Tab switcher (Text / URL / WiFi) |
| `src/components/TextInput.tsx` | Textarea + random button + char count |
| `src/components/UrlInput.tsx` | URL field + validation + random button |
| `src/components/WiFiInput.tsx` | SSID, password, encryption, hidden |
| `src/components/ContentPanel.tsx` | Composes tabs + active input + options |
| `src/components/QrOptionsPanel.tsx` | Collapsible options (EC, colors, margin, size) |
| `src/components/PreviewPanel.tsx` | QR code display + download buttons |
| `src/utils/randomPhrases.ts` | Word lists and phrase generator |
| `src/utils/wifiEncoder.ts` | WiFi string encoder |
| `src/utils/download.ts` | PNG and SVG download helpers |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tailwind.config.js`, `postcss.config.js`, `src/main.tsx`, `src/index.css`, `src/App.tsx`, `src/vite-env.d.ts`

- [ ] **Step 1: Initialize the project with Vite**

```bash
cd /Users/edinpjanic/Rails/qrcode_generator
npm create vite@latest . -- --template react-ts
```

If prompted about the non-empty directory, confirm to proceed. This scaffolds `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, and the `src/` directory.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/edinpjanic/Rails/qrcode_generator
npm install qrcode.react
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure Tailwind with Vite plugin**

Replace `vite.config.ts` with:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

- [ ] **Step 4: Set up Tailwind CSS entry**

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

- [ ] **Step 5: Create minimal App component**

Replace `src/App.tsx` with:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-2xl font-bold p-8">QR Code Generator</h1>
    </div>
  )
}

export default App
```

- [ ] **Step 6: Clean up scaffolded files**

Delete the following files that Vite scaffolds but we don't need:

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 7: Update main.tsx to import index.css**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 8: Verify the dev server runs**

```bash
cd /Users/edinpjanic/Rails/qrcode_generator
npm run dev
```

Expected: Dev server starts, visiting the URL shows "QR Code Generator" in bold with Tailwind styling applied (no default Vite styles).

- [ ] **Step 9: Initialize git and commit**

```bash
cd /Users/edinpjanic/Rails/qrcode_generator
git init
```

Create `.gitignore`:

```
node_modules
dist
.DS_Store
.superpowers
```

```bash
git add .
git commit -m "feat: scaffold Vite + React + TypeScript + Tailwind project"
```

---

### Task 2: Types and Utility Functions

**Files:**
- Create: `src/types.ts`, `src/utils/randomPhrases.ts`, `src/utils/wifiEncoder.ts`, `src/utils/download.ts`

- [ ] **Step 1: Create the shared types**

Create `src/types.ts`:

```typescript
export interface WifiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface QrOptions {
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  fgColor: string;
  bgColor: string;
  margin: number;
  size: number;
}

export type ContentType = 'text' | 'url' | 'wifi';

export interface QrState {
  contentType: ContentType;
  text: string;
  url: string;
  wifi: WifiConfig;
  options: QrOptions;
}

export const DEFAULT_STATE: QrState = {
  contentType: 'text',
  text: '',
  url: '',
  wifi: {
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  },
  options: {
    errorCorrection: 'M',
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    margin: 4,
    size: 256,
  },
};
```

- [ ] **Step 2: Create the random phrase generator**

Create `src/utils/randomPhrases.ts`:

```typescript
const adjectives = [
  'brave', 'gentle', 'swift', 'calm', 'bright', 'bold', 'clever', 'eager',
  'fierce', 'happy', 'jolly', 'keen', 'lively', 'mighty', 'noble', 'proud',
  'quiet', 'rapid', 'steady', 'tender', 'vivid', 'warm', 'wise', 'young',
  'ancient', 'daring', 'elegant', 'fearless', 'graceful', 'humble', 'joyful',
  'kind', 'loyal', 'merry', 'nimble', 'patient', 'radiant', 'serene',
  'thrifty', 'unique', 'valiant', 'witty', 'zealous', 'agile', 'blissful',
  'cosmic', 'dreamy', 'epic', 'fancy', 'gleaming',
];

const colors = [
  'purple', 'silver', 'golden', 'crimson', 'azure', 'coral', 'emerald',
  'ivory', 'jade', 'lavender', 'maroon', 'navy', 'olive', 'pearl', 'ruby',
  'sapphire', 'teal', 'violet', 'amber', 'bronze', 'copper', 'indigo',
  'magenta', 'ochre', 'scarlet', 'turquoise', 'cobalt', 'slate', 'blush',
  'charcoal',
];

const nouns = [
  'elephant', 'mountain', 'river', 'phoenix', 'falcon', 'dolphin', 'tiger',
  'forest', 'canyon', 'ocean', 'dragon', 'sparrow', 'meadow', 'glacier',
  'harbor', 'island', 'jungle', 'kingdom', 'lantern', 'castle', 'nebula',
  'oracle', 'panther', 'quasar', 'rapids', 'summit', 'thunder', 'unicorn',
  'volcano', 'whisper', 'zenith', 'aurora', 'beacon', 'comet', 'desert',
  'eclipse', 'fjord', 'garden', 'horizon', 'inferno', 'jackal', 'kraken',
  'lagoon', 'mammoth', 'nomad', 'oasis', 'pilgrim', 'reef', 'storm',
  'tempest',
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomPhrase(): string {
  return `${randomFrom(adjectives)} ${randomFrom(colors)} ${randomFrom(nouns)}`;
}

export function generateRandomUrl(): string {
  return `https://example.com/${randomFrom(nouns)}`;
}
```

- [ ] **Step 3: Create the WiFi encoder**

Create `src/utils/wifiEncoder.ts`:

```typescript
import { WifiConfig } from '../types';

export function encodeWifi(config: WifiConfig): string {
  const type = config.encryption;
  const ssid = escapeSpecial(config.ssid);
  const password = escapeSpecial(config.password);
  const hidden = config.hidden ? 'true' : 'false';

  return `WIFI:T:${type};S:${ssid};P:${password};H:${hidden};;`;
}

function escapeSpecial(value: string): string {
  return value.replace(/([\\;,":"])/g, '\\$1');
}
```

- [ ] **Step 4: Create the download helpers**

Create `src/utils/download.ts`:

```typescript
import { ContentType } from '../types';

function buildFilename(contentType: ContentType, ext: string): string {
  const timestamp = Date.now();
  return `qrcode-${contentType}-${timestamp}.${ext}`;
}

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadPng(canvas: HTMLCanvasElement, contentType: ContentType): void {
  const url = canvas.toDataURL('image/png');
  triggerDownload(url, buildFilename(contentType, 'png'));
}

export function downloadSvg(svgElement: SVGSVGElement, contentType: ContentType): void {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, buildFilename(contentType, 'svg'));
  URL.revokeObjectURL(url);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/types.ts src/utils/
git commit -m "feat: add types and utility functions (random phrases, wifi encoder, download helpers)"
```

---

### Task 3: Header and App Layout Shell

**Files:**
- Create: `src/components/Header.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the Header component**

Create `src/components/Header.tsx`:

```tsx
export default function Header() {
  return (
    <header className="px-8 py-6 border-b border-gray-100">
      <h1 className="text-xl font-bold text-gray-900">QR Code Generator</h1>
      <p className="text-sm text-gray-500 mt-0.5">
        Generate QR codes for text, URLs, and WiFi networks
      </p>
    </header>
  );
}
```

- [ ] **Step 2: Set up the App layout shell**

Replace `src/App.tsx` with:

```tsx
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
```

- [ ] **Step 3: Verify layout renders**

```bash
cd /Users/edinpjanic/Rails/qrcode_generator
npm run dev
```

Expected: Header with title/subtitle, two-panel layout below. On narrow screens (<768px), panels stack vertically.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx src/App.tsx
git commit -m "feat: add Header component and responsive two-panel layout shell"
```

---

### Task 4: Content Type Tabs

**Files:**
- Create: `src/components/ContentTypeTabs.tsx`

- [ ] **Step 1: Create the ContentTypeTabs component**

Create `src/components/ContentTypeTabs.tsx`:

```tsx
import { ContentType } from '../types';

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
```

- [ ] **Step 2: Wire tabs into App**

In `src/App.tsx`, add the import at the top:

```tsx
import ContentTypeTabs from './components/ContentTypeTabs';
```

Replace the content panel placeholder:

```tsx
{/* Replace: <p className="text-gray-400">Content panel placeholder</p> */}
<ContentTypeTabs
  active={state.contentType}
  onChange={(contentType) => updateState({ contentType })}
/>
<p className="text-gray-400">Input for {state.contentType} goes here</p>
```

- [ ] **Step 3: Verify tabs switch**

```bash
npm run dev
```

Expected: Three tabs (Text, URL, WiFi). Clicking each changes the active tab styling and updates the placeholder text below.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContentTypeTabs.tsx src/App.tsx
git commit -m "feat: add content type tabs (Text, URL, WiFi)"
```

---

### Task 5: Text Input Component

**Files:**
- Create: `src/components/TextInput.tsx`

- [ ] **Step 1: Create the TextInput component**

Create `src/components/TextInput.tsx`:

```tsx
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
```

- [ ] **Step 2: Wire TextInput into App**

In `src/App.tsx`, add the import:

```tsx
import TextInput from './components/TextInput';
```

Replace the input placeholder text with:

```tsx
{state.contentType === 'text' && (
  <TextInput
    value={state.text}
    onChange={(text) => updateState({ text })}
  />
)}
{state.contentType === 'url' && (
  <p className="text-gray-400">URL input placeholder</p>
)}
{state.contentType === 'wifi' && (
  <p className="text-gray-400">WiFi input placeholder</p>
)}
```

- [ ] **Step 3: Verify text input works**

Expected: Text tab shows a textarea. Typing updates the character count. "Generate Random" fills the textarea with a random phrase like "brave purple elephant".

- [ ] **Step 4: Commit**

```bash
git add src/components/TextInput.tsx src/App.tsx
git commit -m "feat: add TextInput component with random phrase generation"
```

---

### Task 6: URL Input Component

**Files:**
- Create: `src/components/UrlInput.tsx`

- [ ] **Step 1: Create the UrlInput component**

Create `src/components/UrlInput.tsx`:

```tsx
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
```

- [ ] **Step 2: Wire UrlInput into App**

In `src/App.tsx`, add the import:

```tsx
import UrlInput from './components/UrlInput';
```

Replace the URL placeholder:

```tsx
{state.contentType === 'url' && (
  <UrlInput
    value={state.url}
    onChange={(url) => updateState({ url })}
  />
)}
```

- [ ] **Step 3: Verify URL input works**

Expected: URL tab shows input field. Typing an invalid URL shows a subtle amber warning. "Generate Random" fills it with something like `https://example.com/phoenix`.

- [ ] **Step 4: Commit**

```bash
git add src/components/UrlInput.tsx src/App.tsx
git commit -m "feat: add UrlInput component with validation and random URL generation"
```

---

### Task 7: WiFi Input Component

**Files:**
- Create: `src/components/WiFiInput.tsx`

- [ ] **Step 1: Create the WiFiInput component**

Create `src/components/WiFiInput.tsx`:

```tsx
import { useState } from 'react';
import { WifiConfig } from '../types';

interface Props {
  value: WifiConfig;
  onChange: (updates: Partial<WifiConfig>) => void;
}

export default function WiFiInput({ value, onChange }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
          Network Name (SSID)
        </label>
        <input
          type="text"
          value={value.ssid}
          onChange={(e) => onChange({ ssid: e.target.value })}
          placeholder="MyNetwork"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={value.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder="Enter password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-16 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
          Encryption
        </label>
        <select
          value={value.encryption}
          onChange={(e) => onChange({ encryption: e.target.value as WifiConfig['encryption'] })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">None</option>
        </select>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value.hidden}
          onChange={(e) => onChange({ hidden: e.target.checked })}
          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">Hidden network</span>
      </label>
    </div>
  );
}
```

- [ ] **Step 2: Wire WiFiInput into App**

In `src/App.tsx`, add the import:

```tsx
import WiFiInput from './components/WiFiInput';
```

Replace the WiFi placeholder:

```tsx
{state.contentType === 'wifi' && (
  <WiFiInput
    value={state.wifi}
    onChange={updateWifi}
  />
)}
```

- [ ] **Step 3: Verify WiFi input works**

Expected: WiFi tab shows SSID, password (with show/hide toggle), encryption dropdown (WPA/WPA2 default), and hidden network checkbox. All fields update state.

- [ ] **Step 4: Commit**

```bash
git add src/components/WiFiInput.tsx src/App.tsx
git commit -m "feat: add WiFiInput component with password toggle and encryption selector"
```

---

### Task 8: QR Options Panel

**Files:**
- Create: `src/components/QrOptionsPanel.tsx`

- [ ] **Step 1: Create the QrOptionsPanel component**

Create `src/components/QrOptionsPanel.tsx`:

```tsx
import { useState } from 'react';
import { QrOptions } from '../types';

interface Props {
  value: QrOptions;
  onChange: (updates: Partial<QrOptions>) => void;
}

export default function QrOptionsPanel({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700 transition-colors"
      >
        <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>
          ▶
        </span>
        QR Options
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Error Correction</label>
              <select
                value={value.errorCorrection}
                onChange={(e) => onChange({ errorCorrection: e.target.value as QrOptions['errorCorrection'] })}
                className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">
                Size: {value.size}px
              </label>
              <input
                type="range"
                min={128}
                max={512}
                step={8}
                value={value.size}
                onChange={(e) => onChange({ size: Number(e.target.value) })}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Foreground</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2.5 py-1.5 bg-gray-50">
                <input
                  type="color"
                  value={value.fgColor}
                  onChange={(e) => onChange({ fgColor: e.target.value })}
                  className="w-5 h-5 rounded border-0 cursor-pointer"
                />
                <span className="text-sm text-gray-800">{value.fgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 block mb-1">Background</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-2.5 py-1.5 bg-gray-50">
                <input
                  type="color"
                  value={value.bgColor}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-5 h-5 rounded border-0 cursor-pointer"
                />
                <span className="text-sm text-gray-800">{value.bgColor}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">
              Margin: {value.margin}
            </label>
            <input
              type="range"
              min={0}
              max={8}
              step={1}
              value={value.margin}
              onChange={(e) => onChange({ margin: Number(e.target.value) })}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Wire QrOptionsPanel into App**

In `src/App.tsx`, add the import:

```tsx
import QrOptionsPanel from './components/QrOptionsPanel';
```

Add after the content type conditional rendering (after the closing `}` of the WiFi conditional):

```tsx
<QrOptionsPanel
  value={state.options}
  onChange={updateOptions}
/>
```

- [ ] **Step 3: Verify options panel works**

Expected: Collapsed by default. Clicking "QR Options" expands to show error correction dropdown, size slider (128-512), foreground/background color pickers, and margin slider (0-8). All controls update the state.

- [ ] **Step 4: Commit**

```bash
git add src/components/QrOptionsPanel.tsx src/App.tsx
git commit -m "feat: add collapsible QR options panel (error correction, colors, margin, size)"
```

---

### Task 9: Preview Panel with Live QR Code

**Files:**
- Create: `src/components/PreviewPanel.tsx`

- [ ] **Step 1: Create the PreviewPanel component**

Create `src/components/PreviewPanel.tsx`:

```tsx
import { useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { QrState } from '../types';
import { encodeWifi } from '../utils/wifiEncoder';
import { downloadPng, downloadSvg } from '../utils/download';

interface Props {
  state: QrState;
}

function getQrValue(state: QrState): string {
  switch (state.contentType) {
    case 'text':
      return state.text || ' ';
    case 'url':
      return state.url || ' ';
    case 'wifi':
      return encodeWifi(state.wifi);
  }
}

export default function PreviewPanel({ state }: Props) {
  const svgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const value = getQrValue(state);
  const { errorCorrection, fgColor, bgColor, margin, size } = state.options;

  const handleDownloadPng = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      downloadPng(canvas, state.contentType);
    }
  };

  const handleDownloadSvg = () => {
    const svg = svgRef.current?.querySelector('svg');
    if (svg) {
      downloadSvg(svg, state.contentType);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm" ref={svgRef}>
        <QRCodeSVG
          value={value}
          size={size}
          level={errorCorrection}
          fgColor={fgColor}
          bgColor={bgColor}
          marginSize={margin}
        />
      </div>

      {/* Hidden canvas for PNG export */}
      <div className="hidden" ref={canvasRef}>
        <QRCodeCanvas
          value={value}
          size={size}
          level={errorCorrection}
          fgColor={fgColor}
          bgColor={bgColor}
          marginSize={margin}
        />
      </div>

      <div className="flex gap-2.5 mt-5">
        <button
          onClick={handleDownloadPng}
          className="px-5 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Download PNG
        </button>
        <button
          onClick={handleDownloadSvg}
          className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire PreviewPanel into App**

In `src/App.tsx`, add the import:

```tsx
import PreviewPanel from './components/PreviewPanel';
```

Replace the preview panel placeholder:

```tsx
{/* Replace: <p className="text-gray-400">Preview panel placeholder</p> */}
<PreviewPanel state={state} />
```

- [ ] **Step 3: Verify live QR code rendering**

Expected: QR code renders on the right panel. Type text in the left panel — QR code updates instantly. Switch tabs, change options — QR code reflects all changes in real time. Download PNG and SVG buttons produce files named like `qrcode-text-1711921234567.png`.

- [ ] **Step 4: Commit**

```bash
git add src/components/PreviewPanel.tsx src/App.tsx
git commit -m "feat: add PreviewPanel with live QR code rendering and PNG/SVG download"
```

---

### Task 10: ContentPanel Composition and Final Polish

**Files:**
- Create: `src/components/ContentPanel.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the ContentPanel component**

Create `src/components/ContentPanel.tsx`:

```tsx
import { QrState, ContentType, WifiConfig, QrOptions } from '../types';
import ContentTypeTabs from './ContentTypeTabs';
import TextInput from './TextInput';
import UrlInput from './UrlInput';
import WiFiInput from './WiFiInput';
import QrOptionsPanel from './QrOptionsPanel';

interface Props {
  state: QrState;
  onContentTypeChange: (type: ContentType) => void;
  onTextChange: (text: string) => void;
  onUrlChange: (url: string) => void;
  onWifiChange: (updates: Partial<WifiConfig>) => void;
  onOptionsChange: (updates: Partial<QrOptions>) => void;
}

export default function ContentPanel({
  state,
  onContentTypeChange,
  onTextChange,
  onUrlChange,
  onWifiChange,
  onOptionsChange,
}: Props) {
  return (
    <div>
      <ContentTypeTabs
        active={state.contentType}
        onChange={onContentTypeChange}
      />

      {state.contentType === 'text' && (
        <TextInput value={state.text} onChange={onTextChange} />
      )}
      {state.contentType === 'url' && (
        <UrlInput value={state.url} onChange={onUrlChange} />
      )}
      {state.contentType === 'wifi' && (
        <WiFiInput value={state.wifi} onChange={onWifiChange} />
      )}

      <QrOptionsPanel value={state.options} onChange={onOptionsChange} />
    </div>
  );
}
```

- [ ] **Step 2: Simplify App.tsx to use ContentPanel**

Replace `src/App.tsx` with:

```tsx
import { useState } from 'react';
import Header from './components/Header';
import ContentPanel from './components/ContentPanel';
import PreviewPanel from './components/PreviewPanel';
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
          <ContentPanel
            state={state}
            onContentTypeChange={(contentType) => updateState({ contentType })}
            onTextChange={(text) => updateState({ text })}
            onUrlChange={(url) => updateState({ url })}
            onWifiChange={updateWifi}
            onOptionsChange={updateOptions}
          />
        </div>
        <div className="flex-1 p-8 bg-gray-50 flex flex-col items-center justify-center min-h-[400px]">
          <PreviewPanel state={state} />
        </div>
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Update index.html title**

In `index.html`, change the `<title>` tag:

```html
<title>QR Code Generator</title>
```

- [ ] **Step 4: Verify full app works end-to-end**

```bash
cd /Users/edinpjanic/Rails/qrcode_generator
npm run dev
```

Test all scenarios:
1. Text tab: type text → QR updates. Click "Generate Random" → random phrase appears, QR updates.
2. URL tab: enter URL → QR updates. Invalid URL shows amber warning. "Generate Random" works.
3. WiFi tab: fill SSID/password → QR updates. Toggle password visibility. Change encryption. Toggle hidden.
4. QR Options: expand panel. Change error correction, colors, margin, size → QR updates for each.
5. Download: PNG downloads correctly. SVG downloads correctly.
6. Responsive: narrow the browser below 768px → panels stack vertically.

- [ ] **Step 5: Commit**

```bash
git add src/components/ContentPanel.tsx src/App.tsx index.html
git commit -m "feat: compose ContentPanel and finalize app layout"
```

---

### Task 11: Build Verification and Vercel Readiness

**Files:**
- None new — verification only

- [ ] **Step 1: Run production build**

```bash
cd /Users/edinpjanic/Rails/qrcode_generator
npm run build
```

Expected: Build succeeds with no errors. Output in `dist/` directory.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Expected: Production build serves correctly. All features work as in dev mode.

- [ ] **Step 3: Verify dist/ output is clean**

```bash
ls -la dist/
ls -la dist/assets/
```

Expected: `index.html` plus bundled JS/CSS assets. No unexpected files.

- [ ] **Step 4: Commit final state**

```bash
git add -A
git commit -m "chore: verify production build for Vercel deployment"
```
