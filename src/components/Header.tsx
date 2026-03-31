export default function Header() {
  return (
    <header className="pt-10 pb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
        QR Code Generator
      </h1>
      <p className="mt-1 text-sm text-fg-muted">
        Generate QR codes for text, URLs, or WiFi credentials
      </p>
    </header>
  );
}
