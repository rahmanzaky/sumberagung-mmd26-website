import Image from 'next/image';
import Link from 'next/link';

import type { Konten } from '@/feature/public/konten/types';

export default function KartuKegiatan({ data }: { data: Konten }) {
    return (
        <Link
            href={`/detail/${data.slug}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-lg transition-transform duration-300 ease-out hover:-translate-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
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

            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/75">
                    {data.kategori}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold leading-snug text-white">
                    {data.judul}
                </h3>
            </div>
        </Link>
    );
}