import Link from 'next/link';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary-dark)] text-white">
      {/* Layer gradasi */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-primary)] to-[var(--color-primary-light)]" />

      {/* Pola dekoratif organik (menyerupai kontur sawah/perbukitan) */}
      <svg
        className="absolute bottom-0 left-0 w-full text-[var(--color-surface)]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,64 C240,120 480,20 720,48 C960,76 1200,120 1440,72 L1440,120 L0,120 Z"
        />
      </svg>

      {/* Titik-titik dekoratif */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[var(--color-accent)] opacity-10 blur-2xl" />
      <div className="absolute top-40 left-16 w-24 h-24 rounded-full bg-[var(--color-earth-light)] opacity-10 blur-2xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-[var(--color-accent-light)] mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
            Website Resmi Pemerintah Desa
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-[var(--font-lora)] text-4xl md:text-6xl font-bold leading-tight mb-4">
            Desa Sumberagung
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg md:text-xl text-[var(--color-accent-light)] max-w-2xl mb-2">
            Kecamatan Panggungrejo, Kabupaten Blitar, Jawa Timur
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mb-10 leading-relaxed">
            Membangun desa yang mandiri, sejahtera, dan berbudaya melalui pelayanan
            publik yang transparan dan pemberdayaan potensi lokal.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/potensi-desa"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[var(--color-primary)] font-semibold shadow-lg hover:bg-[var(--color-surface)] hover:-translate-y-0.5 transition-all"
            >
              Jelajahi Potensi Desa
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/20 transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
