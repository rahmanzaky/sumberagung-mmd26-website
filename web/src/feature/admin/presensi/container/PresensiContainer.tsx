export default function PresensiContainer() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-1">
          Presensi Perangkat Desa
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm">
          Kelola data absensi harian perangkat desa.
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-sm text-gray-500 italic">Modul presensi sedang dalam pengembangan...</p>
      </div>
    </div>
  );
}
