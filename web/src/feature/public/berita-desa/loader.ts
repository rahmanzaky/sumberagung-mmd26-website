import { getKontenPublik } from '@/repository/konten/action';
import { urlFotoLangsung } from '@/lib/foto';
import { daftarBerita } from './data';
import type { Berita } from './types';
import type { Konten } from '@/repository/konten/dto';

/**
 * Menggabungkan satu baris konten dari backend dengan data statis ber-id sama.
 *
 * Teks inti (judul, isi, foto, tanggal, kategori) berasal dari backend agar
 * bisa disunting lewat panel admin. Elemen kurasi (kutipan, kotak fitur, tag,
 * berita terkait, overlay) hanya ada di data statis — sheet Konten cuma punya
 * 8 kolom, jadi elemen itu memang tak mungkin datang dari backend.
 *
 * Berita yang hanya ada di backend tetap tampil, hanya lebih sederhana:
 * bagian kurasi kosong dan otomatis tidak dirender.
 */
function gabung(dariBackend: Konten): Berita {
    const statis = daftarBerita.find((b) => b.id === dariBackend.id);

    return {
        id: dariBackend.id,
        kategori: dariBackend.kategori,
        tanggal: dariBackend.tanggalKegiatan,
        penulis: dariBackend.dibuatOleh || statis?.penulis || 'Admin Desa',
        judul: dariBackend.judul,
        excerpt: statis?.excerpt ?? dariBackend.deskripsi.slice(0, 150),
        gambar: {
            src: dariBackend.urlFoto
                ? urlFotoLangsung(dariBackend.urlFoto)
                : (statis?.gambar.src ?? ''),
            alt: statis?.gambar.alt ?? dariBackend.judul,
        },
        // Sesuai keputusan: deskripsi ditampilkan sebagai satu blok.
        konten: [dariBackend.deskripsi],

        // --- Elemen kurasi, hanya bila berita ini juga tercatat di data statis ---
        overlayTeks: statis?.overlayTeks,
        kutipan: statis?.kutipan,
        kotakFitur: statis?.kotakFitur,
        tags: statis?.tags,
        terkaitIds: statis?.terkaitIds,
    };
}

/** Memuat satu berita untuk halaman detail. */
export async function muatBerita(id: string): Promise<Berita | null> {
    try {
        const konten = await getKontenPublik(100);
        const dariBackend = konten.find((k) => k.id === id);
        if (dariBackend) return gabung(dariBackend);
    } catch (error) {
        console.error('Gagal memuat berita dari backend:', error);
    }

    // Backend tak punya id ini (atau sedang gagal) — pakai data statis bila ada.
    return daftarBerita.find((b) => b.id === id) ?? null;
}

/**
 * Memuat seluruh berita untuk halaman /berita-desa.
 * Backend dipanggil sekali saja, lalu tiap baris digabung dengan data statis.
 */
export async function muatSemuaBerita(): Promise<Berita[]> {
    try {
        const konten = await getKontenPublik(100);
        if (konten.length === 0) return daftarBerita;
        return konten.map(gabung);
    } catch (error) {
        console.error('Gagal memuat daftar berita, memakai data statis:', error);
        return daftarBerita;
    }
}