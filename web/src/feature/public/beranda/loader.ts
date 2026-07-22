import { getKependudukanTerbaru } from '@/repository/kependudukan/action';
import { getKontenPublik } from '@/repository/konten/action';
import { urlFotoLangsung } from '@/lib/foto';
import { statistik as statistikStatis } from './data';
import type { StatistikBeranda } from './types';
import type { Konten as PublicKonten } from '@/feature/public/konten/types';

function angka(n: number) {
  return n.toLocaleString('id-ID');
}

/** Bar statistik hero: penduduk, KK, RT, RW dari data kependudukan terbaru. */
export async function muatStatistik(): Promise<StatistikBeranda[]> {
  const t = await getKependudukanTerbaru();
  if (!t) return statistikStatis;
  return [
    { id: 'penduduk', nilai: angka(t.totalPenduduk), label: 'Penduduk' },
    { id: 'kepala-keluarga', nilai: angka(t.jumlahKK), label: 'Kepala Keluarga' },
    { id: 'rt', nilai: angka(t.jumlahRt), label: 'Rukun Tetangga' },
    { id: 'rw', nilai: angka(t.jumlahRw), label: 'Rukun Warga' },
  ];
}

/** Ambil seluruh konten untuk publik dan petakan ke tipe Konten publik */
export async function muatKontenDinamis(): Promise<PublicKonten[]> {
  const konten = await getKontenPublik(10);
  return konten.map((k) => {
    const isKegiatan = k.kategori.toLowerCase().includes('kegiatan');
    return {
      slug: k.id,
      jenis: isKegiatan ? 'kegiatan' : 'berita',
      kategori: k.kategori,
      judul: k.judul,
      tanggal: k.tanggalKegiatan,
      ringkasan: k.deskripsi.length > 150 ? k.deskripsi.substring(0, 150) + '...' : k.deskripsi,
      isi: k.deskripsi.split('\n').filter((text) => text.trim() !== ''),
      gambar: { src: k.urlFoto ? urlFotoLangsung(k.urlFoto) : '', alt: k.judul },
    };
  });
}
