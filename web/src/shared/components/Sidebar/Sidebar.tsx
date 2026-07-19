'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconDashboard,
  IconSurat,
  IconKependudukan,
  IconAbsensi,
  IconBukuTamu,
  IconKonten,
  IconGaleri,
  IconPengguna,
  IconPengaturan,
  IconKeluar,
} from '@/shared/components/icons';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { href: '/dashboard/pengajuan-surat', label: 'Manajemen Surat', Icon: IconSurat },
  { href: '/dashboard/kependudukan', label: 'Kependudukan', Icon: IconKependudukan },
  { href: '/dashboard/presensi', label: 'Absensi Staf', Icon: IconAbsensi },
  { href: '/dashboard/buku-tamu', label: 'Buku Tamu', Icon: IconBukuTamu },
  { href: '/dashboard/konten', label: 'Konten Website', Icon: IconKonten },
  { href: '/dashboard/galeri', label: 'Galeri', Icon: IconGaleri },
  { href: '/dashboard/pengguna', label: 'Pengguna', Icon: IconPengguna },
  { href: '/dashboard/pengaturan', label: 'Pengaturan', Icon: IconPengaturan },
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
                  className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors border-l-2 ${
                    active
                      ? 'bg-[var(--color-primary-light)] text-[var(--color-gold-light)] border-[var(--color-gold)] font-medium'
                      : 'text-white/80 border-transparent hover:bg-[var(--color-primary-light)] hover:text-white'
                  }`}
                >
                  {/* Ikon sengaja lebih redup daripada label saat tidak aktif,
                      dan ikut jadi emas saat aktif (fill="currentColor"). */}
                  <item.Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      active
                        ? 'text-[var(--color-gold)]'
                        : 'text-white/45 group-hover:text-white/80'
                    }`}
                  />
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
            className="group w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-[var(--color-primary-light)] hover:text-white transition-colors"
          >
            <IconKeluar className="w-5 h-5 shrink-0 text-white/45 group-hover:text-white/80 transition-colors" />
            <span>Keluar Sesi</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
