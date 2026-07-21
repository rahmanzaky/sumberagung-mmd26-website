import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
    cariKonten,
    formatTanggal,
    semuaKonten,
} from '@/feature/public/konten/data';

type Params = { params: Promise<{ slug: string }> };

/** Semua slug dibuat saat build agar halamannya statis. */
export function generateStaticParams() {
    return semuaKonten.map((konten) => ({ slug: konten.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const konten = cariKonten(slug);

    if (!konten) return { title: 'Halaman tidak ditemukan' };

    return {
        title: `${konten.judul} | Desa Sumberagung`,
        description: konten.ringkasan,
    };
}

export default async function DetailPage({ params }: Params) {
    const { slug } = await params;
    const konten = cariKonten(slug);

    if (!konten) notFound();

    return (
        <article className="bg-[var(--color-primary-deepdark)] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                >
                    <span aria-hidden="true">&larr;</span>
                    Kembali ke Beranda
                </Link>

                <header className="mt-8">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        {konten.kategori}
                        <span aria-hidden="true" className="h-3 w-px bg-white/25" />
                        <time dateTime={konten.tanggal} className="font-medium text-white/60">
                            {formatTanggal(konten.tanggal)}
                        </time>
                    </p>

                    <h1 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                        {konten.judul}
                    </h1>

                    <p className="mt-5 text-base leading-relaxed text-white/70">
                        {konten.ringkasan}
                    </p>
                </header>

                <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl">
                    {konten.gambar.src ? (
                        <Image
                            src={konten.gambar.src}
                            alt={konten.gambar.alt}
                            fill
                            priority
                            sizes="(min-width: 768px) 768px, 100vw"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                            <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                                Foto menyusul
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-10 flex flex-col gap-5">
                    {konten.isi.map((paragraf, indeks) => (
                        <p
                            key={indeks}
                            className="text-base leading-relaxed text-white/80"
                        >
                            {paragraf}
                        </p>
                    ))}
                </div>
            </div>
        </article>
    );
}