'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import { beritaSeksiBeranda, daftarBerita } from '../data';
import BeritaCard from './BeritaCard';

/** Jarak antar kartu, harus sama dengan kelas gap-6 di bawah. */
const JARAK_KARTU = 24;

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

const kelasTombolPanah =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-30';

export default function BeritaDesaSection() {
    const wadahRef = useRef<HTMLDivElement>(null);
    const [indeksAktif, setIndeksAktif] = useState(0);
    const [jumlahTitik, setJumlahTitik] = useState(1);

    /** Lebar satu langkah geser: lebar kartu + jarak. */
    const ambilLangkah = useCallback(() => {
        const wadah = wadahRef.current;
        const kartu = wadah?.querySelector<HTMLElement>('[data-kartu]');
        return kartu ? kartu.offsetWidth + JARAK_KARTU : 0;
    }, []);

    /** Hitung ulang jumlah titik setiap ukuran wadah berubah. */
    useEffect(() => {
        const wadah = wadahRef.current;
        if (!wadah) return;

        const hitung = () => {
            const langkah = ambilLangkah();
            if (!langkah) return;

            const sisaGeser = wadah.scrollWidth - wadah.clientWidth;
            // ceil, bukan round, supaya sisa geser sekecil apa pun tetap menghasilkan
            // minimal 2 titik alih-alih dibulatkan turun ke 1 (carousel terlihat statis).
            setJumlahTitik(sisaGeser <= 1 ? 1 : Math.ceil(sisaGeser / langkah) + 1);
        };

        hitung();

        const pengamat = new ResizeObserver(hitung);
        pengamat.observe(wadah);
        return () => pengamat.disconnect();
    }, [ambilLangkah]);

    function tanganiGeser() {
        const wadah = wadahRef.current;
        const langkah = ambilLangkah();
        if (!wadah || !langkah) return;

        setIndeksAktif(Math.round(wadah.scrollLeft / langkah));
    }

    function menujuKartu(indeks: number) {
        const wadah = wadahRef.current;
        const langkah = ambilLangkah();
        if (!wadah || !langkah) return;

        const indeksTujuan = Math.min(Math.max(indeks, 0), jumlahTitik - 1);
        const kurangiGerak = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        wadah.scrollTo({
            left: indeksTujuan * langkah,
            behavior: kurangiGerak ? 'auto' : 'smooth',
        });
    }

    return (
        <section className="bg-[var(--color-primary)] px-6 pb-20 sm:px-8 lg:px-12 lg:pb-24">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <h2 className="font-serif text-4xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-5xl">
                        {beritaSeksiBeranda.judul}
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => menujuKartu(indeksAktif - 1)}
                                disabled={indeksAktif === 0}
                                aria-label="Berita sebelumnya"
                                className={kelasTombolPanah}
                            >
                                <IkonPanahKanan className="h-4 w-4 rotate-180" />
                            </button>
                            <button
                                type="button"
                                onClick={() => menujuKartu(indeksAktif + 1)}
                                disabled={indeksAktif >= jumlahTitik - 1}
                                aria-label="Berita berikutnya"
                                className={kelasTombolPanah}
                            >
                                <IkonPanahKanan className="h-4 w-4" />
                            </button>
                        </div>

                        <Link
                            href="/berita-desa"
                            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                        >
                            Lihat Semua Berita
                            <IkonPanahKanan className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>

                <div className="mt-8">
                    <div
                        ref={wadahRef}
                        onScroll={tanganiGeser}
                        role="region"
                        aria-label="Berita desa terbaru, dapat digeser ke samping"
                        tabIndex={0}
                        className="sembunyikan-scrollbar -mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
                    >
                        <ul className="flex w-max gap-6">
                            {daftarBerita.map((item) => (
                                <li
                                    key={item.id}
                                    data-kartu
                                    className="w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[368px]"
                                >
                                    <BeritaCard berita={item} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Penanda titik */}
                    <div className="mt-8 flex justify-center gap-2.5">
                        {Array.from({ length: jumlahTitik }).map((_, indeks) => {
                            const aktif = indeks === indeksAktif;

                            return (
                                <button
                                    key={indeks}
                                    type="button"
                                    onClick={() => menujuKartu(indeks)}
                                    aria-label={`Tampilkan berita ke-${indeks + 1}`}
                                    aria-current={aktif ? 'true' : undefined}
                                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] motion-reduce:transition-none ${aktif
                                        ? 'w-6 bg-[var(--color-accent)]'
                                        : 'w-2 bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
