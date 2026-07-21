export type NavLink = {
    href: string;
    label: string;
};

/**
 * Urutan menu mengikuti desain.
 */
export const navLinks: NavLink[] = [
    { href: '/', label: 'Home' },
    { href: '/profil-desa', label: 'Profil Desa' },
    { href: '/sejarah-desa', label: 'Sejarah Desa' },
    { href: '/struktur-organisasi', label: 'Struktur Desa' },
    { href: '/buku-tamu', label: 'Buku Tamu' },
];

export const ajukanSuratHref = '/pengajuan-surat';