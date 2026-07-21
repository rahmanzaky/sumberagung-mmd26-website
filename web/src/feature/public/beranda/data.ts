import type { StatistikBeranda } from './types';

/** Id bagian kegiatan, dipakai tombol "Lihat Kegiatan" untuk menggulir. */
export const idBagianKegiatan = 'kegiatan-desa';

export const hero = {
    label: 'Desa Wisata & Budaya',
    /** Judul dipecah agar kata "Tumbuh" bisa disorot terpisah. */
    judulAwal: 'Sumberagung, Desa yang ',
    judulSorot: 'Tumbuh',
    judulAkhir: ' dari Sumber Kehidupan.',
    deskripsi:
        'Terletak di kaki gunung dengan keindahan alam yang asri. Memadukan kearifan lokal, pelestarian budaya, dan pelayanan publik yang modern untuk kesejahteraan warga.',
    tombolUtama: { label: 'Ajukan Surat', href: '/pengajuan-surat' },
    tombolKedua: { label: 'Lihat Kegiatan', href: `#${idBagianKegiatan}` },
    gambar: {
        src: '/latar-sunset.png',
        alt: 'Panorama gunung dan danau Desa Sumberagung saat matahari terbenam',
    },
};

/**
 * CATATAN: angka penduduk di sini (4.521) berbeda dengan halaman
 * Demografis (2.704). Samakan setelah dicek ke data desa.
 */
export const statistik: StatistikBeranda[] = [
    { id: 'penduduk', nilai: '4.521', label: 'Penduduk' },
    { id: 'kepala-keluarga', nilai: '1.204', label: 'Kepala Keluarga' },
    { id: 'rt', nilai: '42', label: 'Rukun Tetangga' },
    { id: 'rw', nilai: '12', label: 'Rukun Warga' },
];

export const kegiatan = {
    judulAtas: 'Jejak Langkah &',
    judulBawah: 'Geliat Desa',
    deskripsi:
        'Merekam setiap momen pembangunan, pelestarian budaya, dan interaksi warga yang membentuk harmoni di Sumberagung.',
};

export const berita = {
    judul: 'Berita Desa Terbaru',
};

export const videoProfil = {
    judul: 'Profil Desa',
    deskripsi:
        'Kenali lebih dekat bentang alam, potensi ekonomi, dan keramahan warga Desa Sumberagung melalui lensa sinematik.',
    /** Isi dengan ID video YouTube, mis. "dQw4w9WgXcQ" dari youtu.be/dQw4w9WgXcQ */
    videoId: '',
    thumbnail: {
        src: '',
        alt: 'Cuplikan video profil Desa Sumberagung dari udara',
    },
};