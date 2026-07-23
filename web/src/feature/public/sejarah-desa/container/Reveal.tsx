'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    /** Jeda animasi dalam milidetik. */
    delay?: number;
};

/**
 * Membungkus konten agar muncul perlahan saat masuk viewport.
 * Otomatis langsung tampil bila browser tidak mendukung
 * IntersectionObserver atau pengguna memilih reduce motion.
 */
export default function Reveal({
    children,
    className = '',
    delay = 0,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Compute fallback eagerly so we never need to call setState
    // synchronously inside an effect.
    const [tampil, setTampil] = useState(() => {
        if (typeof window === 'undefined') return false;
        const kurangiGerak = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        return kurangiGerak || typeof IntersectionObserver === 'undefined';
    });

    useEffect(() => {
        // Already visible (fallback path) — nothing to observe.
        if (tampil) return;

        const elemen = ref.current;
        if (!elemen) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTampil(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
        );

        observer.observe(elemen);
        return () => observer.disconnect();
    }, [tampil]);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-700 ease-out ${tampil ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                } ${className}`}
        >
            {children}
        </div>
    );
}