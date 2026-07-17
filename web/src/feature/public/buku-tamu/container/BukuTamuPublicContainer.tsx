export default function BukuTamuPublicContainer() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mb-4">
        Buku Tamu
      </h1>
      <p className="text-[var(--color-text-muted)] italic mb-6">
        Silakan isi form buku tamu berikut sebelum kunjungan Anda.
      </p>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">Form buku tamu sedang dalam pengembangan...</p>
      </div>
    </section>
  );
}
