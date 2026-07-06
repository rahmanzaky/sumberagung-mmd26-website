export default function BukuTamuPage() {
  return (
    <div>
      <h1 className="font-[var(--font-lora)] text-2xl font-bold text-[var(--color-primary)] mb-2">
        Buku Tamu Digital
      </h1>
      <p className="text-[var(--color-text-muted)] text-sm mb-8">
        Data kunjungan warga ke kantor desa.
      </p>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <p className="text-[var(--color-text-muted)] italic text-sm">
          Tabel data buku tamu akan ditampilkan di sini.
        </p>
      </div>
    </div>
  );
}
