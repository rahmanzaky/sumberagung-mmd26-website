'use client';

import { useState } from 'react';

function IkonBagikan({ className }: { className?: string }) {
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
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 10.6 15.4 6.9M8.6 13.4l6.8 3.7" />
        </svg>
    );
}

function IkonTautan({ className }: { className?: string }) {
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
            <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.1" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1" />
        </svg>
    );
}

function IkonCentang({ className }: { className?: string }) {
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

const kelasTombolBulat =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]';

export default function BagikanBerita({ judul }: { judul: string }) {
    const [tersalin, setTersalin] = useState(false);

    async function bagikan() {
        if (typeof navigator !== 'undefined' && navigator.share) {
            try {
                await navigator.share({ title: judul, url: window.location.href });
            } catch {
                // Dibatalkan pengguna, abaikan.
            }
        } else {
            await salinTautan();
        }
    }

    async function salinTautan() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setTersalin(true);
            setTimeout(() => setTersalin(false), 2000);
        } catch {
            // Clipboard tidak tersedia, abaikan.
        }
    }

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={bagikan}
                aria-label="Bagikan berita"
                className={kelasTombolBulat}
            >
                <IkonBagikan className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={salinTautan}
                aria-label="Salin tautan berita"
                className={kelasTombolBulat}
            >
                {tersalin ? (
                    <IkonCentang className="h-4 w-4 text-[var(--color-accent)]" />
                ) : (
                    <IkonTautan className="h-4 w-4" />
                )}
            </button>
        </div>
    );
}
