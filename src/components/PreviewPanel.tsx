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
    <div className="bg-surface rounded-xl border border-border p-6 shadow-sm flex flex-col items-center w-full lg:max-w-sm">
      <p className="text-xs font-medium text-fg-muted mb-4 uppercase tracking-wide">
        Preview
      </p>

      {/* QR Code */}
      <div
        className="rounded-lg border border-border p-3 bg-white"
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
      <div className="flex gap-3 mt-6 w-full">
        <button
          onClick={handleDownloadPng}
          className="flex-1 px-4 py-2.5 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors cursor-pointer"
        >
          Download PNG
        </button>
        <button
          onClick={handleDownloadSvg}
          className="flex-1 px-4 py-2.5 text-sm font-medium text-fg border border-border rounded-lg hover:bg-bg-tertiary transition-colors cursor-pointer"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
}
