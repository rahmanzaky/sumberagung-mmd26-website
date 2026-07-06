import Link from 'next/link';
import Reveal from './Reveal';

const ITEMS = [
  {
    href: '/profil-desa',
    icon: '🏛️',
    title: 'Profil Desa',
    desc: 'Sejarah, visi-misi, dan struktur pemerintahan Desa Sumberagung.',
  },
  {
    href: '/potensi-desa',
    icon: '🌾',
    title: 'Potensi Desa',
    desc: 'UMKM unggulan dan destinasi wisata yang dimiliki desa.',
  },
  {
    href: '/berita',
    icon: '📰',
    title: 'Berita & Kegiatan',
    desc: 'Informasi terkini seputar kegiatan dan program desa.',
  },
  {
    href: '/kontak',
    icon: '📍',
    title: 'Kontak',
    desc: 'Alamat kantor, jam pelayanan, dan cara menghubungi kami.',
  },
];

export default function QuickAccess() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <Reveal className="text-center mb-12">
        <h2 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mb-3">
          Layanan & Informasi
        </h2>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
          Akses cepat ke berbagai informasi dan layanan yang tersedia di Desa Sumberagung.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map((item, i) => (
          <Reveal key={item.href} delay={i * 100}>
            <Link
              href={item.href}
              className="group block h-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[var(--color-accent)] hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--color-surface)] flex items-center justify-center text-2xl mb-4 group-hover:bg-[var(--color-accent-light)] transition-colors">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg text-[var(--color-text-base)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Selengkapnya <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
