/** Tipe data Profil Desa (Visi & Misi, Demografis, Geografis). */

export type TabProfil = {
    href: string;
    label: string;
};

/* ---------- Visi & Misi ---------- */

export type Misi = {
    nomor: string;
    teks: string;
};

/* ---------- Demografis ---------- */

export type KartuStatistik = {
    id: string;
    label: string;
    nilai: string;
    keterangan: string;
    ikon: 'kelompok' | 'lakiLaki' | 'perempuan';
};

export type BarisUsia = {
    usia: string;
    wilayah: string;
    lakiLaki: number;
    perempuan: number;
};

export type TingkatPendidikan = {
    label: string;
    persen: number;
};

/* ---------- Geografis ---------- */

export type BatasWilayah = {
    arah: string;
    desa: string;
    kecamatan: string;
};

export type PemanfaatanLahan = {
    id: string;
    label: string;
    luas: string;
    satuan: string;
    /** Panjang bilah, 0–100. Diisi manual mengikuti desain. */
    persen: number;
    ikon: 'perbukitan' | 'hutan' | 'sawah';
};