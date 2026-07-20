// Helper server: teruskan gambar base64 (sudah dikompres di browser) ke backend
// (resource 'upload'), kembalikan URL Drive. Sheet menyimpan URL ini; Drive
// hanya menyimpan filenya.

import { kirimResource } from '@/lib/apps-script';

export type GambarUnggah = {
  dataBase64: string;
  mimeType: string;
  namaFile: string;
  // true = bisa dilihat publik (galeri/konten); false = privat (bukti absensi).
  publik?: boolean;
};

/**
 * Mengunggah satu gambar ke Drive. Mengembalikan URL Drive, atau string kosong
 * bila backend belum dikonfigurasi (mode dev) supaya alur tetap jalan.
 */
export async function unggahGambar(gambar: GambarUnggah): Promise<string> {
  const hasil = await kirimResource('upload', { publik: false, ...gambar });
  return hasil.url ?? '';
}
