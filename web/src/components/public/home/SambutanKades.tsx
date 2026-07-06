import Reveal from './Reveal';

export default function SambutanKades() {
  return (
    <section className="bg-[var(--color-surface-dark)] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Foto/avatar kepala desa */}
          <Reveal className="md:col-span-1">
            <div className="relative mx-auto max-w-xs">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] flex items-center justify-center shadow-xl">
                <span className="text-7xl" aria-hidden="true">
                  👤
                </span>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-5 py-2 shadow-lg text-center whitespace-nowrap">
                <p className="font-semibold text-[var(--color-primary)] text-sm">Bapak Kepala Desa</p>
                <p className="text-xs text-[var(--color-text-muted)]">Kepala Desa Sumberagung</p>
              </div>
            </div>
          </Reveal>

          {/* Isi sambutan */}
          <Reveal delay={150} className="md:col-span-2">
            <span className="text-sm font-medium text-[var(--color-earth)] uppercase tracking-wider">
              Sambutan
            </span>
            <h2 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mt-2 mb-5">
              Selamat Datang di Desa Kami
            </h2>
            <div className="relative">
              <span
                className="absolute -top-4 -left-2 text-6xl text-[var(--color-accent)] opacity-40 font-serif"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="text-[var(--color-text-base)] leading-relaxed relative pl-6">
                Puji syukur kami panjatkan kehadirat Tuhan Yang Maha Esa. Website ini kami
                hadirkan sebagai wujud komitmen pemerintah desa dalam memberikan pelayanan
                yang transparan dan mudah diakses oleh seluruh masyarakat. Kami berharap
                kehadiran website ini dapat mempererat komunikasi antara pemerintah desa dan
                warga, serta memperkenalkan potensi Desa Sumberagung kepada dunia luar.
              </p>
            </div>
            <p className="mt-5 text-sm text-[var(--color-text-muted)] pl-6">
              — Pemerintah Desa Sumberagung
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
