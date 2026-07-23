import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import { muatKegiatan } from '../loader';

import type { DampakHasil, Gambar } from '../types';
import HeroKegiatan from './HeroKegiatan';

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

function IkonLokasi({ className }: { className?: string }) {
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
            <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.5" />
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

function IkonUnduh({ className }: { className?: string }) {
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
            <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
            <path d="M4 19h16" />
        </svg>
    );
}

function IkonKutip({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M7.5 6C4.5 6 2 8.5 2 11.5S4.5 17 7.5 17c.3 0 .6 0 .9-.1-.6 1.6-1.9 2.9-3.6 3.6l.6 1.5c3.4-1.3 5.6-4.5 5.6-8.5V11c0-2.8-1.6-5-3.5-5zm10 0c-3 0-5.5 2.5-5.5 5.5S14.5 17 17.5 17c.3 0 .6 0 .9-.1-.6 1.6-1.9 2.9-3.6 3.6l.6 1.5c3.4-1.3 5.6-4.5 5.6-8.5V11c0-2.8-1.6-5-3.5-5z" />
        </svg>
    );
}

function IkonTetesan({ className }: { className?: string }) {
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
            <path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11z" />
        </svg>
    );
}

function IkonKelompok({ className }: { className?: string }) {
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
            <circle cx="9" cy="8" r="3" />
            <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
            <circle cx="17" cy="9" r="2.5" />
            <path d="M15.5 12.3A5.5 5.5 0 0 1 21.5 19" />
        </svg>
    );
}

function IkonTren({ className }: { className?: string }) {
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
            <path d="m3 17 6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
        </svg>
    );
}

const ikonDampak: Record<DampakHasil['ikon'], (props: { className?: string }) => ReactElement> = {
    tetesan: IkonTetesan,
    kelompok: IkonKelompok,
    tren: IkonTren,
};

function FotoKegiatan({
    gambar,
    className,
    sizes,
}: {
    gambar: Gambar;
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

function FotoProfil({ foto }: { foto: Gambar }) {
    if (!foto.src) {
        return (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-deepdark)]">
                <IkonOrang className="h-5 w-5 text-white/40" />
            </div>
        );
    }

    return (
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={foto.src} alt={foto.alt} fill sizes="40px" className="object-cover" />
        </div>
    );
}

