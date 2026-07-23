import Image from 'next/image';
import type { ReactNode } from 'react';

import type { Kegiatan } from '../types';

/** Sorot frasa `sorot` di dalam `judul` dengan warna aksen, bila ditemukan. */
function judulDenganSorot(judul: string, sorot?: string): ReactNode {
    if (!sorot || !judul.includes(sorot)) return judul;

    const indeks = judul.indexOf(sorot);
    const sebelum = judul.slice(0, indeks);
    const sesudah = judul.slice(indeks + sorot.length);

    return (
        <>
            {sebelum}
            <span className="text-[var(--color-accent)]">{sorot}</span>
            {sesudah}
        </>
    );
}

export default function HeroKegiatan({ kegiatan }: { kegiatan: Kegiatan }) {
    return (
        <section className="relative isolate min-h-[420px] overflow-hidden lg:min-h-[520px]">
            {kegiatan.gambar.src ? (
                <Image
                    src={kegiatan.gambar.src}
                    alt={kegiatan.gambar.alt}
                    fill
                    priority
                    sizes="100vw"
                    className="-z-10 object-cover"
                />
            ) : (
                <div className="absolute inset-0 -z-10 flex items-center justify-center bg-[var(--color-primary-dark)]">
                    <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                        Foto menyusul
                    </span>
                </div>
            )}

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/10"
            />

            <div className="mx-auto flex min-h-[420px] max-w-6xl flex-col justify-end px-6 py-14 sm:px-8 lg:min-h-[520px] lg:px-12">
                <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    <span aria-hidden="true" className="h-px w-8 bg-[var(--color-accent)]" />
                    {kegiatan.kategori}
                </p>

                <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                    {judulDenganSorot(kegiatan.judul, kegiatan.highlightWord)}
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                    {kegiatan.subtitle}
                </p>
            </div>
        </section>
    );
}
