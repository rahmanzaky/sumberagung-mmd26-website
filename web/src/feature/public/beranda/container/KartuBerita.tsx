import Image from 'next/image';
import Link from 'next/link';

import { formatTanggal } from '@/feature/public/konten/data';
import type { Konten } from '@/feature/public/konten/types';

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

export default function KartuBerita({ data }: { data: Konten }) {
    return (
        <article className="group relative h-full overflow-hidden rounded-lg bg-[#0e1938] transition-transform duration-300 ease-out hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                {data.gambar.src ? (
                    <Image
                        src={data.gambar.src}
                        alt={data.gambar.alt}
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

                <span className="absolute bottom-3 left-3 rounded border-l-2 border-[var(--color-accent)] bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    {data.kategori}
                </span>
            </div>

            <div className="p-6">
                <p className="text-xs text-white/55">
                    <time dateTime={data.tanggal}>{formatTanggal(data.tanggal)}</time>
                </p>

                <h3 className="mt-3 font-serif text-xl font-bold leading-snug text-white">
                    {/*
            Tautan membungkus seluruh kartu lewat ::after,
            sehingga area kliknya luas tetapi tetap satu tautan.
          */}
                    <Link
                        href={`/berita-desa/${data.id ?? data.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)]"
                    >
                        {data.judul}
                    </Link>
                </h3>

                <p className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    Baca Selengkapnya
                    <IkonPanahKanan className="h-3.5 w-3.5" />
                </p>
            </div>
        </article>
    );
}