import { useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import type { QrState } from '../types';
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
    <div className="flex flex-col items-center justify-center py-4">
      {/* Status HUD */}
      <div className="mb-6 flex items-center gap-3 font-mono text-xs text-fg-dim">
        <span className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_6px_rgba(0,255,136,0.6)] animate-pulse" />
        <span className="uppercase tracking-widest">
          Live Preview &mdash; {state.contentType}
        </span>
      </div>

      {/* 3D Floating QR Code */}
      <div className="float-3d pulse-ring">
        <div className="qr-frame rounded-2xl">
          <div
            className="rounded-xl p-4 bg-card border border-border-subtle"
            ref={svgRef}
          >
            <QRCodeSVG
              value={value}
              size={size}
              level={errorCorrection}
              fgColor={fgColor}
              bgColor={bgColor}
              marginSize={margin}
            />
          </div>
        </div>
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

      {/* Download Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={handleDownloadPng}
          className="btn-neon px-6 py-2.5 text-sm font-display font-bold uppercase tracking-wider bg-neon-purple text-white rounded-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all cursor-pointer"
        >
          Download PNG
        </button>
        <button
          onClick={handleDownloadSvg}
          className="btn-neon px-6 py-2.5 text-sm font-display font-bold uppercase tracking-wider bg-transparent text-neon-cyan border border-neon-cyan/40 rounded-lg hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-all cursor-pointer"
        >
          Download SVG
        </button>
      </div>

      {/* Decorative bottom line */}
      <div className="mt-8 w-48 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
    </div>
  );
}
