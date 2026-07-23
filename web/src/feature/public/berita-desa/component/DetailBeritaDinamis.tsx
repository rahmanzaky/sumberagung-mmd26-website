import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { muatBeritaById, muatDaftarBerita } from '../loader';
import type { Berita, KotakFitur } from '../types';
import BagikanBerita from '../container/BagikanBerita';

function IkonKalender({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
    );
}

function IkonOrang({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
    );
}

function IkonPencarian({ className }: { className?: string }) {
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
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </svg>
    );
}

function IkonKilat({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
        </svg>
    );
}

function IkonPerisai({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

const ikonKotakFitur: Record<KotakFitur['ikon'], (props: { className?: string }) => ReactElement> = {
    kilat: IkonKilat,
    perisai: IkonPerisai,
};

async function ambilBeritaTerkait(berita: Berita): Promise<Berita[]> {
    const daftarBerita = await muatDaftarBerita();
    if (berita.terkaitIds?.length) {
        return berita.terkaitIds
            .map((id) => daftarBerita.find((item) => item.id === id))
            .filter((item): item is Berita => Boolean(item));
    }

    return daftarBerita.filter((item) => item.id !== berita.id).slice(0, 3);
}

function GambarBerita({
    gambar,
    className,
    sizes,
}: {
    gambar: Berita['gambar'];
    className?: string;
    sizes: string;
}) {
    if (!gambar.src) {
        return (
            <div className={`${className} flex items-center justify-center bg-white/5`}>
                <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                    Foto menyusul
                </span>
            </div>
        );
    }

    return (
        <Image
            src={gambar.src}
            alt={gambar.alt}
            fill
            sizes={sizes}
            className={`${className} object-cover`}
        />
    );
}

export default async function DetailBeritaDinamis({ id }: { id: string }) {
    const berita = await muatBeritaById(id);
    if (!berita) notFound();

    const beritaTerkait = await ambilBeritaTerkait(berita);

    return (
        <section className="bg-[var(--color-primary)] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-6xl">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm">
                    <Link href="/" className="hover:text-white">
                        Home
                    </Link>
                    <span aria-hidden="true">›</span>
                    <Link href="/berita-desa" className="hover:text-white">
                        Berita Desa
                    </Link>
                    <span aria-hidden="true">›</span>
                    <span className="font-medium text-[var(--color-accent)]">{berita.judul}</span>
                </nav>

                <div className="mt-8 grid gap-12 lg:grid-cols-3 lg:gap-10">
                    {/* Artikel */}
                    <article className="lg:col-span-2">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">
                                {berita.kategori}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
                                <IkonKalender className="h-4 w-4" />
                                {berita.tanggal}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
                                <IkonOrang className="h-4 w-4" />
                                {berita.penulis}
                            </span>
                        </div>

                        <h2 className="mt-5 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
                            {berita.judul}
                        </h2>

                        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg">
                            <GambarBerita
                                gambar={berita.gambar}
                                sizes="(min-width: 1024px) 66vw, 100vw"
                                className="absolute inset-0"
                            />
                            {berita.overlayTeks && (
                                <>
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                                    />
                                    <p className="absolute bottom-0 left-0 max-w-[70%] p-6 font-serif text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">
                                        {berita.overlayTeks}
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="prose-berita mt-8 space-y-5 text-sm leading-relaxed text-white/80 sm:text-base">
                            {berita.konten.map((paragraf, indeks) => (
                                <p
                                    key={indeks}
                                    className={
                                        indeks === 0
                                            ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[var(--color-accent)]"
                                            : undefined
                                    }
                                >
                                    {paragraf}
                                </p>
                            ))}
                        </div>

                        {berita.kutipan && (
                            <blockquote className="mt-8 border-l-4 border-[var(--color-accent)] bg-[var(--color-primary-dark)]/60 px-6 py-5">
                                <p className="text-lg italic leading-relaxed text-[var(--color-accent)]">
                                    &ldquo;{berita.kutipan.teks}&rdquo;
                                </p>
                                <cite className="mt-3 block text-sm not-italic text-white/60">
                                    — {berita.kutipan.atribusi}
                                </cite>
                            </blockquote>
                        )}

                        {berita.kotakFitur && berita.kotakFitur.length > 0 && (
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {berita.kotakFitur.map((kotak) => {
                                    const Ikon = ikonKotakFitur[kotak.ikon];
                                    return (
                                        <div
                                            key={kotak.judul}
                                            className="rounded-lg bg-[var(--color-primary-dark)]/60 p-5"
                                        >
                                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--color-accent)] text-[var(--color-primary-dark)]">
                                                <Ikon className="h-5 w-5" />
                                            </span>
                                            <p className="mt-3 text-base font-bold text-white">{kotak.judul}</p>
                                            <p className="mt-1 text-sm leading-relaxed text-white/70">
                                                {kotak.deskripsi}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Bagikan & tag */}
                        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                                    Bagikan Berita
                                </span>
                                <BagikanBerita judul={berita.judul} />
                            </div>

                            {berita.tags && berita.tags.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {berita.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-medium text-[var(--color-accent)]">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6 lg:col-span-1">
                        <div className="rounded-lg bg-[var(--color-primary-dark)]/60 p-5">
                            <h3 className="text-base font-bold text-white">Cari Berita</h3>
                            <div className="mt-3 flex items-center gap-2 rounded-md border border-white/15 bg-[var(--color-primary-deepdark)]/60 px-3 py-2">
                                <input
                                    type="text"
                                    placeholder="Ketik kata kunci..."
                                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                                />
                                <button
                                    type="button"
                                    aria-label="Cari"
                                    className="text-white/60 transition-colors hover:text-[var(--color-accent)]"
                                >
                                    <IkonPencarian className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="flex items-center gap-2 text-base font-bold text-white">
                                <span aria-hidden="true" className="h-px w-5 bg-[var(--color-accent)]" />
                                Berita Terkait
                            </h3>

                            <ul className="mt-4 space-y-4">
                                {beritaTerkait.map((item) => (
                                    <li key={item.id}>
                                        <Link href={`/berita-desa/${item.id}`} className="group flex gap-3">
                                            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
                                                <GambarBerita
                                                    gambar={item.gambar}
                                                    sizes="80px"
                                                    className="absolute inset-0"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-accent)]">
                                                    {item.kategori}
                                                </p>
                                                <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-white group-hover:text-[var(--color-accent)]">
                                                    {item.judul}
                                                </p>
                                                <p className="mt-1 text-xs text-white/50">{item.tanggal}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
