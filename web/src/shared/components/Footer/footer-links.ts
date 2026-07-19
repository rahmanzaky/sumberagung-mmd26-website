export type FooterLink = {
    href: string;
    label: string;
};

/**
 * Tautan cepat sesuai desain.
 */
export const quickLinks: FooterLink[] = [
    { href: '#', label: 'Kontak' },
    { href: '#', label: 'Peta Desa' },
    { href: '#', label: 'Transparansi' },
    { href: '#', label: 'Bantuan' },
];

export const contactInfo = {
    address: ['Jl. Balai Desa No. 1, Sumberagung,', 'Kec. Pesanggaran'],
    email: 'pemdes@sumberagung.desa.id',
};

export const footerTagline =
    'Mewujudkan pelayanan publik yang prima dengan tetap menjunjung tinggi nilai-nilai budaya dan kearifan lokal.';

export const footerMotto = 'Dua Wajah, Satu Identitas.';