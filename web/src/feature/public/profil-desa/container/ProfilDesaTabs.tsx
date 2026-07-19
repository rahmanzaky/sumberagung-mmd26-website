'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { tabProfil } from '../data';

export default function ProfilDesaTabs() {
    const pathname = usePathname();

    return (
        <nav aria-label="Sub-halaman Profil Desa" className="mt-10 flex justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-black/40 p-1.5">
                {tabProfil.map((tab) => {
                    const aktif = pathname === tab.href;

                    return (
                        <li key={tab.href}>
                            <Link
                                href={tab.href}
                                aria-current={aktif ? 'page' : undefined}
                                className={`block rounded-full px-5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${aktif
                                        ? 'border border-[var(--color-accent)] text-[var(--color-accent)]'
                                        : 'border border-transparent text-white/70 hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}