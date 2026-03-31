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
