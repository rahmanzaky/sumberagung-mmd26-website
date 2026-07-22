import Image from 'next/image';
import Link from 'next/link';

import type { Berita } from '../types';

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

export default function BeritaCard({ berita }: { berita: Berita }) {
    return (
        <Link
            href={`/berita-desa/${berita.id}`}
            className="group block overflow-hidden rounded-lg bg-[var(--color-primary-dark)] transition-transform duration-300 ease-out hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                {berita.gambar.src ? (
                    <Image
                        src={berita.gambar.src}
                        alt={berita.gambar.alt}
                        fill
                        sizes="(min-width: 1024px) 368px, 80vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                        <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                            Foto menyusul
                        </span>
                    </div>
                )}
            </div>

            <div className="p-6">
                <p className="text-xs text-white/60">{berita.tanggal}</p>
                <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-white">
                    {berita.judul}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
                    Baca Selengkapnya
                    <IkonPanahKanan className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    );
}
