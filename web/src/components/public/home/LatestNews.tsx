import Link from 'next/link';
import Reveal from './Reveal';

// Dummy berita untuk preview beranda — nanti diganti data dari sumber berita
const NEWS = [
  {
    slug: 'gotong-royong-bersih-desa',
    kategori: 'Kegiatan',
    tanggal: '2026-07-02',
    judul: 'Gotong Royong Bersih Desa Sambut Musim Kemarau',
    ringkasan:
      'Warga bersama perangkat desa melaksanakan kerja bakti membersihkan saluran air dan lingkungan.',
    emoji: '🧹',
  },
  {
    slug: 'pelatihan-umkm-digital',
    kategori: 'Program',
    tanggal: '2026-06-28',
    judul: 'Pelatihan Pemasaran Digital untuk Pelaku UMKM',
    ringkasan:
      'Puluhan pelaku UMKM mengikuti pelatihan pemanfaatan media sosial untuk memperluas pasar.',
    emoji: '💻',
  },
  {
    slug: 'posyandu-balita-juni',
    kategori: 'Kesehatan',
    tanggal: '2026-06-20',
    judul: 'Posyandu Balita Rutin Bulan Juni Berjalan Lancar',
    ringkasan:
      'Kegiatan penimbangan dan pemberian gizi tambahan bagi balita berlangsung di empat dusun.',
    emoji: '🏥',
  },
];

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function LatestNews() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <h2 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mb-3">
            Berita & Kegiatan Terbaru
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-xl">
            Ikuti perkembangan dan kegiatan terkini di Desa Sumberagung.
          </p>
        </div>
        <Link
          href="/berita"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:gap-3 transition-all"
        >
          Lihat Semua Berita <span aria-hidden="true">→</span>
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS.map((berita, i) => (
          <Reveal key={berita.slug} delay={i * 100}>
            <Link
              href={`/berita/${berita.slug}`}
              className="group block h-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Thumbnail placeholder */}
              <div className="h-40 bg-gradient-to-br from-[var(--color-accent-light)] to-[var(--color-surface-dark)] flex items-center justify-center text-5xl">
                <span aria-hidden="true">{berita.emoji}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-medium">
                    {berita.kategori}
                  </span>
                  <span className="text-[var(--color-text-muted)]">
                    {formatTanggal(berita.tanggal)}
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--color-text-base)] mb-2 leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                  {berita.judul}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {berita.ringkasan}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
