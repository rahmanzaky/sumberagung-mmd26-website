/** Tipe data Beranda. */

export type Gambar = {
    /** Path di /public. Kosongkan bila gambar belum tersedia. */
    src: string;
    alt: string;
};

export type StatistikBeranda = {
    id: string;
    nilai: string;
    label: string;
};

/** Kartu kegiatan; `id` dipakai sebagai slug menuju /kegiatan-desa/[id]. */
export type KartuKegiatan = {
    id: string;
    kategori: string;
    judul: string;
    gambar: Gambar;
};