'use server';

import { requireAdmin } from '@/lib/guard';
import { unggahGambar } from '@/lib/unggah-drive';

export type UnggahFotoInput = {
  dataBase64: string;
  mimeType: string;
  namaFile: string;
  publik?: boolean;
};

/**
 * Unggah satu foto (sudah dikompres di browser) ke Drive, kembalikan URL-nya.
 * Dipakai lintas modul CMS (galeri, konten, sejarah, struktur, beranda).
 * `publik` default true karena foto CMS umumnya tampil di halaman publik.
 */
export async function unggahFotoAction(input: UnggahFotoInput): Promise<string> {
  await requireAdmin();
  return unggahGambar({
    dataBase64: input.dataBase64,
    mimeType: input.mimeType,
    namaFile: input.namaFile,
    publik: input.publik ?? true,
  });
}
