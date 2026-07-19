'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/pengajuan-surat', label: 'Manajemen Surat', icon: '📄' },
  { href: '/dashboard/kependudukan', label: 'Kependudukan', icon: '👥' },
  { href: '/dashboard/presensi', label: 'Absensi Staf', icon: '🕒' },
  { href: '/dashboard/buku-tamu', label: 'Buku Tamu', icon: '📋' },
  { href: '/dashboard/konten', label: 'Konten Website', icon: '📝' },
  { href: '/dashboard/galeri', label: 'Galeri', icon: '🖼️' },
  { href: '/dashboard/pengguna', label: 'Pengguna', icon: '🧑‍💻' },
  { href: '/dashboard/pengaturan', label: 'Pengaturan', icon: '⚙️' },
];

function isActive(pathname: string, href: string) {
  return href === '/dashboard' ? pathname === href : pathname.startsWith(href);
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-[var(--color-primary)] text-white flex flex-col h-full overflow-hidden">
      {/* Wordmark */}
      <div className="px-5 py-5 border-b border-white/10">
        <p className="font-[var(--font-lora)] text-xl font-bold text-[var(--color-gold)]">
          Sumberagung <span className="text-[var(--color-gold-light)]">✓</span>
        </p>
      </div>

      {/* Mode layanan */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
          Mode Layanan
        </p>
        <p className="text-xs text-white/70 mt-0.5">Portal Administrasi Desa</p>
      </div>

      <nav className="flex-1 min-h-0 px-3 py-2 overflow-y-auto overscroll-contain">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors border-l-2 ${
                    active
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-gold-light)] border-[var(--color-gold)] font-medium'
                      : 'text-white/80 border-transparent hover:bg-[var(--color-primary-light)] hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-white/10">
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-[var(--color-primary-light)] hover:text-white transition-colors"
          >
            <span>🚪</span>
            <span>Keluar Sesi</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
