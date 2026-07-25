'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { hero, idBagianKegiatan } from '../data';
import TombolGulir from './TombolGulir';

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

// Variants untuk stagger animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function BerandaHero() {
  return (
    <section className="relative isolate min-h-[560px] overflow-hidden lg:min-h-[640px]">
      {/* Gambar Latar dengan Animasi Slow Zoom */}
      <motion.div
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: 'easeOut' }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={hero.gambar.src}
          alt={hero.gambar.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Peredup agar teks tetap terbaca di atas langit terang */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:min-h-[640px] lg:px-12"
      >
        <motion.p variants={itemVariants} className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
          <span aria-hidden="true" className="h-px w-8 bg-[var(--color-accent)]" />
          {hero.label}
        </motion.p>

        <motion.h1 variants={itemVariants} className="mt-6 max-w-2xl font-serif text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
          {hero.judulAwal}
          <em className="text-[var(--color-accent)]">{hero.judulSorot}</em>
          {hero.judulAkhir}
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-6 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
          {hero.deskripsi}
        </motion.p>

        <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-4">
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
        </motion.div>
      </motion.div>
    </section>
  );
}
