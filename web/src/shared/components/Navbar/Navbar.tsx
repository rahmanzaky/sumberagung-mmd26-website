'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ajukanSuratHref, loginHref, navLinks } from './nav-links';

/** Ikon dokumen pada tombol "Ajukan Surat". */
function DocumentIcon({ className }: { className?: string }) {
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
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9" />
      <path d="M14 3v5a1 1 0 0 0 1 1h5" />
      <path d="M9 13h5" />
      <path d="M9 17h3" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-primary-dark)]';

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-light)] to-[var(--color-primary-dark)] shadow-lg shadow-black/15">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-24 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Beranda Desa Sumberagung"
          className={`flex shrink-0 items-center gap-2.5 rounded-md ${focusRing}`}
        >
          <Image
            src="/vercel.svg"
            alt=""
            width={40}
            height={40}
            priority
            className="h-8 w-8 lg:h-10 lg:w-10"
          />
          <span className="font-serif text-2xl leading-none tracking-wide text-[var(--color-accent)] lg:text-[2rem]">
            Sumberagung
          </span>
        </Link>

        {/* Navigasi desktop */}
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-10">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative block rounded-sm py-2 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors ${focusRing} ${active ? 'text-white' : 'text-white/80 hover:text-white'
                      }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-[var(--color-accent)] transition-transform duration-300 motion-reduce:transition-none ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Aksi kanan (desktop) */}
        <div className="hidden shrink-0 items-center gap-6 lg:flex">
          <Link
            href={loginHref}
            className={`rounded-sm text-[13px] font-medium uppercase tracking-[0.14em] text-white/90 transition-colors hover:text-white ${focusRing}`}
          >
            Login
          </Link>

          <Link
            href={ajukanSuratHref}
            className={`inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary-dark)] shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-light)] hover:shadow-lg active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none ${focusRing}`}
          >
            Ajukan Surat
            <DocumentIcon className="h-4 w-4" />
          </Link>
        </div>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden ${focusRing}`}
        >
          <span aria-hidden="true" className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
            />
            <span
              className={`absolute top-1/2 left-0 block h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200 motion-reduce:transition-none ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 rounded-full bg-current transition-transform duration-300 motion-reduce:transition-none ${isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
            />
          </span>
        </button>
      </div>

      {/* Panel menu mobile */}
      <div
        id="menu-mobile"
        hidden={!isMenuOpen}
        className="border-t border-white/10 bg-[var(--color-primary-dark)] lg:hidden"
      >
        <nav aria-label="Navigasi utama (mobile)" className="px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 rounded-md px-2 py-3.5 text-sm font-medium uppercase tracking-[0.14em] transition-colors ${focusRing} ${active
                        ? 'text-[var(--color-accent)]'
                        : 'text-white/85 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-4 w-0.5 rounded-full transition-colors ${active ? 'bg-[var(--color-accent)]' : 'bg-transparent'
                        }`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <Link
              href={loginHref}
              className={`rounded-md px-2 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white/85 transition-colors hover:bg-white/5 hover:text-white ${focusRing}`}
            >
              Login
            </Link>

            <Link
              href={ajukanSuratHref}
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-primary-dark)] shadow-md transition-colors hover:bg-[var(--color-accent-light)] ${focusRing}`}
            >
              Ajukan Surat
              <DocumentIcon className="h-4 w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}