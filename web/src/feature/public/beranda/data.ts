import type { KartuKegiatan, StatistikBeranda } from './types';

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
    daftar: [
        // --- Tiga kartu pertama sesuai desain ---
        {
            id: 'rembuk-warga',
            kategori: 'Musyawarah',
            judul: 'Rembuk Warga Perencanaan Pembangunan',
            gambar: { src: '', alt: 'Warga berkumpul dalam musyawarah desa di malam hari' },
        },
        {
            id: 'panen-raya',
            kategori: 'Pertanian',
            judul: 'Panen Raya Padi Organik Kelompok Tani',
            gambar: { src: '', alt: 'Hamparan sawah terasering saat matahari terbit' },
        },
        {
            id: 'festival-jaranan',
            kategori: 'Seni & Budaya',
            judul: 'Festival Kesenian Jaranan Desa',
            gambar: { src: '', alt: 'Penari mengenakan busana tradisional dalam festival desa' },
        },

        // --- Empat kartu berikut masih isian sementara, silakan diganti ---
        {
            id: 'kerja-bakti',
            kategori: 'Gotong Royong',
            judul: 'Kerja Bakti Perbaikan Jalan Desa',
            gambar: { src: '', alt: 'Warga bergotong royong memperbaiki jalan desa' },
        },
        {
            id: 'posyandu',
            kategori: 'Kesehatan',
            judul: 'Posyandu Balita dan Lansia Bulanan',
            gambar: { src: '', alt: 'Kegiatan penimbangan balita di posyandu desa' },
        },
        {
            id: 'pelatihan-umkm',
            kategori: 'Ekonomi',
            judul: 'Pelatihan UMKM Olahan Hasil Kebun',
            gambar: { src: '', alt: 'Warga mengikuti pelatihan pengolahan hasil kebun' },
        },
        {
            id: 'hut-kemerdekaan',
            kategori: 'Perayaan',
            judul: 'Peringatan Hari Kemerdekaan Republik Indonesia',
            gambar: { src: '', alt: 'Upacara dan lomba peringatan kemerdekaan di lapangan desa' },
        },
    ] satisfies KartuKegiatan[],
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