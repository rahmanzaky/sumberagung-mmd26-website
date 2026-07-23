/**
 * Konten bersama untuk kegiatan dan berita.
 * Kegiatan -> /kegiatan-desa/[id], berita -> /berita-desa/[id].
 */

export type Gambar = {
    /** Path di /public. Kosongkan bila gambar belum tersedia. */
    src: string;
    alt: string;
};

export type JenisKonten = 'kegiatan' | 'berita';

export type Konten = {
    /** Pengenal utama, dipakai pada rute detail. */
    id?: string;
    /** Cadangan bila id belum tersedia. */
    slug: string;
    jenis: JenisKonten;
    /** Label kecil di atas judul, mis. "Musyawarah". */
    kategori: string;
    judul: string;
    /** Format ISO YYYY-MM-DD. */
    tanggal: string;
    ringkasan: string;
    /** Isi halaman detail, satu larik per paragraf. */
    isi: string[];
    gambar: Gambar;
};