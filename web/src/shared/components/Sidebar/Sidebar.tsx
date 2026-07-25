'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  IconDashboard,
  IconSurat,
  IconAbsensi,
  IconBukuTamu,
  IconProfil,
  IconSejarah,
  IconStruktur,
  IconPeta,
  IconKependudukan,
  IconKonten,
  IconPengguna,
  IconPengaturan,
  IconKeluar,
} from '@/shared/components/icons';
import type { Role } from '@/repository/pengguna/dto';

const SEMUA: Role[] = ['Admin', 'Super Admin'];
const HANYA_SUPER: Role[] = ['Super Admin'];

// Menu disaring per peran (permintaan desa):
// - Admin: Layanan + hanya Kependudukan & Konten di Isi Website; tanpa Sistem.
// - Super Admin: semua, minus Beranda & Galeri yang ditiadakan.
const menuGroups: {
  judul: string;
  items: {
    href: string;
    label: string;
    Icon: (p: { className?: string }) => React.JSX.Element;
    roles: Role[];
  }[];
}[] = [
  {
    judul: 'Layanan',
    items: [
      { href: '/dashboard', label: 'Dashboard', Icon: IconDashboard, roles: SEMUA },
      {
        href: '/dashboard/pengajuan-surat',
        label: 'Manajemen Surat',
        Icon: IconSurat,
        roles: SEMUA,
      },
      { href: '/dashboard/buku-tamu', label: 'Buku Tamu', Icon: IconBukuTamu, roles: SEMUA },
      { href: '/dashboard/presensi', label: 'Absensi Staf', Icon: IconAbsensi, roles: SEMUA },
    ],
  },
  {
    judul: 'Isi Website',
    items: [
      { href: '/dashboard/profil', label: 'Profil Desa', Icon: IconProfil, roles: HANYA_SUPER },
      { href: '/dashboard/geografi', label: 'Geografi', Icon: IconPeta, roles: HANYA_SUPER },
      { href: '/dashboard/sejarah', label: 'Sejarah Desa', Icon: IconSejarah, roles: HANYA_SUPER },
      {
        href: '/dashboard/struktur',
        label: 'Struktur Organisasi',
        Icon: IconStruktur,
        roles: HANYA_SUPER,
      },
      {
        href: '/dashboard/kependudukan',
        label: 'Kependudukan',
        Icon: IconKependudukan,
        roles: SEMUA,
      },
      { href: '/dashboard/konten', label: 'Konten & Berita', Icon: IconKonten, roles: SEMUA },
    ],
  },
  {
    judul: 'Sistem',
    items: [
      { href: '/dashboard/pengguna', label: 'Pengguna', Icon: IconPengguna, roles: HANYA_SUPER },
      {
        href: '/dashboard/pengaturan',
        label: 'Pengaturan',
        Icon: IconPengaturan,
        roles: HANYA_SUPER,
      },
    ],
  },
];

function isActive(pathname: string, href: string) {
  return href === '/dashboard' ? pathname === href : pathname.startsWith(href);
}

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();

  // Saring item per peran, lalu buang grup yang jadi kosong (mis. Sistem utk Admin).
  const grupTampil = menuGroups
    .map((g) => ({ ...g, items: g.items.filter((it) => it.roles.includes(role)) }))
    .filter((g) => g.items.length > 0);

  return (
    <aside className="w-64 shrink-0 bg-[var(--color-primary)] text-white flex flex-col h-full overflow-hidden">
      {/* Wordmark */}
      <div className="px-5 py-5 border-b border-white/10 flex items-center gap-3">
        <img
          src="/desa_sumberagung_logo.jpeg"
          alt="Logo Sumberagung"
          className="w-8 h-8 object-contain rounded-full"
        />
        <p className="font-[var(--font-lora)] text-xl font-bold text-[var(--color-gold)]">
          Sumberagung
        </p>
      </div>

      <nav className="flex-1 min-h-0 px-3 py-4 overflow-y-auto overscroll-contain space-y-5">
        {grupTampil.map((grup) => (
          <div key={grup.judul}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
              {grup.judul}
            </p>
            <ul className="space-y-1">
              {grup.items.map((item) => {
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
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="group w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-[var(--color-primary-light)] hover:text-white transition-colors"
        >
          <IconKeluar className="w-5 h-5 shrink-0 text-white/45 group-hover:text-white/80 transition-colors" />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}
