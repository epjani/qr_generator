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
