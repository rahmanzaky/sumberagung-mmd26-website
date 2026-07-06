export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-2">
        Ringkasan
      </h1>
      <p className="text-[var(--color-text-muted)] text-sm mb-8">
        Selamat datang di panel admin Desa Sumberagung.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Kunjungan Bulan Ini
          </p>
          <p className="text-3xl font-bold text-[var(--color-primary)]">—</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Pengajuan Baru
          </p>
          <p className="text-3xl font-bold text-[var(--color-primary)]">—</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            Pengajuan Diproses
          </p>
          <p className="text-3xl font-bold text-[var(--color-earth)]">—</p>
        </div>
      </div>
      <p className="mt-12 text-sm text-[var(--color-text-muted)] italic">
        Chart dan data ringkasan akan ditampilkan di sini.
      </p>
    </div>
  );
}
