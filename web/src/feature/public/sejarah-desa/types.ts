/**
 * Tipe data Sejarah Desa.
 *
 * Kontrak API untuk Konten (GET/POST sejarah desa) masih TBD
 * di docs/api-contract.md. Bentuk di bawah dipakai lebih dulu
 * sebagai sumber lokal; begitu kontraknya terbit, cukup ganti
 * asal datanya di data.ts tanpa menyentuh komponen.
 */

export type SejarahGambar = {
    /** Path di /public. Kosongkan bila foto belum tersedia. */
    src: string;
    /** Teks alternatif untuk pembaca layar. */
    alt: string;
};

export type SejarahTimelineItem = {
    id: string;
    /** Penanda waktu besar, mis. "1908" atau "Akhir Abad ke-18". */
    periode: string;
    /** Judul peristiwa, mis. "Awal Mula". */
    judul: string;
    narasi: string;
    gambar: SejarahGambar;
};

/** Bentuk respons bila nanti diambil dari Apps Script. */
export type SejarahResponse = {
    data: SejarahTimelineItem[];
};