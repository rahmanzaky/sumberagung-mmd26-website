import Link from 'next/link';
import Hero from '@/components/public/home/Hero';
import StatsCounter from '@/components/public/home/StatsCounter';
import QuickAccess from '@/components/public/home/QuickAccess';
import SambutanKades from '@/components/public/home/SambutanKades';
import LatestNews from '@/components/public/home/LatestNews';
import Reveal from '@/components/public/home/Reveal';

export default function BerandaPage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <QuickAccess />
      <SambutanKades />
      <LatestNews />

      {/* CTA penutup */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] px-8 py-14 text-center text-white">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[var(--color-accent)] opacity-10 blur-3xl" />
            <h2 className="font-[var(--font-lora)] text-3xl font-bold mb-3 relative">
              Ada Pertanyaan atau Keperluan?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8 relative">
              Hubungi kantor Desa Sumberagung untuk informasi pelayanan, pengajuan surat, maupun
              kegiatan desa.
            </p>
            <Link
              href="/kontak"
              className="relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[var(--color-primary)] font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Hubungi Kami <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
