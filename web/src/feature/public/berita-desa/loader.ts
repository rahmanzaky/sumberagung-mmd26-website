import { getKontenPublik } from '@/repository/konten/action';
import type { Konten } from '@/repository/konten/dto';
import { urlFotoLangsung } from '@/lib/foto';
import { daftarKegiatan } from '@/feature/public/kegiatan-desa/data';
import type { Berita } from './types';

const idKegiatan = new Set(daftarKegiatan.map((k) => k.id));

// Memetakan konten CMS (Sheet "Konten") → Berita untuk halaman publik.
// "Berita" = konten Tampil yang BUKAN kegiatan (kategori tak mengandung
// "kegiatan") — konvensi sama dengan loader Beranda (muatKontenDinamis).
// Body artikel diambil dari `deskripsi` (dipisah per baris jadi paragraf).
// Field kaya (kutipan/kotakFitur/tags/penulis) belum ada di CMS → dibiarkan
// kosong; komponen detail sudah menanganinya sebagai opsional.

function formatTanggal(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function keBerita(k: Konten): Berita {
  const paragraf = k.deskripsi
    .split('\n')
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    id: k.id,
    kategori: k.kategori,
    tanggal: formatTanggal(k.tanggalKegiatan),
    penulis: 'Pemerintah Desa Sumberagung',
    judul: k.judul,
    excerpt: k.deskripsi.length > 160 ? k.deskripsi.slice(0, 160).trimEnd() + '…' : k.deskripsi,
    gambar: { src: k.urlFoto ? urlFotoLangsung(k.urlFoto) : '', alt: k.judul },
    konten: paragraf.length ? paragraf : [k.deskripsi],
  };
}

function isBerita(k: Konten): boolean {
  return !idKegiatan.has(k.id);
}

/** Semua berita publik (Tampil), terbaru dulu (getKontenPublik sudah terurut). */
export async function muatDaftarBerita(): Promise<Berita[]> {
  const konten = await getKontenPublik(50);
  return konten.filter(isBerita).map(keBerita);
}

/** Satu berita berdasarkan id (= id konten). null bila tak ada/ tak tampil. */
export async function muatBeritaById(id: string): Promise<Berita | null> {
  const semua = await muatDaftarBerita();
  return semua.find((b) => b.id === id) ?? null;
}
