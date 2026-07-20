'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { KartuKegiatan } from '../types';

/** Jarak antar kartu, harus sama dengan kelas gap-6 di bawah. */
const JARAK_KARTU = 24;

export default function GaleriKegiatan({ kartu }: { kartu: KartuKegiatan[] }) {
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
            setJumlahTitik(Math.max(1, Math.round(sisaGeser / langkah) + 1));
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

        const kurangiGerak = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        wadah.scrollTo({
            left: indeks * langkah,
            behavior: kurangiGerak ? 'auto' : 'smooth',
        });
    }

    return (
        <div className="mt-8">
            {/*
        tabIndex membuat area ini bisa digulir lewat papan ketik,
        karena kartunya sendiri tidak dapat difokus.
      */}
            <div
                ref={wadahRef}
                onScroll={tanganiGeser}
                role="region"
                aria-label="Galeri kegiatan desa, dapat digeser ke samping"
                tabIndex={0}
                className="sembunyikan-scrollbar -mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12"
            >
                <ul className="flex w-max gap-6">
                    {kartu.map((item) => (
                        <li
                            key={item.id}
                            data-kartu
                            className="w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[368px]"
                        >
                            <article className="relative aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-300 ease-out hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                                {item.gambar.src ? (
                                    <Image
                                        src={item.gambar.src}
                                        alt={item.gambar.alt}
                                        fill
                                        sizes="(min-width: 1024px) 368px, 80vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                        <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                                            Foto menyusul
                                        </span>
                                    </div>
                                )}

                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                                />

                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/75">
                                        {item.kategori}
                                    </p>
                                    <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-white">
                                        {item.judul}
                                    </h3>
                                </div>
                            </article>
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
                            aria-label={`Tampilkan kegiatan ke-${indeks + 1}`}
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
    );
}