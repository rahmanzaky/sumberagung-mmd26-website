function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

type TopbarProps = {
  name: string;
  role?: string;
};

export default function Topbar({ name, role = 'Administrator Desa' }: TopbarProps) {
  return (
    <header className="h-16 shrink-0 bg-[var(--color-primary)] border-b border-white/10 flex items-center justify-end gap-4 px-6">
      {/* Notifikasi */}
      <button
        type="button"
        aria-label="Notifikasi"
        className="relative w-9 h-9 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 transition-colors"
      >
        <span aria-hidden>🔔</span>
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-gold)] ring-2 ring-[var(--color-primary)]" />
      </button>

      {/* User chip */}
      <div className="flex items-center gap-3">
        <div className="text-right leading-tight">
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-white/60">{role}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[var(--color-gold)] text-[var(--color-primary-dark)] flex items-center justify-center text-sm font-semibold">
          {initials(name) || 'AD'}
        </div>
      </div>
    </header>
  );
}
