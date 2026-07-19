import Image from 'next/image';

import { sejarahHeader, sejarahTimeline } from '../data';
import type { SejarahGambar } from '../types';
import Reveal from './Reveal';

/** Foto bergaya hitam-putih bernuansa biru; kotak abu bila belum ada file. */
function FotoSejarah({ gambar }: { gambar: SejarahGambar }) {
  if (!gambar.src) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center border border-white/10 bg-white/5">
        <span className="px-4 text-center text-xs uppercase tracking-[0.16em] text-white/35">
          Foto menyusul
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={gambar.src}
        alt={gambar.alt}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover grayscale"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--color-primary)]/35 mix-blend-multiply"
      />
    </div>
  );
}

export default function SejarahDesaContainer() {
  return (
    <section className="bg-[var(--color-primary-deepdark)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Kepala halaman */}
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold tracking-[-0.03em] text-[var(--color-accent)] sm:text-5xl lg:text-6xl">
          {sejarahHeader.judul}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-white/70">
          {sejarahHeader.deskripsi}
        </p>
      </header>

      {/* Garis waktu */}
      <ol className="relative mx-auto mt-16 max-w-6xl lg:mt-24">
        {/* Garis vertikal */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-2 w-px bg-white/15 lg:left-1/2"
        />

        {sejarahTimeline.map((item, index) => {
          const teksDiKiri = index % 2 === 0;

          return (
            <li
              key={item.id}
              className="relative grid gap-6 pb-16 pl-10 last:pb-0 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pb-24 lg:pl-0"
            >
              {/* Penanda bulat */}
              <span
                aria-hidden="true"
                className="absolute left-2 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-primary-deepdark)] lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
              />

              {/* Teks */}
              <Reveal
                className={teksDiKiri ? 'lg:order-1 lg:text-right' : 'lg:order-2'}
              >
                <h2 className="font-serif text-3xl font-bold tracking-[-0.02em] text-[var(--color-accent)] lg:text-4xl">
                  {item.periode}
                </h2>
                <p className="mt-2 text-base font-bold text-white">
                  {item.judul}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {item.narasi}
                </p>
              </Reveal>

              {/* Foto */}
              <Reveal
                delay={120}
                className={teksDiKiri ? 'lg:order-2' : 'lg:order-1'}
              >
                <FotoSejarah gambar={item.gambar} />
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}