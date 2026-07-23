import Link from 'next/link';
import { Suspense } from 'react';

import KepalaBeritaDesa from './KepalaBeritaDesa';
import BeritaGridDinamis from '../component/BeritaGridDinamis';
import BeritaGridSkeleton from '../component/BeritaGridSkeleton';

export default function DaftarBeritaContainer() {
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

                    <Suspense fallback={<BeritaGridSkeleton />}>
                        <BeritaGridDinamis />
                    </Suspense>
                </div>
            </section>
        </>
    );
}
