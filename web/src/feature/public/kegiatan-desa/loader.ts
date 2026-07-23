import { getKontenPublik } from '@/repository/konten/action';
import { urlFotoLangsung } from '@/lib/foto';
import { daftarKegiatan } from './data';
import type { Kegiatan } from './types';

/**
 * Memuat satu kegiatan dengan pendekatan HYBRID:
 *
 * - Teks inti (judul, isi, foto, tanggal, kategori) diambil dari backend.
 * - Elemen kurasi (subtitle, lokasi, fasilitator, unduhan, galeri,
 *   kutipan utama, dampak hasil, testimoni) diambil dari data statis
 *   berdasarkan id yang sama. Bila kegiatan hanya ada di backend,
 *   bagian-bagian itu kosong dan tidak dirender.
 *
 * Catatan: sheet Konten hanya punya 8 kolom, jadi elemen kurasi memang
 * tidak mungkin datang dari backend saat ini.
 */
export async function muatKegiatan(id: string): Promise<Kegiatan | null> {
    const statis = daftarKegiatan.find((k) => k.id === id);

    let dariBackend;
    try {
        const konten = await getKontenPublik(100);
        dariBackend = konten.find((k) => k.id === id);
    } catch (error) {
        console.error('Gagal memuat kegiatan dari backend:', error);
    }

    if (!dariBackend) return statis ?? null;

    return {
        id: dariBackend.id,
        kategori: dariBackend.kategori,
        judul: dariBackend.judul,
        tanggal: dariBackend.tanggalKegiatan,
        gambar: {
            src: dariBackend.urlFoto
                ? urlFotoLangsung(dariBackend.urlFoto)
                : (statis?.gambar.src ?? ''),
            alt: statis?.gambar.alt ?? dariBackend.judul,
        },
        // Sesuai keputusan: deskripsi ditampilkan sebagai satu blok.
        deskripsi: [dariBackend.deskripsi],

        // --- Elemen kurasi; kosong bila kegiatan hanya ada di backend ---
        highlightWord: statis?.highlightWord,
        subtitle: statis?.subtitle ?? '',
        lokasi: statis?.lokasi ?? '',
        fasilitator: statis?.fasilitator ?? dariBackend.dibuatOleh ?? '',
        unduhan: statis?.unduhan ?? [],
        galeri: statis?.galeri ?? [],
        kutipanUtama: statis?.kutipanUtama,
        dampakHasil: statis?.dampakHasil ?? [],
        testimoniWarga: statis?.testimoniWarga ?? [],
    };
}