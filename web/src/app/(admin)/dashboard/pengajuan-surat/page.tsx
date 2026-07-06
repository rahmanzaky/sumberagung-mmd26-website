export default function PengajuanSuratPage() {
  return (
    <div>
      <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-2">
        Pengajuan Surat
      </h1>
      <p className="text-[var(--color-text-muted)] text-sm mb-8">
        Kelola status pengajuan surat warga.
      </p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-[var(--color-text-muted)] italic text-sm">
          Tabel pengajuan surat dengan filter status dan tombol update akan ditampilkan di sini.
        </p>
      </div>
    </div>
  );
}
