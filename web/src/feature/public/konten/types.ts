/**
 * Konten bersama untuk kegiatan dan berita.
 * Keduanya memakai satu rute detail: /detail/[slug]
 */

export type Gambar = {
    /** Path di /public. Kosongkan bila gambar belum tersedia. */
    src: string;
    alt: string;
};

export type JenisKonten = 'kegiatan' | 'berita';

export type Konten = {
    /** Bagian akhir URL, mis. /detail/rembuk-warga */
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