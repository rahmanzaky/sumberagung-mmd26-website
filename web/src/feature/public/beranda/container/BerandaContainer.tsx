import Image from 'next/image';
import { Suspense } from 'react';

import { videoProfil } from '../data';
import VideoProfil from './VideoProfil';
import StatistikDinamis from '../component/StatistikDinamis';
import StatistikSkeleton from '../component/StatistikSkeleton';
import BerandaKontenDinamis from '../component/BerandaKontenDinamis';
import BerandaKontenSkeleton from '../component/BerandaKontenSkeleton';
import BerandaHeroDinamis from '../component/BerandaHeroDinamis';
import BerandaHeroSkeleton from '../component/BerandaHeroSkeleton';

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

export default function BerandaContainer() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <Suspense fallback={<BerandaHeroSkeleton />}>
        <BerandaHeroDinamis />
      </Suspense>

      {/* ---------- Statistik ---------- */}
      <section
        aria-label="Statistik Desa Sumberagung"
        className="bg-[var(--color-primary-dark)] px-6 py-8 sm:px-8 lg:px-12"
      >
        <Suspense fallback={<StatistikSkeleton />}>
          <StatistikDinamis />
        </Suspense>
      </section>

      {/* ---------- Kegiatan & Berita ---------- */}
      <Suspense fallback={<BerandaKontenSkeleton />}>
        <BerandaKontenDinamis />
      </Suspense>

      {/* ---------- Kolaborasi Logo ---------- */}
      <section className="relative overflow-hidden bg-[var(--color-primary-dark)] px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Latar Belakang Dekoratif */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 opacity-20 blur-[100px]">
          <div className="h-[400px] w-[800px] rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary-light)]" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
              <span aria-hidden="true" className="h-px w-6 bg-[var(--color-accent)]" />
              Sinergi Membangun Desa
              <span aria-hidden="true" className="h-px w-6 bg-[var(--color-accent)]" />
            </p>
            <h2 className="mt-5 font-serif text-3xl font-bold tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
              Identitas & Kolaborasi
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Kolaborasi harmonis antara Tim Mahasiswa Membangun Desa (MMD) 
              dengan Pemerintah Desa Sumberagung, bersatu padu memajukan potensi dan kesejahteraan desa.
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:gap-16">
            
            {/* Card Logo KKN */}
            <div className="group relative w-full max-w-xs shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:bg-white/10">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44">
                <Image
                  src="/sumberagung-logo.png"
                  alt="Logo MMD Kelompok 48"
                  fill
                  className="object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="font-serif text-xl font-semibold text-white">MMD KELOMPOK 48</h3>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
                  FILKOM UB
                </p>
              </div>
            </div>

            {/* Ikon Penghubung (Plus) */}
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)] md:h-16 md:w-16">
              <svg 
                className="h-6 w-6 text-[var(--color-primary-dark)] md:h-8 md:w-8" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2.5} 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>

            {/* Card Logo Desa */}
            <div className="group relative w-full max-w-xs shrink-0 rounded-3xl border border-[var(--color-accent)]/30 bg-white/5 p-8 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white sm:h-44 sm:w-44">
                <Image
                  src="/desa_sumberagung_logo.jpeg"
                  alt="Logo Desa Sumberagung"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="font-serif text-xl font-semibold text-white">Desa Sumberagung</h3>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-[var(--color-accent)]">
                  Pemerintah Desa
                </p>
              </div>
            </div>

          </div>
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