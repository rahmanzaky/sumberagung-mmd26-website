export default function BeritaDetailPage({ params }: { params: { slug: string } }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs text-[var(--color-text-muted)] mb-4">
        Slug: <code className="bg-gray-100 px-1 rounded">{params.slug}</code>
      </p>
      <h1 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mb-4">
        Detail Berita
      </h1>
      <p className="text-[var(--color-text-muted)] italic">
        Halaman ini sedang dalam pengembangan.
      </p>
    </section>
  );
}
