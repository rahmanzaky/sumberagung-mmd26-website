import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/sejarah-desa', label: 'Sejarah Desa' },
  { href: '/profil-desa', label: 'Profil Desa' },
  { href: '/struktur-organisasi', label: 'Struktur Organisasi' },
  { href: '/buku-tamu', label: 'Buku Tamu' },
  { href: '/pengajuan-surat', label: 'Pengajuan Surat' },
];

export default function Navbar() {
  return (
    <header className="bg-[var(--color-primary)] text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-sm">
            DS
          </div>
          <div>
            <p className="font-semibold leading-tight text-sm">Desa Sumberagung</p>
            <p className="text-xs text-[var(--color-accent-light)] leading-tight">
              Kec. Panggungrejo, Kab. Blitar
            </p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {/* Mobile menu placeholder */}
        <button className="md:hidden text-white" aria-label="Buka menu">
          ☰
        </button>
      </div>
    </header>
  );
}
