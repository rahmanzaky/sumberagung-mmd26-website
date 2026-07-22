/** Tipe data Kegiatan Desa (detail "Jejak Langkah & Geliat Desa"). */

export type Gambar = {
    /** Path di /public. Kosongkan bila gambar belum tersedia. */
    src: string;
    alt: string;
};

export type UnduhanKegiatan = {
    judul: string;
    url: string;
};

export type KutipanKegiatan = {
    teks: string;
    nama: string;
    jabatan: string;
};

export type DampakHasil = {
    ikon: 'tetesan' | 'kelompok' | 'tren';
    judul: string;
    deskripsi: string;
};

export type TestimoniWarga = {
    foto: Gambar;
    kutipan: string;
    nama: string;
    jabatan: string;
};

export type Kegiatan = {
    /** Dipakai juga sebagai slug URL, sama dengan id di beranda/data.ts. */
    id: string;
    kategori: string;
    judul: string;
    /** Frasa dalam judul yang disorot warna aksen; kosongkan bila tidak perlu. */
    highlightWord?: string;
    subtitle: string;
    gambar: Gambar;
    tanggal: string;
    lokasi: string;
    fasilitator: string;
    unduhan: UnduhanKegiatan[];
    /** Isi "Tentang Kegiatan", tiap elemen adalah satu paragraf. */
    deskripsi: string[];
    galeri: Gambar[];
    kutipanUtama?: KutipanKegiatan;
    dampakHasil: DampakHasil[];
    testimoniWarga: TestimoniWarga[];
};
