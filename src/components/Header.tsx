export default function Header() {
  return (
    <header className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-2">
        {/* Decorative HUD element */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-3 h-3 bg-neon-purple rounded-sm rotate-45 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
          <div className="w-8 h-0.5 bg-gradient-to-r from-neon-purple to-transparent" />
        </div>

        <h1
          className="glitch font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider text-fg uppercase neon-text-purple"
          data-text="QR Generator"
        >
          QR Generator
        </h1>

        <div className="hidden sm:flex items-center gap-2">
          <div className="w-8 h-0.5 bg-gradient-to-l from-neon-purple to-transparent" />
          <div className="w-3 h-3 bg-neon-purple rounded-sm rotate-45 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
        </div>
      </div>

      <p className="font-mono text-sm sm:text-base text-neon-cyan neon-text-cyan tracking-widest uppercase ml-0 sm:ml-[3.25rem]">
        // Retro Edition &mdash; Text &bull; URL &bull; WiFi
      </p>

      {/* Decorative line */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" />
    </header>
  );
}
