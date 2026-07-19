import Image from 'next/image';

import { demografi } from '../data';
import JudulSubHalaman from './JudulSubHalaman';

function IkonStatistik({ jenis }: { jenis: string }) {
    const dasar = {
        className: 'h-5 w-5 text-[var(--color-accent)]/70',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        'aria-hidden': true,
    };

    if (jenis === 'kelompok') {
        return (
            <svg {...dasar}>
                <circle cx="9" cy="8" r="3" />
                <path d="M3 19a6 6 0 0 1 12 0" />
                <path d="M16 6a3 3 0 0 1 0 6" />
                <path d="M18 19a6 6 0 0 0-3-5.2" />
            </svg>
        );
    }

    return (
        <svg {...dasar}>
            <circle cx="12" cy="5" r="2.5" />
            <path d="M12 8v7" />
            <path d="M9 20l3-5 3 5" />
        </svg>
    );
}

export default function DemografisPublicContainer() {
    return (
        <div>
            <JudulSubHalaman judul={demografi.judul} deskripsi={demografi.deskripsi} />

            <div className="mx-auto mt-14 max-w-6xl">
                {/* Tiga kartu ringkasan */}
                <div className="grid gap-5 md:grid-cols-3">
                    {demografi.statistik.map((kartu) => (
                        <div
                            key={kartu.id}
                            className="rounded-xl border border-white/10 bg-[#0e1938] p-6"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                    {kartu.label}
                                </p>
                                <IkonStatistik jenis={kartu.ikon} />
                            </div>
                            <p className="mt-4 font-mono text-4xl font-bold text-white sm:text-5xl">
                                {kartu.nilai}
                            </p>
                            <p className="mt-3 text-sm text-white/60">{kartu.keterangan}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    {/* Tabel distribusi usia */}
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0e1938] lg:col-span-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-6 py-4">
                            <h3 className="font-[var(--font-lora)] text-base font-bold text-[var(--color-accent)]">
                                Distribusi Usia &amp; Gender
                            </h3>
                            <span className="text-xs text-white/50">
                                {demografi.pembaruan}
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/[0.03]">
                                        <th scope="col" className="px-6 py-3 font-medium text-[var(--color-accent)]">
                                            Usia
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium text-white/70">
                                            Wilayah
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium text-white/70">
                                            Laki-laki
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium text-white/70">
                                            Perempuan
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-medium text-[var(--color-accent)]">
                                            Jumlah
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {demografi.distribusiUsia.map((baris) => (
                                        <tr key={baris.usia} className="border-b border-white/5">
                                            <td className="px-6 py-3.5 font-mono text-white/85">
                                                {baris.usia}
                                            </td>
                                            <td className="px-6 py-3.5 text-white/70">
                                                {baris.wilayah}
                                            </td>
                                            <td className="px-6 py-3.5 font-mono text-white/70">
                                                {baris.lakiLaki}
                                            </td>
                                            <td className="px-6 py-3.5 font-mono text-white/70">
                                                {baris.perempuan}
                                            </td>
                                            <td className="px-6 py-3.5 font-mono font-bold text-[var(--color-accent)]">
                                                {baris.lakiLaki + baris.perempuan}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="px-6 py-4 text-center text-xs text-white/45">
                            {demografi.catatanTabel}
                        </p>
                    </div>

                    {/* Kolom kanan */}
                    <div className="flex flex-col gap-6">
                        {/* Tingkat pendidikan */}
                        <div className="rounded-xl border border-white/10 bg-[#0e1938] p-6">
                            <h3 className="font-[var(--font-lora)] text-base font-bold text-white">
                                Tingkat Pendidikan
                            </h3>

                            <ul className="mt-5 flex flex-col gap-4">
                                {demografi.pendidikan.map((jenjang) => (
                                    <li key={jenjang.label}>
                                        <div className="flex items-baseline justify-between gap-3">
                                            <span className="text-xs text-white/80">
                                                {jenjang.label}
                                            </span>
                                            <span className="text-xs font-bold text-[var(--color-accent)]">
                                                {jenjang.persen}%
                                            </span>
                                        </div>
                                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                            <div
                                                className="h-full rounded-full bg-[var(--color-accent)]"
                                                style={{ width: `${jenjang.persen}%` }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kartu luas wilayah */}
                        <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-white/10 bg-[#0e1938]">
                            {demografi.kartuLuas.gambar.src ? (
                                <Image
                                    src={demografi.kartuLuas.gambar.src}
                                    alt={demografi.kartuLuas.gambar.alt}
                                    fill
                                    sizes="(min-width: 1024px) 30vw, 100vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                    <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                                        Foto menyusul
                                    </span>
                                </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-6 pb-5 pt-12">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                                    {demografi.kartuLuas.label}
                                </p>
                                <p className="mt-1 font-mono text-2xl font-bold text-white">
                                    {demografi.kartuLuas.nilai}{' '}
                                    <span className="text-sm font-normal text-white/70">
                                        {demografi.kartuLuas.satuan}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}