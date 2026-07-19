import type { KelompokPerangkat, StrukturOrganisasi } from './types';

export const strukturHeader = {
    judul: 'Struktur Organisasi',
    deskripsi: 'Susunan pemerintahan dan perangkat Desa Sumberagung.',
};

/** Isi `foto.src` begitu fotonya tersedia di /public. */
export const struktur: StrukturOrganisasi = {
    bpd: {
        id: 'bpd',
        jabatan: 'BPD',
        keterangan: 'Badan Permusyawaratan Desa',
        foto: { src: '', alt: 'Perwakilan Badan Permusyawaratan Desa' },
    },
    kepalaDesa: {
        id: 'kepala-desa',
        jabatan: 'Kepala Desa',
        nama: 'Slamet Riyadi',
        foto: { src: '', alt: 'Kepala Desa Slamet Riyadi' },
    },
    sekretaris: {
        id: 'sekretaris',
        jabatan: 'Sekretaris Desa',
        nama: 'Dewi Lestari',
        foto: { src: '', alt: 'Sekretaris Desa Dewi Lestari' },
    },
    kasi: [
        {
            id: 'kasi-pelayanan',
            jabatan: 'Kasi Pelayanan',
            nama: 'Agus Setiawan',
            foto: { src: '', alt: 'Kasi Pelayanan Agus Setiawan' },
        },
        {
            id: 'kasi-pemerintahan',
            jabatan: 'Kasi Pemerintahan',
            nama: 'Andi Pratama',
            foto: { src: '', alt: 'Kasi Pemerintahan Andi Pratama' },
        },
        {
            id: 'kasi-kesejahteraan',
            jabatan: 'Kasi Kesejahteraan',
            nama: 'Sutrisno',
            foto: { src: '', alt: 'Kasi Kesejahteraan Sutrisno' },
        },
    ],
    kaur: [
        {
            id: 'kaur-keuangan',
            jabatan: 'Kaur Keuangan',
            nama: 'Rina Wulandari',
            foto: { src: '', alt: 'Kaur Keuangan Rina Wulandari' },
        },
        {
            id: 'kaur-perencanaan',
            jabatan: 'Kaur Perencanaan',
            nama: 'Novi Rahmawati',
            foto: { src: '', alt: 'Kaur Perencanaan Novi Rahmawati' },
        },
        {
            id: 'kaur-tata-usaha',
            jabatan: 'Kaur Tata Usaha dan Umum',
            nama: 'Lilis Setyowati',
            foto: { src: '', alt: 'Kaur Tata Usaha dan Umum Lilis Setyowati' },
        },
    ],
    kamituwo: [
        {
            id: 'kamituwo-sumbersoko',
            jabatan: 'Kamituwo',
            keterangan: 'Dusun Sumbersoko',
            nama: 'Budi Santoso',
            foto: { src: '', alt: 'Kamituwo Dusun Sumbersoko Budi Santoso' },
        },
        {
            id: 'kamituwo-panggungwinong',
            jabatan: 'Kamituwo',
            keterangan: 'Dusun Panggungwinong',
            nama: 'Mulyono',
            foto: { src: '', alt: 'Kamituwo Dusun Panggungwinong Mulyono' },
        },
    ],
};

/** Urutan penyajian pada layar kecil. */
export const kelompokPerangkat: KelompokPerangkat[] = [
    { label: 'Pimpinan Desa', anggota: [struktur.kepalaDesa, struktur.bpd] },
    { label: 'Sekretariat', anggota: [struktur.sekretaris] },
    { label: 'Kepala Seksi', anggota: struktur.kasi },
    { label: 'Kepala Urusan', anggota: struktur.kaur },
    { label: 'Kepala Dusun', anggota: struktur.kamituwo },
];