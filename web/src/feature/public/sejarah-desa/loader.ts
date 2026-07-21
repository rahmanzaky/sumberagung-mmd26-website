import { getTimeline } from '@/repository/sejarah/action';
import { urlFotoLangsung } from '@/lib/foto';
import type { SejarahTimelineItem } from './types';

/**
 * Ambil timeline sejarah dari CMS (Sheets) lalu petakan ke bentuk yang dipakai
 * komponen. Saat backend belum dikonfigurasi, repository mengembalikan data
 * contoh — halaman tetap tampil.
 */
export async function muatTimeline(): Promise<SejarahTimelineItem[]> {
  const entri = await getTimeline();
  return entri.map((e) => ({
    id: e.id,
    periode: e.era,
    judul: e.subjudul,
    narasi: e.narasi,
    gambar: {
      src: e.urlFoto ? urlFotoLangsung(e.urlFoto) : '',
      alt: e.subjudul || e.era,
    },
  }));
}
