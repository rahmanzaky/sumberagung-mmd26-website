import type {
    BarisUsia,
    BatasWilayah,
    KartuStatistik,
    Misi,
    PemanfaatanLahan,
    TabProfil,
    TingkatPendidikan,
} from './types';

/* ---------- Kerangka halaman ---------- */

export const profilHeader = {
    judul: 'Profil Desa',
    deskripsi:
        'Menyelami identitas Sumberagung melalui lanskap, masyarakat, dan cita-cita bersama di bawah naungan malam.',
};

export const tabProfil: TabProfil[] = [
    { href: '/profil-desa/visi-misi', label: 'Visi & Misi' },
    { href: '/profil-desa/demografis', label: 'Demografis' },
    { href: '/profil-desa/geografis', label: 'Geografis' },
];

/**
 * CATATAN: pada desain, deskripsi di bawah judul sub-halaman
 * sama persis untuk ketiganya. Teks di bawah masih menyalin
 * desain; ganti terutama milik Visi & Misi yang belum nyambung.
 */
const deskripsiBawaan =
    'Wilayah Desa Sumberagung termasuk daerah pegunungan yang mayoritas penduduknya bermata pencaharian petani pekebun. Berikut adalah profil kependudukan tahun 2025.';

/* ---------- Visi & Misi ---------- */

export const visiMisi = {
    judul: 'Visi & Misi',
    deskripsi: deskripsiBawaan,
    visi: 'Mewujudkan Sumberagung yang Berbudaya, Mandiri, dan Sejahtera.',
    misi: [
        {
            nomor: 'Misi 01',
            teks: 'Melestarikan kearifan lokal dan tradisi leluhur sebagai pondasi identitas desa di tengah arus modernisasi.',
        },
        {
            nomor: 'Misi 02',
            teks: 'Meningkatkan kemandirian ekonomi masyarakat melalui optimalisasi potensi agrikultur dan pariwisata berkelanjutan.',
        },
        {
            nomor: 'Misi 03',
            teks: 'Menyelenggarakan tata kelola pemerintahan desa yang transparan, akuntabel, dan berbasis pelayanan publik prima.',
        },
    ] satisfies Misi[],
};

/* ---------- Demografis ---------- */

export const demografi = {
    judul: 'Demografi Desa',
    deskripsi: deskripsiBawaan,
    pembaruan: 'Update: Jan 2025',
    statistik: [
        {
            id: 'total',
            label: 'Total Populasi',
            nilai: '2.704',
            keterangan: 'Jiwa Penduduk Terdaftar',
            ikon: 'kelompok',
        },
        {
            id: 'laki-laki',
            label: 'Laki-laki',
            nilai: '1.393',
            keterangan: '51,5% dari total populasi',
            ikon: 'lakiLaki',
        },
        {
            id: 'perempuan',
            label: 'Perempuan',
            nilai: '1.311',
            keterangan: '48,5% dari total populasi',
            ikon: 'perempuan',
        },
    ] satisfies KartuStatistik[],
    distribusiUsia: [
        { usia: '0 - 5 Tahun', wilayah: 'Sumberagung', lakiLaki: 10, perempuan: 17 },
        { usia: '6 - 12 Tahun', wilayah: 'Sumberagung', lakiLaki: 11, perempuan: 21 },
        { usia: '13 - 17 Tahun', wilayah: 'Sumberagung', lakiLaki: 12, perempuan: 15 },
        { usia: '18 - 25 Tahun', wilayah: 'Sumberagung', lakiLaki: 22, perempuan: 19 },
        { usia: '26 - 45 Tahun', wilayah: 'Sumberagung', lakiLaki: 45, perempuan: 42 },
        { usia: '46+ Tahun', wilayah: 'Sumberagung', lakiLaki: 38, perempuan: 35 },
    ] satisfies BarisUsia[],
    catatanTabel:
        'Data disederhanakan berdasarkan kategori usia produktif dan non-produktif.',
    pendidikan: [
        { label: 'SD / Sederajat', persen: 45 },
        { label: 'SMP / Sederajat', persen: 28 },
        { label: 'SMA / Sederajat', persen: 18 },
        { label: 'Sarjana (S1/D4)', persen: 9 },
    ] satisfies TingkatPendidikan[],
    kartuLuas: {
        label: 'Luas Wilayah',
        nilai: '646,49',
        satuan: 'Hektar',
        /** Isi begitu fotonya tersedia di /public. */
        gambar: { src: '', alt: 'Lanskap perbukitan dan persawahan Desa Sumberagung' },
    },
};

/* ---------- Geografis ---------- */

export const geografi = {
    judul: 'Geografi Desa',
    deskripsi: deskripsiBawaan,
    letak: {
        judul: 'Letak Astronomis & Topografi',
        lintang: "7°21'-7°31' Lintang Selatan",
        bujur: "110°10'-111°40' Bujur Timur",
        paragrafPembuka: 'Desa Sumberagung terbentang secara strategis pada posisi koordinat',
        paragrafLanjutan:
            'Wilayah ini dikelilingi oleh gugusan pegunungan dan perbukitan rendah, menjadikannya salah satu kawasan dengan tanah tersubur di Kecamatan Panggungrejo. Karakteristik tanah yang kaya akan mineral vulkanik purba sangat mendukung sektor agrikultur desa.',
        ketinggian: { nilai: '300', satuan: 'mdpl' },
        posisi: 'Dataran Tinggi',
    },
    peta: {
        /** Isi begitu gambar petanya tersedia di /public. */
        gambar: { src: '', alt: 'Peta topografi Desa Sumberagung' },
        judulKeterangan: 'Visualisasi Topografi',
        keterangan:
            'Model elevasi digital Desa Sumberagung menunjukkan kemiringan lahan yang ideal untuk terasering.',
    },
    batas: {
        judul: 'Batas Wilayah',
        subjudul: 'Village Boundaries',
        daftar: [
            { arah: 'Utara', desa: 'Desa Panggungrejo', kecamatan: 'Kec. Panggungrejo' },
            { arah: 'Selatan', desa: 'Desa Balerejo', kecamatan: 'Kec. Panggungrejo' },
            { arah: 'Timur', desa: 'Desa Sumberkembar', kecamatan: 'Kec. Binangun' },
            { arah: 'Barat', desa: 'Desa Panggungrejo', kecamatan: 'Kec. Panggungrejo' },
        ] satisfies BatasWilayah[],
    },
    luas: {
        judul: 'Statistik Luas Wilayah',
        deskripsi:
            'Distribusi pemanfaatan lahan Desa Sumberagung mencerminkan kekayaan sumber daya alam yang dikelola secara berkelanjutan oleh masyarakat desa.',
        total: { label: 'Luas Total Wilayah', nilai: '646,499', satuan: 'Ha' },
        rincian: [
            {
                id: 'tanah-kering',
                label: 'Tanah Kering',
                luas: '482,499',
                satuan: 'ha',
                persen: 60,
                ikon: 'perbukitan',
            },
            {
                id: 'hutan-negara',
                label: 'Hutan Negara',
                luas: '131',
                satuan: 'ha',
                persen: 35,
                ikon: 'hutan',
            },
            {
                id: 'tanah-sawah',
                label: 'Tanah Sawah',
                luas: '13',
                satuan: 'ha',
                persen: 5,
                ikon: 'sawah',
            },
        ] satisfies PemanfaatanLahan[],
    },
};