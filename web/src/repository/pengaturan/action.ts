'use server';

import { revalidatePath } from 'next/cache';
import { requireSuperAdmin } from '@/lib/guard';
import type { Pengaturan } from './dto';
import { PENGATURAN_DEFAULT } from './dto';

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

/**
 * Nilai dari sheet ditimpa di atas default, bukan menggantikannya. Jadi
 * pengaturan yang belum pernah diisi tetap punya nilai wajar, dan menambah
 * kunci baru di kode tidak membuat halaman kosong.
 */
export async function getPengaturan(): Promise<Pengaturan> {
  const url = process.env.APPS_SCRIPT_PENGATURAN_URL;
  if (!url) return PENGATURAN_DEFAULT;

  const json = await fetchAppsScript<{ data: Partial<Pengaturan> }>(url);
  return { ...PENGATURAN_DEFAULT, ...json.data };
}

export async function simpanPengaturanAction(input: Pengaturan) {
  await requireSuperAdmin();

  const url = process.env.APPS_SCRIPT_PENGATURAN_URL;
  if (!url) {
    console.warn('[dev] simpanPengaturanAction tanpa APPS_SCRIPT_PENGATURAN_URL — dilewati');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error(`Simpan pengaturan gagal: ${res.status}`);
  const json = (await res.json()) as { success: boolean; error?: string };
  if (!json.success) throw new Error(json.error ?? 'Apps Script returned success: false');

  revalidatePath('/dashboard/pengaturan');
  revalidatePath('/'); // identitas desa & jam layanan tampil di halaman publik
  revalidatePath('/pengajuan-surat');
}
