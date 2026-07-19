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

/** Kartu kegiatan hanya tampilan, tidak menuju halaman mana pun. */
export type KartuKegiatan = {
    id: string;
    kategori: string;
    judul: string;
    gambar: Gambar;
};