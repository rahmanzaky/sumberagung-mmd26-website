import { getKependudukanTerbaru } from '@/repository/kependudukan/action';
import { getKontenPublik } from '@/repository/konten/action';
import { urlFotoLangsung } from '@/lib/foto';
import { statistik as statistikStatis } from './data';
import type { KartuKegiatan, StatistikBeranda } from './types';

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

/** Kartu "Jejak Langkah & Geliat Desa" dari konten berstatus Tampil. */
export async function muatKartuKegiatan(): Promise<KartuKegiatan[]> {
  const konten = await getKontenPublik(7);
  return konten.map((k) => ({
    id: k.id,
    kategori: k.kategori,
    judul: k.judul,
    gambar: { src: k.urlFoto ? urlFotoLangsung(k.urlFoto) : '', alt: k.judul },
  }));
}
