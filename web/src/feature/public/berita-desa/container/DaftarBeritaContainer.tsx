import Link from 'next/link';

import { muatDaftarBerita } from '../loader';
import BeritaCard from './BeritaCard';
import KepalaBeritaDesa from './KepalaBeritaDesa';

export default async function DaftarBeritaContainer() {
    const daftarBerita = await muatDaftarBerita();

    return (
        <>
            <KepalaBeritaDesa />

            <section className="bg-[var(--color-primary)] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                <div className="mx-auto max-w-6xl">
                    <nav
                        aria-label="Breadcrumb"
                        className="flex flex-wrap items-center gap-2 text-xs text-white/60 sm:text-sm"
                    >
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <span aria-hidden="true">›</span>
                        <span className="font-medium text-[var(--color-accent)]">Berita Desa</span>
                    </nav>

                    {daftarBerita.length === 0 ? (
                        <p className="mt-10 text-center text-sm text-white/60">
                            Belum ada berita untuk ditampilkan.
                        </p>
                    ) : (
                        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {daftarBerita.map((item) => (
                                <BeritaCard key={item.id} berita={item} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
