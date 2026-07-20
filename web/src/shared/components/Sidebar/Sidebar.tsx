'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconDashboard,
  IconSurat,
  IconAbsensi,
  IconBukuTamu,
  IconRumah,
  IconProfil,
  IconSejarah,
  IconStruktur,
  IconPeta,
  IconKependudukan,
  IconKonten,
  IconGaleri,
  IconPengguna,
  IconPengaturan,
  IconKeluar,
} from '@/shared/components/icons';

// Tiga kelompok menu (docs/cms-gap-analysis.md §4.1):
// Layanan = pekerjaan harian; Isi Website = CMS halaman publik; Sistem = Super Admin.
// Aturan: satu halaman publik = satu menu dengan nama yang sama.
const menuGroups = [
  {
    judul: 'Layanan',
    items: [
      { href: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
      { href: '/dashboard/pengajuan-surat', label: 'Manajemen Surat', Icon: IconSurat },
      { href: '/dashboard/buku-tamu', label: 'Buku Tamu', Icon: IconBukuTamu },
      { href: '/dashboard/presensi', label: 'Absensi Staf', Icon: IconAbsensi },
    ],
  },
  {
    judul: 'Isi Website',
    items: [
      { href: '/dashboard/beranda', label: 'Beranda', Icon: IconRumah },
      { href: '/dashboard/profil', label: 'Profil Desa', Icon: IconProfil },
      { href: '/dashboard/geografi', label: 'Geografi', Icon: IconPeta },
      { href: '/dashboard/sejarah', label: 'Sejarah Desa', Icon: IconSejarah },
      { href: '/dashboard/struktur', label: 'Struktur Organisasi', Icon: IconStruktur },
      { href: '/dashboard/kependudukan', label: 'Kependudukan', Icon: IconKependudukan },
      { href: '/dashboard/konten', label: 'Konten & Berita', Icon: IconKonten },
      { href: '/dashboard/galeri', label: 'Galeri', Icon: IconGaleri },
    ],
  },
  {
    judul: 'Sistem',
    items: [
      { href: '/dashboard/pengguna', label: 'Pengguna', Icon: IconPengguna },
      { href: '/dashboard/pengaturan', label: 'Pengaturan', Icon: IconPengaturan },
    ],
  },
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

      <nav className="flex-1 min-h-0 px-3 py-4 overflow-y-auto overscroll-contain space-y-5">
        {menuGroups.map((grup) => (
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
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="group w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/70 hover:bg-[var(--color-primary-light)] hover:text-white transition-colors"
          >
            <IconKeluar className="w-5 h-5 shrink-0 text-white/45 group-hover:text-white/80 transition-colors" />
            <span>Keluar</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
