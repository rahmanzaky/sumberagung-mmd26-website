import type { BukuTamuEntry } from '@/types/buku-tamu';
import type { PengajuanSurat, StatusSurat } from '@/types/pengajuan-surat';
import { dummyBukuTamu, dummyPengajuanSurat } from './dummy-data';

async function fetchAppsScript<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Apps Script request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getBukuTamu(): Promise<BukuTamuEntry[]> {
  const url = process.env.APPS_SCRIPT_BUKU_TAMU_URL;
  if (!url) return dummyBukuTamu;

  const json = await fetchAppsScript<{ data: BukuTamuEntry[] }>(url);
  return json.data;
}

export async function getPengajuanSurat(): Promise<PengajuanSurat[]> {
  const url = process.env.APPS_SCRIPT_SURAT_URL;
  if (!url) return dummyPengajuanSurat;

  const json = await fetchAppsScript<{ data: PengajuanSurat[] }>(url);
  return json.data;
}

export async function updateStatusSurat(id: string, status: StatusSurat): Promise<void> {
  const url = process.env.APPS_SCRIPT_SURAT_URL;
  if (!url) {
    console.warn('[dev] updateStatusSurat called without APPS_SCRIPT_SURAT_URL — skipping');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status }),
  });

  if (!res.ok) throw new Error(`Update status failed: ${res.status}`);
  const json = (await res.json()) as { success: boolean };
  if (!json.success) throw new Error('Apps Script returned success: false');
}
