'use client';

import Image from 'next/image';
import { useState } from 'react';

import { videoProfil } from '../data';

function IkonPutar({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M9 7.5v9a.75.75 0 0 0 1.15.63l7-4.5a.75.75 0 0 0 0-1.26l-7-4.5A.75.75 0 0 0 9 7.5Z" />
        </svg>
    );
}

export default function VideoProfil() {
    const [diputar, setDiputar] = useState(false);
    const adaVideo = Boolean(videoProfil.videoId);

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-accent)]/50 bg-black/40">
            {diputar && adaVideo ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoProfil.videoId}?autoplay=1`}
                    title={`Video profil ${videoProfil.judul} Desa Sumberagung`}
                    allow="accelerometer; autoplay; clipped-media; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                />
            ) : (
                <>
                    {videoProfil.thumbnail.src ? (
                        <Image
                            src={videoProfil.thumbnail.src}
                            alt={videoProfil.thumbnail.alt}
                            fill
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                            <span className="text-xs uppercase tracking-[0.16em] text-white/35">
                                Cuplikan video menyusul
                            </span>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => setDiputar(true)}
                        disabled={!adaVideo}
                        aria-label={
                            adaVideo
                                ? 'Putar video profil Desa Sumberagung'
                                : 'Video profil belum tersedia'
                        }
                        className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-inset disabled:cursor-not-allowed"
                    >
                        <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-black/55 text-[var(--color-accent)] transition group-hover:scale-105 group-hover:bg-black/70 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                            <IkonPutar className="h-7 w-7" />
                        </span>
                    </button>
                </>
            )}
        </div>
    );
}