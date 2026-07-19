import Image from 'next/image';

import { geografi } from '../data';
import JudulSubHalaman from './JudulSubHalaman';

function IkonPin({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function IkonLahan({ jenis }: { jenis: string }) {
    const dasar = {
        className: 'h-5 w-5',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
    };

    if (jenis === 'perbukitan') {
        return (
            <svg {...dasar}>
                <path d="M3 18l5-8 4 5 3-4 6 7z" />
            </svg>
        );
    }

    if (jenis === 'hutan') {
        return (
            <svg {...dasar}>
                <path d="M12 3l4 6h-3l3 5H8l3-5H8z" />
                <path d="M12 14v7" />
            </svg>
        );
    }

    return (
        <svg {...dasar}>
            <path d="M3 17h18" />
            <path d="M6 17v-4l4-3 4 3v4" />
            <circle cx="8" cy="19" r="1.5" />
            <circle cx="16" cy="19" r="1.5" />
        </svg>
    );
}

export default function GeografisPublicContainer() {
    const { letak, peta, batas, luas } = geografi;

    return (
        <div>
            <JudulSubHalaman judul={geografi.judul} deskripsi={geografi.deskripsi} />

            <div className="mx-auto mt-14 max-w-6xl">
                {/* Letak astronomis + peta */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0e1938] p-7 sm:p-9">
                        <h3 className="flex items-center gap-2.5 font-[var(--font-lora)] text-base font-bold text-[var(--color-accent)]">
                            <IkonPin className="h-5 w-5" />
                            {letak.judul}
                        </h3>

                        <p className="mt-5 text-sm leading-relaxed text-white/80">
                            {letak.paragrafPembuka}{' '}
                            <code className="rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 font-mono text-[13px] text-[var(--color-accent)]">
                                {letak.lintang}
                            </code>{' '}
                            dan{' '}
                            <code className="rounded bg-[var(--color-accent)]/10 px-1.5 py-0.5 font-mono text-[13px] text-[var(--color-accent)]">
                                {letak.bujur}
                            </code>
                            .
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-white/80">
                            {letak.paragrafLanjutan}
                        </p>

                        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6">
                            <div>
                                <dt className="text-xs uppercase tracking-[0.14em] text-white/50">
                                    Ketinggian
                                </dt>
                                <dd className="mt-1 font-mono text-3xl font-bold text-white">
                                    {letak.ketinggian.nilai}
                                    <span className="ml-1 text-xs font-normal text-white/60">
                                        {letak.ketinggian.satuan}
                                    </span>
                                </dd>
                            </div>
                            <div className="border-l border-white/10 pl-10">
                                <dt className="text-xs uppercase tracking-[0.14em] text-white/50">
                                    Posisi
                                </dt>
                                <dd className="mt-1 font-mono text-2xl font-bold text-white sm:text-3xl">
                                    {letak.posisi}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Peta */}
                    <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-white/10 bg-[#0e1938]">
                        {peta.gambar.src ? (
                            <Image
                                src={peta.gambar.src}
                                alt={peta.gambar.alt}
                                fill
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                                    Peta menyusul
                                </span>
                            </div>
                        )}

                        <div className="absolute inset-x-4 bottom-4 rounded-lg border border-[var(--color-accent)]/30 bg-black/70 px-5 py-4 backdrop-blur-sm">
                            <p className="text-sm font-bold text-[var(--color-accent)]">
                                {peta.judulKeterangan}
                            </p>
                            <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                                {peta.keterangan}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Batas wilayah */}
                <div className="mt-16">
                    <div className="flex items-center gap-6">
                        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
                        <div className="text-center">
                            <h3 className="font-[var(--font-lora)] text-lg font-bold text-white/90">
                                {batas.judul}
                            </h3>
                            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/50">
                                {batas.subjudul}
                            </p>
                        </div>
                        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
                    </div>

                    <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {batas.daftar.map((sisi) => (
                            <div
                                key={sisi.arah}
                                className="rounded-lg border border-white/10 bg-[#0e1938] px-6 py-5"
                            >
                                <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]/80">
                                    {sisi.arah}
                                </dt>
                                <dd className="mt-3 font-[var(--font-lora)] text-base text-white">
                                    {sisi.desa}
                                    <span className="mt-1 block text-xs text-white/55">
                                        {sisi.kecamatan}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Statistik luas wilayah */}
                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    <div>
                        <h3 className="font-[var(--font-lora)] text-base font-bold text-[var(--color-accent)]">
                            {luas.judul}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-white/70">
                            {luas.deskripsi}
                        </p>

                        <div className="mt-7 rounded-xl border border-white/15 px-6 py-6">
                            <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                                {luas.total.label}
                            </p>
                            <p className="mt-2 font-mono text-4xl font-bold text-white">
                                {luas.total.nilai}
                                <span className="ml-2 text-base font-normal text-white/60">
                                    {luas.total.satuan}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3 lg:col-span-2">
                        {luas.rincian.map((lahan) => (
                            <div
                                key={lahan.id}
                                className="rounded-xl border border-white/10 bg-[#0e1938] p-6"
                            >
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                                    <IkonLahan jenis={lahan.ikon} />
                                </span>

                                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[var(--color-accent)]">
                                    {lahan.label}
                                </p>
                                <p className="mt-2 font-mono text-3xl font-bold text-white">
                                    {lahan.luas}
                                    <span className="ml-1.5 text-xs font-normal text-white/60">
                                        {lahan.satuan}
                                    </span>
                                </p>

                                <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-[var(--color-accent)]"
                                        style={{ width: `${lahan.persen}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}