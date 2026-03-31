# QR Code Generator — Design Spec

## Overview

A client-side QR code generator web app. Users enter content (text, URL, or WiFi credentials), customize QR appearance, and download the result as PNG or SVG. All processing happens in the browser — no backend required.

Deploys to Vercel as a static site.

## Tech Stack

- **Framework:** Vite + React
- **Styling:** Tailwind CSS
- **QR Rendering:** `qrcode.react` (SVG for preview, Canvas for PNG export)
- **Language:** TypeScript
- **Deployment:** Vercel (static build)

## Content Types

### Text (default tab)
- Textarea for free text input
- Character count display (current / max QR capacity based on error correction level)
- "Generate Random" button produces human-readable phrases (e.g., "brave purple elephant") from built-in word lists (adjectives, colors, nouns)

### URL
- Single input field with `https://` placeholder
- Subtle inline validation warning for malformed URLs
- "Generate Random" fills with a random example URL

### WiFi
- SSID: text input (network name)
- Password: text input with show/hide toggle
- Encryption: dropdown — WPA/WPA2 (default), WEP, None
- Hidden network: checkbox
- Encodes to standard format: `WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;`

## QR Options

All options live in a collapsible panel below the content input.

| Option | Control | Default | Range |
|--------|---------|---------|-------|
| Error Correction | Dropdown | Medium (M) | L, M, Q, H |
| Foreground Color | Color picker | #000000 | Any hex color |
| Background Color | Color picker | #FFFFFF | Any hex color |
| Margin | Slider | 4 | 0–8 modules |
| Size | Slider | 256px | 128–512px |

## Layout

### Desktop (>768px)
Side-by-side: left panel (content input + options), right panel (QR preview + download).

### Mobile (<=768px)
Stacked: content input + options on top, QR preview + download below.

## Visual Style

Light & Clean:
- White background (`#FFFFFF`), light gray accents (`#FAFAFA`, `#EEE`)
- Primary accent: blue (`#0070F3`)
- Clean typography, subtle shadows, rounded corners (8px)
- Uppercase small labels for form sections
- QR preview sits in a white card with subtle box shadow

## Component Structure

```
App
├── Header
│   ├── Title: "QR Code Generator"
│   └── Subtitle: "Generate QR codes for text, URLs, and WiFi networks"
├── ContentPanel (left)
│   ├── ContentTypeTabs (Text | URL | WiFi)
│   ├── TextInput (textarea + generate random button + char count)
│   ├── UrlInput (url field + validation + generate random button)
│   ├── WiFiInput (ssid, password w/ toggle, encryption dropdown, hidden checkbox)
│   └── QrOptionsPanel (collapsible: error correction, colors, margin, size)
└── PreviewPanel (right)
    ├── QrCodeDisplay (live SVG preview via qrcode.react)
    └── DownloadButtons (PNG | SVG)
```

## State Management

Single state object at the App level via `useState`:

```typescript
interface QrState {
  contentType: 'text' | 'url' | 'wifi';
  text: string;
  url: string;
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  options: {
    errorCorrection: 'L' | 'M' | 'Q' | 'H';
    fgColor: string;
    bgColor: string;
    margin: number;
    size: number;
  };
}
```

The QR code re-renders on every state change. No debouncing — `qrcode.react` renders are fast enough for instant feedback.

## Auto-Refresh Behavior

Any change to any input field immediately updates the state, which triggers a re-render of the QR code preview. There is no "Generate" or "Submit" button — the QR code is always in sync with the current inputs.

## Download

- **PNG:** Render a hidden `<QRCodeCanvas>` at the selected size, call `canvas.toDataURL('image/png')`, trigger download via a temporary `<a>` element.
- **SVG:** Serialize the `<QRCodeSVG>` element to a string, create a Blob, trigger download.

Filename format: `qrcode-{contentType}-{timestamp}.{ext}`

## Random Phrase Generation

Client-side only. Built-in word lists:
- ~50 adjectives (brave, gentle, swift, calm, bright, etc.)
- ~30 colors (purple, silver, golden, crimson, etc.)
- ~50 nouns (elephant, mountain, river, phoenix, etc.)

Formula: `{adjective} {color} {noun}` — produces ~75,000 unique combinations.

For URL tab, random generates patterns like `https://example.com/{random-word}`.

## Project Structure

```
/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── public/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ContentPanel.tsx
│   │   ├── ContentTypeTabs.tsx
│   │   ├── TextInput.tsx
│   │   ├── UrlInput.tsx
│   │   ├── WiFiInput.tsx
│   │   ├── QrOptionsPanel.tsx
│   │   ├── PreviewPanel.tsx
│   │   └── DownloadButtons.tsx
│   ├── utils/
│   │   ├── randomPhrases.ts
│   │   ├── wifiEncoder.ts
│   │   └── download.ts
│   └── types.ts
```

## Dependencies

- `react`, `react-dom`
- `qrcode.react`
- `tailwindcss`, `postcss`, `autoprefixer`
- `typescript`
- Dev: `vite`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`

## Vercel Deployment

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- No server-side functions needed
