import type { ContentType } from '../types';

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
