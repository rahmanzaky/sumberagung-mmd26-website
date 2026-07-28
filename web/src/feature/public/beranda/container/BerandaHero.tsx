'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { idBagianKegiatan } from '../data';
import TombolGulir from './TombolGulir';
import type { HeroSliderDTO } from '@/repository/hero-slider/dto';

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

// Variants untuk stagger animation teks
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 },
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

type Props = {
  slides: HeroSliderDTO[];
};

export default function BerandaHero({ slides }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 detik per slide
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative isolate min-h-[560px] overflow-hidden lg:min-h-[640px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          {/* Gambar Latar dengan Animasi Slow Zoom */}
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={currentSlide.urlGambar || '/latar-sunset.png'}
              alt="Hero Background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          {/* Peredup agar teks tetap terbaca di atas langit terang */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-6 py-20 sm:px-8 lg:min-h-[640px] lg:px-12"
        >
          <motion.p variants={itemVariants} className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
            <span aria-hidden="true" className="h-px w-8 bg-[var(--color-accent)]" />
            Desa Wisata & Budaya
          </motion.p>

          <motion.h1 variants={itemVariants} className="mt-6 max-w-2xl font-serif text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl drop-shadow-md">
            {currentSlide.judulAwal}
            <em className="text-[var(--color-accent)] not-italic">{currentSlide.judulSorot}</em>
            {currentSlide.judulAkhir}
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base drop-shadow-md">
            {currentSlide.deskripsi}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-4">
            {currentSlide.tombolTeks && currentSlide.tombolTautan && (
              <Link
                href={currentSlide.tombolTautan}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary-dark)] transition-colors hover:bg-[var(--color-accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {currentSlide.tombolTeks}
                <IkonPanahKanan className="h-4 w-4" />
              </Link>
            )}

            <TombolGulir
              targetId={idBagianKegiatan}
              className="inline-flex items-center rounded-md border border-[var(--color-accent)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white bg-black/20 backdrop-blur-sm"
            >
              Lihat Kegiatan
            </TombolGulir>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Indicators */}
      {slides && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-[var(--color-accent)]' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
