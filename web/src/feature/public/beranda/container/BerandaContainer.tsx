import Image from 'next/image';
import Link from 'next/link';

import { hero, idBagianKegiatan, kegiatan, videoProfil } from '../data';
import { muatStatistik, muatKartuKegiatan } from '../loader';
import GaleriKegiatan from './GaleriKegiatan';
import TombolGulir from './TombolGulir';
import VideoProfil from './VideoProfil';

function IkonPanahKanan({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function IkonPutarKecil({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default async function BerandaContainer() {
  const [statistik, kartuKegiatan] = await Promise.all([muatStatistik(), muatKartuKegiatan()]);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative isolate min-h-[560px] overflow-hidden lg:min-h-[640px]">
        <Image
          src={hero.gambar.src}
          alt={hero.gambar.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        {/* Peredup agar teks tetap terbaca di atas langit terang */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/25 to-transparent"
        />

        <div className="mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:min-h-[640px] lg:px-12">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--color-accent)]" />
            {hero.label}
          </p>

          <h1 className="mt-6 max-w-2xl font-serif text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
            {hero.judulAwal}
            <em className="text-[var(--color-accent)]">{hero.judulSorot}</em>
            {hero.judulAkhir}
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
            {hero.deskripsi}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href={hero.tombolUtama.href}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary-dark)] transition-colors hover:bg-[var(--color-accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {hero.tombolUtama.label}
              <IkonPanahKanan className="h-4 w-4" />
            </Link>

            <TombolGulir
              targetId={idBagianKegiatan}
              className="inline-flex items-center rounded-md border border-[var(--color-accent)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {hero.tombolKedua.label}
            </TombolGulir>
          </div>
        </div>
      </section>

      {/* ---------- Statistik ---------- */}
      <section
        aria-label="Statistik Desa Sumberagung"
        className="bg-[var(--color-primary-dark)] px-6 py-8 sm:px-8 lg:px-12"
      >
        {/*
          Pembatas antar kolom: di layar kecil (2 kolom) hanya kolom genap,
          di layar besar (4 kolom) semua kecuali yang pertama.
        */}
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 border-white/15 [&>*:nth-child(even)]:border-l lg:grid-cols-4 lg:[&>*]:border-l lg:[&>*:first-child]:border-l-0">
          {statistik.map((item) => (
            <div key={item.id} className="border-white/15 text-center">
              <dd className="font-serif text-3xl font-bold text-[var(--color-accent)] sm:text-4xl">
                {item.nilai}
              </dd>
              <dt className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------- Kegiatan ---------- */}
      <section
        id={idBagianKegiatan}
        className="scroll-mt-24 bg-[var(--color-primary)] px-6 py-20 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.02em] sm:text-5xl">
            <span className="block text-white">{kegiatan.judulAtas}</span>
            <span className="block text-[var(--color-accent)]">
              {kegiatan.judulBawah}
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            {kegiatan.deskripsi}
          </p>

          <GaleriKegiatan kartu={kartuKegiatan} />
        </div>
      </section>

      {/* ---------- Video profil ---------- */}
      <section className="bg-[var(--color-primary)] px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <IkonPutarKecil className="mx-auto h-8 w-8 text-[var(--color-accent)]" />

          <h2 className="mt-5 font-serif text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl">
            {videoProfil.judul}
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70">
            {videoProfil.deskripsi}
          </p>

          <div className="mt-10">
            <VideoProfil />
          </div>
        </div>
      </section>
    </>
  );
}