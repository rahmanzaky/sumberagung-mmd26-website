'use server';

import { revalidatePath } from 'next/cache';
import { requireSuperAdmin } from '@/lib/guard';
import { getKvContent, postKvContent } from '@/lib/kv-content';
import type { Pengaturan } from './dto';
import { PENGATURAN_DEFAULT } from './dto';

/**
 * Nilai dari sheet ditimpa di atas default, bukan menggantikannya. Jadi
 * pengaturan yang belum pernah diisi tetap punya nilai wajar, dan menambah
 * kunci baru di kode tidak membuat halaman kosong.
 */
export async function getPengaturan(): Promise<Pengaturan> {
  return getKvContent('pengaturan', PENGATURAN_DEFAULT);
}

export async function simpanPengaturanAction(input: Pengaturan) {
  await requireSuperAdmin();
  await postKvContent('pengaturan', input);

  revalidatePath('/dashboard/pengaturan');
  revalidatePath('/'); // identitas desa & jam layanan tampil di halaman publik
  revalidatePath('/pengajuan-surat');
}
