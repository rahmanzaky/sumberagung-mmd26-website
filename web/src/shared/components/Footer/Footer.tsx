import Image from 'next/image';
import Link from 'next/link';

import {
  contactInfo,
  footerMotto,
  footerTagline,
  quickLinks as defaultQuickLinks,
} from './footer-links';
import type { Pengaturan } from '@/repository/pengaturan/dto';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-deep)]';

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 7.6 5.1a1.6 1.6 0 0 0 1.8 0L20.5 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/** Judul kolom: kecil, kapital, berjarak lebar. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white">{children}</h2>;
}

export default function Footer({ pengaturan }: { pengaturan?: Pengaturan }) {
  const year = new Date().getFullYear();

  const namaSitus = pengaturan?.namaSitus || 'Sumberagung';
  const logo = pengaturan?.urlLogo || '/sumberagung-logo.png';
  const namaDesa = pengaturan?.namaDesa || 'Sumberagung';

  const quickLinks = pengaturan
    ? [
        { href: '/profil-desa/visi-misi', label: pengaturan.footerTautan1 || 'Visi & Misi' },
        { href: '/sejarah-desa', label: pengaturan.footerTautan2 || 'Sejarah Desa' },
        { href: '/struktur-organisasi', label: pengaturan.footerTautan3 || 'Struktur Organisasi' },
        { href: '/buku-tamu', label: pengaturan.footerTautan4 || 'Buku Tamu' },
      ]
    : defaultQuickLinks;

  const address = pengaturan
    ? [
        pengaturan.alamatKantor,
        `Kec. ${pengaturan.kecamatan}, Kab. ${pengaturan.kabupaten}`,
        pengaturan.provinsi,
      ]
    : contactInfo.address;

  const email = pengaturan?.emailResmi || contactInfo.email;
  const noWa = pengaturan?.noWaResmi || '0812-0000-0000';
  const jamMulai = pengaturan?.jamLayananMulai || '08:00';
  const jamSelesai = pengaturan?.jamLayananSelesai || '13:00';

  return (
    <footer className="bg-[var(--color-surface-deep)] text-white">
      {/* Garis biru di tepi atas, menyambung nuansa navbar */}
      <div
        aria-hidden="true"
        className="h-1.5 bg-gradient-to-r from-[var(--color-primary-dark)] via-[var(--color-primary-light)] to-[var(--color-primary-dark)]"
      />

      <div className="w-full px-6 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Kolom 1 — identitas desa */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="Beranda Desa Sumberagung"
              className={`inline-flex items-center gap-2.5 rounded-md ${focusRing}`}
            >
              <Image src={logo} alt="" width={512} height={512} className="h-9 w-auto" />
              <span className="font-serif text-2xl font-semibold leading-[1.25] tracking-[-0.05em] text-[var(--color-accent)] lg:text-3xl">
                {namaSitus}
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">{footerTagline}</p>

            <p className="mt-8 text-xs text-white/60">
              © {year} Pemerintah Desa {namaDesa}. {footerMotto}
            </p>
          </div>

          {/* Kolom 2 — tautan cepat */}
          <nav aria-labelledby="footer-tautan" className="lg:col-span-3">
            <div id="footer-tautan">
              <ColumnHeading>Tautan Cepat</ColumnHeading>
            </div>

            <ul className="mt-5 flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`rounded-sm text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-light)] hover:underline hover:underline-offset-4 ${focusRing}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kolom 3 — kontak */}
          <div className="lg:col-span-4">
            <ColumnHeading>Hubungi Kami</ColumnHeading>

            <address className="mt-5 flex flex-col gap-4 not-italic">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                <LocationIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <span>
                  {address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>

              <p className="flex items-start gap-3 text-sm leading-relaxed">
                <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <a
                  href={`mailto:${email}`}
                  className={`rounded-sm text-white/85 transition-colors hover:text-white hover:underline hover:underline-offset-4 ${focusRing}`}
                >
                  {email}
                </a>
              </p>

              <p className="flex items-start gap-3 text-sm leading-relaxed">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <a
                  href={`https://wa.me/${noWa.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-sm text-white/85 transition-colors hover:text-white hover:underline hover:underline-offset-4 ${focusRing}`}
                >
                  {noWa}
                </a>
              </p>

              <p className="flex items-start gap-3 text-sm leading-relaxed">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent)]" />
                <span className="text-white/85">
                  Senin - Jumat, {jamMulai} - {jamSelesai}
                </span>
              </p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
