/** Tipe data Berita Desa. */

export type Gambar = {
    /** Path di /public. Kosongkan bila gambar belum tersedia. */
    src: string;
    alt: string;
};

export type KutipanBerita = {
    teks: string;
    atribusi: string;
};

export type KotakFitur = {
    ikon: 'kilat' | 'perisai';
    judul: string;
    deskripsi: string;
};

export type Berita = {
    /** Dipakai juga sebagai slug URL, mis. /berita-desa/inovasi-pelayanan-desa-digital */
    id: string;
    kategori: string;
    tanggal: string;
    penulis: string;
    judul: string;
    excerpt: string;
    gambar: Gambar;
    /** Teks overlay besar di pojok kiri bawah gambar utama halaman detail. */
    overlayTeks?: string;
    /** Isi artikel, tiap elemen adalah satu paragraf. */
    konten: string[];
    kutipan?: KutipanBerita;
    kotakFitur?: KotakFitur[];
    tags?: string[];
    /** Kurasi manual "Berita Terkait"; bila kosong, diambil otomatis dari berita lain. */
    terkaitIds?: string[];
};