export default async function DetailKegiatanContainer({ id }: { id: string }) {
    const kegiatan = await muatKegiatan(id);
    if (!kegiatan) notFound();

    return (
        <>
            <HeroKegiatan kegiatan={kegiatan} />

            <section className="bg-[var(--color-primary)] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-6xl">
                    {/* Tentang Kegiatan + Detail Kegiatan */}
                    <div className="grid gap-10 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <h2 className="flex items-center gap-3 font-serif text-2xl font-bold text-[var(--color-accent)] sm:text-3xl">
                                <span aria-hidden="true" className="h-6 w-1 rounded-full bg-[var(--color-accent)]" />
                                Tentang Kegiatan
                            </h2>
                            <div className="mt-5 space-y-4 text-sm leading-relaxed text-white/80 sm:text-base">
                                {kegiatan.deskripsi.map((paragraf, indeks) => (
                                    <p key={indeks}>{paragraf}</p>
                                ))}
                            </div>
                        </div>

                        <aside className="lg:col-span-1">
                            <div className="rounded-lg bg-[var(--color-primary-dark)]/60 p-5">
                                <h3 className="text-base font-bold text-[var(--color-accent)]">
                                    Detail Kegiatan
                                </h3>

                                <dl className="mt-4 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <IkonKalender className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                                        <div>
                                            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                                                Tanggal
                                            </dt>
                                            <dd className="mt-0.5 text-sm text-white">{kegiatan.tanggal}</dd>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <IkonLokasi className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                                        <div>
                                            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                                                Lokasi
                                            </dt>
                                            <dd className="mt-0.5 text-sm text-white">{kegiatan.lokasi}</dd>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <IkonOrang className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                                        <div>
                                            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                                                Fasilitator
                                            </dt>
                                            <dd className="mt-0.5 text-sm text-white">{kegiatan.fasilitator}</dd>
                                        </div>
                                    </div>
                                </dl>

                                {kegiatan.unduhan.length > 0 && (
                                    <div className="mt-6 border-t border-white/10 pt-5">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                                            Unduhan Terkait
                                        </p>
                                        <div className="mt-3 space-y-2">
                                            {kegiatan.unduhan.map((item) => (
                                                <a
                                                    key={item.judul}
                                                    href={item.url}
                                                    className="flex items-center justify-between gap-3 rounded-md bg-[var(--color-primary-deepdark)]/60 px-4 py-3 text-sm text-white transition-colors hover:bg-[var(--color-primary-deepdark)]"
                                                >
                                                    {item.judul}
                                                    <IkonUnduh className="h-4 w-4 shrink-0 text-[var(--color-accent)]" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>

                    {/* Galeri + kutipan utama */}
                    {(kegiatan.galeri.length > 0 || kegiatan.kutipanUtama) && (
                        <div className="mt-14 grid gap-10 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <h2 className="text-xl font-bold text-white sm:text-2xl">
                                    Galeri Momen {kegiatan.kategori.split('•').pop()?.trim()}
                                </h2>

                                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    {kegiatan.galeri[0] && (
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-lg sm:col-span-1 sm:row-span-2">
                                            <FotoKegiatan
                                                gambar={kegiatan.galeri[0]}
                                                sizes="(min-width: 640px) 33vw, 100vw"
                                                className="absolute inset-0"
                                            />
                                        </div>
                                    )}
                                    {kegiatan.galeri[1] && (
                                        <div className="relative aspect-square overflow-hidden rounded-lg">
                                            <FotoKegiatan
                                                gambar={kegiatan.galeri[1]}
                                                sizes="(min-width: 640px) 33vw, 50vw"
                                                className="absolute inset-0"
                                            />
                                        </div>
                                    )}
                                    {kegiatan.galeri[2] && (
                                        <div className="relative aspect-square overflow-hidden rounded-lg">
                                            <FotoKegiatan
                                                gambar={kegiatan.galeri[2]}
                                                sizes="(min-width: 640px) 33vw, 50vw"
                                                className="absolute inset-0"
                                            />
                                        </div>
                                    )}
                                    {kegiatan.galeri[3] && (
                                        <div className="relative aspect-[21/9] overflow-hidden rounded-lg sm:col-span-2">
                                            <FotoKegiatan
                                                gambar={kegiatan.galeri[3]}
                                                sizes="(min-width: 640px) 66vw, 100vw"
                                                className="absolute inset-0"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {kegiatan.kutipanUtama && (
                                <div className="lg:col-span-1">
                                    <div className="rounded-lg bg-[var(--color-primary-dark)]/60 p-6">
                                        <IkonKutip className="h-6 w-6 text-[var(--color-accent)]" />
                                        <p className="mt-4 text-base italic leading-relaxed text-white/85">
                                            &ldquo;{kegiatan.kutipanUtama.teks}&rdquo;
                                        </p>
                                        <p className="mt-4 text-sm font-bold text-white">
                                            {kegiatan.kutipanUtama.nama}
                                        </p>
                                        <p className="text-xs uppercase tracking-[0.08em] text-white/50">
                                            {kegiatan.kutipanUtama.jabatan}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Dampak & Hasil Nyata */}
                    {kegiatan.dampakHasil.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-center font-serif text-2xl font-bold text-white sm:text-3xl">
                                Dampak &amp; Hasil Nyata
                            </h2>

                            <div className="mt-8 grid gap-6 sm:grid-cols-3">
                                {kegiatan.dampakHasil.map((item) => {
                                    const Ikon = ikonDampak[item.ikon];
                                    return (
                                        <div
                                            key={item.judul}
                                            className="rounded-lg bg-[var(--color-primary-dark)]/60 p-6"
                                        >
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-accent)] text-[var(--color-primary-dark)]">
                                                <Ikon className="h-5 w-5" />
                                            </span>
                                            <p className="mt-4 text-base font-bold text-white">{item.judul}</p>
                                            <p className="mt-1 text-sm leading-relaxed text-white/70">
                                                {item.deskripsi}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Suara Dari Warga */}
                    {kegiatan.testimoniWarga.length > 0 && (
                        <div className="mt-16 text-center">
                            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                                Suara Dari Warga
                            </h2>
                            <span
                                aria-hidden="true"
                                className="mx-auto mt-3 block h-0.5 w-12 bg-[var(--color-accent)]"
                            />

                            <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
                                {kegiatan.testimoniWarga.map((item) => (
                                    <div
                                        key={item.nama}
                                        className="rounded-lg bg-[var(--color-primary-dark)]/60 p-6"
                                    >
                                        <IkonKutip className="h-6 w-6 text-[var(--color-accent)]/40" />
                                        <p className="mt-3 text-sm italic leading-relaxed text-white/85">
                                            &ldquo;{item.kutipan}&rdquo;
                                        </p>
                                        <div className="mt-4 flex items-center gap-3">
                                            <FotoProfil foto={item.foto} />
                                            <div>
                                                <p className="text-sm font-bold text-white">{item.nama}</p>
                                                <p className="text-xs text-white/50">{item.jabatan}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
