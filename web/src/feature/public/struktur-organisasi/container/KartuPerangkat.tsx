import Image from 'next/image';

import type { Perangkat } from '../types';

/** Ikon orang, dipakai selama foto belum tersedia. */
function IkonOrang({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="8.5" r="3.5" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
    );
}

function Foto({ data, ukuran }: { data: Perangkat; ukuran: string }) {
    const kelas = `${ukuran} shrink-0 overflow-hidden rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-primary-dark)]`;

    if (!data.foto.src) {
        return (
            <div className={`${kelas} flex items-center justify-center`}>
                <IkonOrang className="h-1/2 w-1/2 text-[var(--color-accent)]/50" />
            </div>
        );
    }

    return (
        <div className={`relative ${kelas}`}>
            <Image
                src={data.foto.src}
                alt={data.foto.alt}
                fill
                sizes="80px"
                className="object-cover"
            />
        </div>
    );
}

function Keterangan({
    data,
    align,
}: {
    data: Perangkat;
    align: 'left' | 'center';
}) {
    return (
        <div className={align === 'center' ? 'text-center' : 'text-left'}>
            <p className="text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-white">
                {data.jabatan}
            </p>
            {data.keterangan && (
                <p className="mt-1 text-[10px] uppercase leading-tight tracking-[0.06em] text-white/70">
                    {data.keterangan}
                </p>
            )}
            {data.nama && (
                <p className="mt-1 text-[11px] leading-tight text-white/70">
                    {data.nama}
                </p>
            )}
        </div>
    );
}

const kartuDasar =
    'rounded-lg border border-[var(--color-accent)]/40 bg-[var(--color-primary-dark)]/60 shadow-sm';

/** Varian mendatar: foto di kiri, keterangan di kanan. */
export function KartuMendatar({ data }: { data: Perangkat }) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 ${kartuDasar}`}>
            <Foto data={data} ukuran="h-14 w-14" />
            <Keterangan data={data} align="left" />
        </div>
    );
}

/** Varian menegak: foto di atas, keterangan di bawah. */
export function KartuMenegak({ data }: { data: Perangkat }) {
    return (
        <div
            className={`flex flex-col items-center gap-2 px-3 pb-4 pt-8 ${kartuDasar}`}
        >
            <Foto data={data} ukuran="h-14 w-14" />
            <Keterangan data={data} align="center" />
        </div>
    );
}