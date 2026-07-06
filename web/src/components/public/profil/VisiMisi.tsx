'use client';

import { useState } from 'react';

const MISI = [
  'Menyelenggarakan pemerintahan desa yang bersih, transparan, dan akuntabel.',
  'Meningkatkan kualitas pelayanan publik yang cepat dan mudah diakses masyarakat.',
  'Mengembangkan potensi ekonomi lokal melalui pemberdayaan UMKM dan pertanian.',
  'Memajukan sektor pendidikan, kesehatan, dan sosial budaya masyarakat.',
  'Menjaga kelestarian lingkungan dan kearifan lokal desa.',
];

type Tab = 'visi' | 'misi';

export default function VisiMisi() {
  const [tab, setTab] = useState<Tab>('visi');

  return (
    <section className="bg-[var(--color-surface-dark)] py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="text-sm font-medium text-[var(--color-earth)] uppercase tracking-wider">
            Arah &amp; Tujuan
          </span>
          <h2 className="font-[var(--font-lora)] text-3xl font-bold text-[var(--color-primary)] mt-2">
            Visi &amp; Misi Desa
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-gray-100">
            {(['visi', 'misi'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                  tab === t
                    ? 'bg-[var(--color-primary)] text-white shadow'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Konten */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          {tab === 'visi' ? (
            <div className="text-center">
              <div className="text-5xl mb-6" aria-hidden="true">
                🎯
              </div>
              <p className="font-[var(--font-lora)] text-xl md:text-2xl text-[var(--color-primary)] leading-relaxed italic">
                &ldquo;Terwujudnya Desa Sumberagung yang Mandiri, Sejahtera, dan Berbudaya
                Berlandaskan Gotong Royong.&rdquo;
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {MISI.map((misi, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-accent-light)] text-[var(--color-primary-dark)] font-semibold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <p className="text-[var(--color-text-base)] leading-relaxed pt-1">{misi}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
