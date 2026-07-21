'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Jarak antar kartu, harus sama dengan kelas gap-6 di bawah. */
const JARAK_KARTU = 24;

type KaruselProps = {
    /** Keterangan area untuk pembaca layar. */
    label: string;
    /** Daftar <li data-kartu> yang akan digeser. */
    children: React.ReactNode;
};

export default function Karusel({ label, children }: KaruselProps) {
    const wadahRef = useRef<HTMLDivElement>(null);
    const [indeksAktif, setIndeksAktif] = useState(0);
    const [jumlahTitik, setJumlahTitik] = useState(1);

    /** Lebar satu langkah geser: lebar kartu + jarak. */
    const ambilLangkah = useCallback(() => {
        const kartu = wadahRef.current?.querySelector<HTMLElement>('[data-kartu]');
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
            {/* py-4 memberi ruang agar kartu yang terangkat saat hover tidak terpotong */}
            <div
                ref={wadahRef}
                onScroll={tanganiGeser}
                role="region"
                aria-label={label}
                tabIndex={0}
                className="-mx-6 snap-x snap-mandatory scroll-px-6 overflow-x-auto px-6 py-4 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:-mx-12 lg:scroll-px-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
            >
                <ul className="flex w-max gap-6">{children}</ul>
            </div>

            {/* Penanda batang */}
            <div className="mt-6 flex justify-center gap-2.5">
                {Array.from({ length: jumlahTitik }).map((_, indeks) => {
                    const aktif = indeks === indeksAktif;

                    return (
                        <button
                            key={indeks}
                            type="button"
                            onClick={() => menujuKartu(indeks)}
                            aria-label={`Tampilkan kartu ke-${indeks + 1}`}
                            aria-current={aktif ? 'true' : undefined}
                            className={`h-1.5 w-8 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] motion-reduce:transition-none ${aktif
                                    ? 'bg-[var(--color-accent)]'
                                    : 'bg-white/25 hover:bg-white/40'
                                }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}