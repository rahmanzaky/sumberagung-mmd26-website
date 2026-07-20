export type NavLink = {
  href: string;
  label: string;
};

/**
 * Catatan: label "Struktur Desa" mengarah ke route /struktur-organisasi
 */
export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/profil-desa', label: 'Profil Desa' },
  { href: '/sejarah-desa', label: 'Sejarah Desa' },
  { href: '/struktur-organisasi', label: 'Struktur Desa' },
  { href: '/buku-tamu', label: 'Buku Tamu' },
];

export const loginHref = '/login';
export const ajukanSuratHref = '/pengajuan-surat';
